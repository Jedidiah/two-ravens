import fs from 'fs';

import docusign from 'docusign-esign';

import { logger } from 'src/lib/logger';

import { SCOPES } from '../functions/oauthCallbackDocusign/oauthCallbackDocusign';

export async function authenticate() {
  const jwtLifeSec = 60 * 60, // requested lifetime for the JWT is 60 min
    dsApi = new docusign.ApiClient();
  dsApi.setOAuthBasePath(
    process.env['DOCUSIGN_OAUTH_SERVER'].replace('https://', '')
  ); // it should be domain only.
  const rsaKey = fs.readFileSync(process.env['DOCUSIGN_PRIVATE_KEY_LOCATION']);

  try {
    const results = await dsApi.requestJWTUserToken(
      process.env['DOCUSIGN_CLIENT_ID'],
      process.env['DOCUSIGN_USER_GUID'],
      SCOPES,
      rsaKey,
      jwtLifeSec
    );

    logger.info(JSON.stringify({ results }));

    const accessToken = results.body.access_token;

    // get user info
    const userInfoResults = await dsApi.getUserInfo(accessToken);

    // use the default account
    const userInfo = userInfoResults.accounts.find(
      (account) => account.isDefault === 'true'
    );

    logger.info(JSON.stringify({ userInfo }));

    return {
      accessToken: results.body.access_token,
      apiAccountId: userInfo.accountId,
      basePath: `${userInfo.baseUri}/restapi`,
    };
  } catch (e) {
    logger.error(e);
    const body = e.response && e.response.body;
    if (body) {
      this._debug_log(`\nAPI problem: Status code ${
        e.response.status
      }, message body:
        ${JSON.stringify(body, null, 4)}\n\n`);
    }
    // }
  }
}
