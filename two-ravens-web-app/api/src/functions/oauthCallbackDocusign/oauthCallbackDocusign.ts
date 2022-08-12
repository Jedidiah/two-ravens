import type { APIGatewayEvent, Context } from 'aws-lambda';

import { useRequireAuth } from '@redwoodjs/graphql-server';

import {
  getCurrentUser,
  getCurrentUserAccountId,
  isAuthenticated,
} from 'src/lib/auth';
import { logger } from 'src/lib/logger';
import { account, updateAccount } from 'src/services/accounts/accounts';

import { authenticate } from '../../lib/docusignAuth';

export const SCOPES = ['signature', 'impersonation'];

export const handlerFn = async (_event: APIGatewayEvent, _context: Context) => {
  logger.info('Invoked oauthCallbackDocusign function');
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
    // const { code } = event.queryStringParameters;
    const { accessToken, apiAccountId, basePath } = await authenticate();
    logger.info(JSON.stringify({ accessToken, apiAccountId, basePath }));

    const accountId = getCurrentUserAccountId();

    const acc = await account({ id: accountId });

    logger.info(JSON.stringify({ acc, accountId, accessToken }));

    await updateAccount({
      id: accountId,
      input: {
        ...acc,
        docusignAuthToken: accessToken,
        docusignAuthTokenExpiry: String(
          Date.now() + Number(process.env['DOCUSIGN_EXPIRY'])
        ),
        docusignIntegrationStatus: 'connected',
      },
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
      }),
    };
  } catch (error) {
    logger.error(String(error));
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: String(error),
      }),
    };
  }
};

export const handler = useRequireAuth({ handlerFn, getCurrentUser });
