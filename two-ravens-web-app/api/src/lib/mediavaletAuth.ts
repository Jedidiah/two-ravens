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
  const userAccount = await account({ id: accountId });
  const { mediavaletRefreshToken, mediavaletToken, mediavaletTokenExpiry } =
    userAccount;
  const expiryDate = new Date(mediavaletTokenExpiry);
  const isTokenValid = isFuture(expiryDate);

  if (isTokenValid) {
    logger.info('┖ MediaValet Token Valid');
    return mediavaletToken;
  }

  logger.info('┖ MediaValet Token Expired');
  logger.info(`┖ POST /connect/token`);

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

  logger.info(`┖ POST /connect/token ${tokenResponse.statusText}`);

  const response = await tokenResponse.json();
  const { refresh_token, access_token, expires_in } = response;

  await updateAccount({
    id: accountId,
    input: {
      mediavaletRefreshToken: refresh_token,
      mediavaletToken: access_token,
      mediavaletTokenExpiry: addSeconds(
        Date.now(),
        Number(expires_in)
      ).toISOString(),
      mediavaletIntegrationStatus: 'connected',
    },
  });

  return access_token;
}

export async function mediavaletApi(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  endpoint: string,
  body?: string,
  contentTypeOverride?: string
) {
  const defaultContentType = ['PUT', 'POST'].includes(method)
    ? 'application/x-www-form-urlencoded'
    : undefined;

  const contentType = contentTypeOverride ?? defaultContentType;

  try {
    logger.info(`${method} ${endpoint} ${contentType}`);
    const token: string = await getMediavaletToken();
    logger.info(`Got token ${token.slice(0, 10)}...`);
    logger.info(body);
    const requestResponse = await fetch(`${MEDIAVALET_BASEURL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': contentType,
        'Ocp-Apim-Subscription-Key': process.env['MEDIAVALET_SUBSCRIPTION_KEY'],
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
        Host: 'api.mediavalet.com',
      },
      body,
    });

    logger.info(
      `${method} ${endpoint} ${requestResponse.status} ${
        requestResponse.statusText
      } ${JSON.stringify(requestResponse.headers)}`
    );

    if (requestResponse.status > 299) {
      const response = await requestResponse.text();
      throw new Error(String(response));
    }

    // if (requestResponse.headers['Content-Type'] === 'application/json') {
    const responseJson = await requestResponse.json();
    return responseJson;
    // } else {
    // const responseText = await requestResponse.text();
    // return responseText;
    // }
  } catch (error) {
    logger.error(String(error));
    return {
      success: false,
      error: String(error),
      fullError: error,
    };
  }
}

export async function mediavaletApiBulkAction({ body }: { body: string }) {
  try {
    logger.info(`POST /bulk`);
    const token: string = await getMediavaletToken();
    logger.info(`Got token ${token.slice(0, 10)}...`);
    const requestResponse = await fetch(`${MEDIAVALET_BASEURL}/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type':
          'multipart/mixed;\r\nboundary=c6c2ed020aadd284efd61a7c9d4dfe94',
        'Ocp-Apim-Subscription-Key': process.env['MEDIAVALET_SUBSCRIPTION_KEY'],
        Authorization: `Bearer ${token}`,
        Accept: 'application/json, text/plain, */*',
        Host: 'api.mediavalet.com',
      },
      body,
    });

    logger.info(`POST /bulk ${requestResponse.statusText}`);
    const responseText = await requestResponse.text();
    return {
      success: true,
      responseText,
    };
  } catch (error) {
    logger.error(String(error));
    return {
      success: false,
      error: String(error),
      fullError: error,
    };
  }
}

/*
await fetch("https://mv-api-usva.mediavalet.net/bulk", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:103.0) Gecko/20100101 Firefox/103.0",
        "Accept": "application/json, text/plain, *\/*",
        "Accept-Language": "en-GB,en;q=0.5",
        "Content-Type": "multipart/mixed; boundary=c6c2ed020aadd284efd61a7c9d4dfe94",
        "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA0MU...",
        "x-mv-clientsource": "Web",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "Sec-GPC": "1"
    },
    "referrer": "https://hackathonjgi.mediavalet.com/",
    "body": "--c6c2ed020aadd284efd61a7c9d4dfe94\r\nContent-Type: application/http; msgtype=request\r\n\r\nPUT /assets/a1b33d4a-495b-40dd-82e6-542af874c3ec/categories?runAsync=true HTTP/1.1\r\nhost: mv-api-usva.mediavalet.net\r\nAuthorization: Bearer qqmDpuGF75vPk\r\ncontent-type: application/json\r\n\r\n[\"1e5ea909-ae48-44a5-9440-a514c646831a\"]\r\n\r\n--c6c2ed020aadd284efd61a7c9d4dfe94\r\nContent-Type: application/http; msgtype=request\r\n\r\nPUT /assets/3a96bf74-7240-4be8-8322-acf05762c80e/categories?runAsync=true HTTP/1.1\r\nhost: mv-api-usva.mediavalet.net\r\nAuthorization: Bearer qqmDpuGF75vPk\r\ncontent-type: application/json\r\n\r\n[\"1e5ea909-ae48-44a5-9440-a514c646831a\"]\r\n\r\n--c6c2ed020aadd284efd61a7c9d4dfe94--\r\n",
    "method": "POST",
    "mode": "cors"
});
*/
