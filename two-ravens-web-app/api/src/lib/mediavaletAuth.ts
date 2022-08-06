import { fetch } from 'cross-undici-fetch';
import { addSeconds } from 'date-fns';
import isFuture from 'date-fns/isFuture';
import { stringify } from 'query-string';

import { account, updateAccount } from 'src/services/accounts/accounts';

import { getCurrentUserAccountId } from './auth';
import { logger } from './logger';

const MEDIAVALET_BASEURL = 'https://api.mediavalet.com';

export async function getMediavaletToken() {
  const accountId = getCurrentUserAccountId();
  logger.info(accountId);
  const userAccount = await account({ id: accountId });
  const { mediavaletRefreshToken, mediavaletToken, mediavaletTokenExpiry } =
    userAccount;
  const expiryDate = new Date(mediavaletTokenExpiry);
  const isTokenValid = isFuture(expiryDate);
  logger.info(expiryDate.toLocaleTimeString());
  if (isTokenValid) {
    logger.info('isValid!');
    return mediavaletToken;
  }
  logger.info('Expired!');

  const params = {
    grant_type: 'refresh_token',
    refresh_token: mediavaletRefreshToken,
    client_id: process.env['MEDIAVALET_CLIENT_ID'],
    client_secret: process.env['MEDIAVALET_CLIENT_SECRET'],
  };

  const tokenResponse = await fetch(
    `https://login.mediavalet.com/connect/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Ocp-Apim-Subscription-Key': process.env['MEDIAVALET_SUBSCRIPTION_KEY'],
        Accept: '*/*',
        Authorization:
          'Basic N2Y0OTVmMWYtMjFkYy00ZjliLTkwNzEtNGI1NmU1Mzc1ZTlmOjg2aFZmbW1jdDI0eWRTcUFtQmhkQXJDTXczZlN6OTJrUEw4MTRaV29lWXc9',
        Host: 'login.mediavalet.com',
      },
      body: stringify(params),
      cache: 'no-cache',
      referrer: process.env['MEDIAVALET_CALLBACK_URL'],
    }
  );

  const response = await tokenResponse.json();
  const { refresh_token, access_token, expires_in } = response;

  await updateAccount({
    id: accountId,
    input: {
      mediavaletRefreshToken: refresh_token,
      mediavaletToken: access_token,
      mediavaletTokenExpiry: String(addSeconds(Date.now(), Number(expires_in))),
      mediavaletIntegrationStatus: 'connected',
    },
  });

  return access_token;
}

export async function mediavaletApi(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH',
  endpoint: string,
  body?: string
) {
  try {
    const token = await getMediavaletToken();
    logger.info('before request');
    const requestResponse = await fetch(`${MEDIAVALET_BASEURL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': ['PUT', 'POST'].includes(method)
          ? 'application/x-www-form-urlencoded'
          : undefined,
        'Ocp-Apim-Subscription-Key': process.env['MEDIAVALET_SUBSCRIPTION_KEY'],
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
        Host: 'api.mediavalet.com',
      },
      body,
    });
    logger.info('after request');
    logger.info(requestResponse.statusText);
    const responseJson = await requestResponse.json();
    // return { id: requestResponse.statusText };
    return responseJson;
  } catch (error) {
    logger.error(String(error));
    return {
      success: false,
      error: String(error),
    };
  }
}
