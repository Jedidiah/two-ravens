export const schema = gql`
  type DocusignEnvelope {
    status: String!
    documentsUri: String
    recipientsUri: String
    attachmentsUri: String
    envelopeUri: String
    emailSubject: String
    envelopeId: String!
    signingLocation: String
    customFieldsUri: String
    notificationUri: String
    enableWetSign: Boolean
    allowMarkup: Boolean
    allowReassign: Boolean
    createdDateTime: Date
    lastModifiedDateTime: Date
    deliveredDateTime: Date
    initialSentDateTime: Date
    sentDateTime: Date
    completedDateTime: Date
    statusChangedDateTime: Date
    documentsCombinedUri: String
    certificateUri: String
    templatesUri: String
    expireEnabled: Boolean
    expireDateTime: Date
    expireAfter: Int
    senderUserName: String
    senderUserId: String
    senderAccountId: String
    senderEmail: String
    purgeState: String
    envelopeIdStamping: Boolean
    is21CFRPart11: Boolean
    signerCanSignOnMobile: Boolean
    autoNavigation: Boolean
    isSignatureProviderEnvelope: Boolean
    hasFormDataChanged: Boolean
    allowComments: Boolean
    hasComments: Boolean
    allowViewHistory: Boolean
    envelopeMetadataAllowAdvancedCorrect: Boolean
    envelopeMetadataEnableSignWithNotary: Boolean
    envelopeMetadataAllowCorrect: Boolean
    anySigner: String
    envelopeLocation: String
    isDynamicEnvelope: Boolean
  }

  # input UpdateDocusignEnvelopeInput {
  #   emailSubject: String
  # }

  type Query {
    getEnvelope(id: String!): DocusignEnvelope! @requireAuth
  }

  # type Mutation {
  #     createDocusignEnvelope(
  #       input: CreateDocusignEnvelopeInput!
  #     ): DocusignEnvelope! @requireAuth

  #     # updateDocusignEnvelope(
  #     #   id: String!
  #     #   input: UpdateDocusignEnvelopeInput!
  #     # ): DocusignEnvelope! @requireAuth
  #     # deleteDocusignEnvelope(id: String!): DocusignEnvelope! @requireAuth
  #   }
`;
