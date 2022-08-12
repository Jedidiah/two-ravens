import docusign from 'docusign-esign';
import { QueryResolvers } from 'types/graphql';

import { authenticate } from 'src/lib/docusignAuth';
import { logger } from 'src/lib/logger';

export const docusignEnvelop: QueryResolvers['docusignEnvelope'] = async ({
  id,
}) => {
  const { accessToken, apiAccountId, basePath } = await authenticate();

  const dsApiClient = docusign.ApiClient();
  dsApiClient.setBasePath(basePath);
  dsApiClient.addDefaultHeader('Authorization', `Bearer ${accessToken}`);
  const envelopesApi = new docusign.EnvelopesApi(dsApiClient);
  const results = await envelopesApi.getEnvelope(apiAccountId, id, null);
  logger.info(JSON.stringify({ results }));
  return results;
};
