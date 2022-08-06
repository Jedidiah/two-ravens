export const schema = gql`
  type Account {
    id: String!
    name: String!
    users: [User]!
    settings: String!
    mediavaletIntegrationStatus: String
    mediavaletRefreshToken: String
    mediavaletToken: String
    mediavaletTokenExpiry: String
    docusignIntegrationStatus: String
    docusignAuthToken: String
    docusignAuthTokenExpiry: String
    esriIntegrationStatus: String
  }

  type Query {
    accounts: [Account!]! @requireAuth
    account(id: String!): Account @requireAuth
  }

  input CreateAccountInput {
    name: String!
    settings: String!
    mediavaletIntegrationStatus: String
    mediavaletRefreshToken: String
    mediavaletToken: String
    mediavaletTokenExpiry: String
    docusignIntegrationStatus: String
    docusignAuthToken: String
    docusignAuthTokenExpiry: String
    esriIntegrationStatus: String
  }

  input UpdateAccountInput {
    name: String
    settings: String
    mediavaletIntegrationStatus: String
    mediavaletRefreshToken: String
    mediavaletToken: String
    mediavaletTokenExpiry: String
    docusignIntegrationStatus: String
    docusignAuthToken: String
    docusignAuthTokenExpiry: String
    esriIntegrationStatus: String
  }

  input UpdateAccountMediavaletStatus {
    mediavaletIntegrationStatus: String
  }

  input UpdateAccountDocusignStatus {
    docusignIntegrationStatus: String
  }

  input UpdateAccountEsriStatus {
    esriIntegrationStatus: String
  }

  type Mutation {
    createAccount(input: CreateAccountInput!): Account! @requireAuth
    updateAccount(id: String!, input: UpdateAccountInput!): Account!
      @requireAuth
    # updateAccountMediavaletStatus(
    #   id: String!
    #   input: UpdateAccountMediavaletStatus!
    # ): Account! @requireAuth
    # updateAccountDocusignStatus(
    #   id: String!
    #   input: UpdateAccountDocusignStatus!
    # ): Account! @requireAuth
    # updateAccountEsriStatus(
    #   id: String!
    #   input: UpdateAccountEsriStatus!
    # ): Account! @requireAuth
    deleteAccount(id: String!): Account! @requireAuth
  }
`;
