import type { APIGatewayEvent, Context } from 'aws-lambda';
import { fetch } from 'cross-undici-fetch';
import { stringify } from 'query-string';

import { useRequireAuth } from '@redwoodjs/graphql-server';

import {
  getCurrentUser,
  getCurrentUserAccountId,
  isAuthenticated,
} from 'src/lib/auth';
import { account, updateAccount } from 'src/services/accounts/accounts';

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
const handlerFn = async (event: APIGatewayEvent, context: Context) => {
  if (!isAuthenticated()) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isAuthenticated: isAuthenticated() }),
    };
  }
  try {
    const { code } = event.queryStringParameters;

    const params = {
      grant_type: 'authorization_code',
      code,
      client_id: process.env['MEDIAVALET_CLIENT_ID'],
      redirect_uri: 'https://ravens.ursaluna.studio/oauth/callback/mediavalet',
    };

    const tokenResponse = await fetch(
      `https://login.mediavalet.com/connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Ocp-Apim-Subscription-Key':
            process.env['MEDIAVALET_SUBSCRIPTION_KEY'],
          Accept: '*/*',
          Authorization:
            'Basic N2Y0OTVmMWYtMjFkYy00ZjliLTkwNzEtNGI1NmU1Mzc1ZTlmOjg2aFZmbW1jdDI0eWRTcUFtQmhkQXJDTXczZlN6OTJrUEw4MTRaV29lWXc9',
          Host: 'login.mediavalet.com',
        },
        body: stringify(params),
        cache: 'no-cache',
        referrer: 'https://ravens.ursaluna.studio/',
      }
    );

    const response = await tokenResponse.json();
    const { refresh_token, access_token, expires_in } = response;

    const accountId = getCurrentUserAccountId();

    const acc = await account({ id: accountId });

    await updateAccount({
      id: accountId,
      input: {
        ...acc,
        mediavaletRefreshToken: refresh_token,
        mediavaletToken: access_token,
        mediavaletTokenExpiry: String(Date.now() + Number(expires_in)),
      },
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: 'oauthCallbackMediavalet function',
        mediavaletRefreshToken: refresh_token,
        mediavaletToken: access_token,
        mediavaletTokenExpiry: Date.now() + Number(expires_in),
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: 'oauthCallbackMediavalet function',
        error: String(error),
      }),
    };
  }
};

export const handler = useRequireAuth({ handlerFn, getCurrentUser });

//   https://login.mediavalet.com/connect/authorize?response_type=code&client_id=7f495f1f-21dc-4f9b-9071-4b56e5375e9f&scope=api%20offline_access&redirect_uri=https://ravens.ursaluna.studio/oauth/callback/mediavalet

// https://ravens.ursaluna.studio/
//    ?code=vurvcYJSs9JVH4xYVxQD-tDXSCVZhzlG9292vPe5F40
//    &scope=api%20offline_access
//    &session_state=SXwvPq2QMfyfHuRbqql8tro7fWRpKhKlgKm0xtjyGaY.DwUFH4CQgMazf9iwgoq5FQ
// oauthCallbackMediavalet?code=eP3QV-o7tGhk7sR4vcKEbDI_A7D2xJHhSCPMjrAKev8&scope=api offline_access
