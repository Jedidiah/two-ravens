export const schema = gql`
  type Account {
    id: String!
    name: String!
    users: [User]!
    settings: String!
    mediavaletRefreshToken: String
    mediavaletToken: String
    mediavaletTokenExpiry: String
    docusignAuthToken: String
    docusignAuthTokenExpiry: String
  }

  type Query {
    accounts: [Account!]! @requireAuth
    account(id: String!): Account @requireAuth
  }

  input CreateAccountInput {
    name: String!
    settings: String!
    mediavaletRefreshToken: String
    mediavaletToken: String
    mediavaletTokenExpiry: String
    docusignAuthToken: String
    docusignAuthTokenExpiry: String
  }

  input UpdateAccountInput {
    name: String
    settings: String
    mediavaletRefreshToken: String
    mediavaletToken: String
    mediavaletTokenExpiry: String
    docusignAuthToken: String
    docusignAuthTokenExpiry: String
  }

  type Mutation {
    createAccount(input: CreateAccountInput!): Account! @requireAuth
    updateAccount(id: String!, input: UpdateAccountInput!): Account!
      @requireAuth
    deleteAccount(id: String!): Account! @requireAuth
  }
`;
