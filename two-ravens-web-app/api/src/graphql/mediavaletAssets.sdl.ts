export const schema = gql`
  type MediavaletAsset {
    id: String!
    title: String!
    description: String!
    altText: String!
    thumb: String!
    small: String!
    medium: String!
    large: String!
    original: String!
    categories: [String!]!
  }

  type Query {
    mediavaletAsset(id: String): MediavaletAsset! @requireAuth
    mediavaletAssets(categoryId: String): [MediavaletAsset!]! @requireAuth
  }

  input UpdateMediavaletAssetInput {
    title: String
    description: String
    altText: String
    categories: String
  }

  input UpdateMediavaletAssetMetadataInput {
    title: String
  }

  type Mutation {
    updateMediavaletAsset(
      id: String!
      input: UpdateMediavaletAssetInput!
    ): MediavaletAsset! @requireAuth
  }
`;
