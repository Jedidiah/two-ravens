export const schema = gql`
  type MediavaletCategory {
    id: String!
    name: String!
    parentId: String!
  }

  type Query {
    mediavaletCategory(id: String): MediavaletCategory! @requireAuth
    mediavaletCameraTrapCategories: [MediavaletCategory!]! @requireAuth
  }

  input CreateMediavaletCategoryInput {
    name: String!
    parentId: String!
  }

  # input UpdateMediavaletCategoryInput {
  #   name: String
  # }

  type Mutation {
    createMediavaletCategory(
      input: CreateMediavaletCategoryInput!
    ): MediavaletCategory! @requireAuth

    # updateMediavaletCategory(
    #   id: String!
    #   input: UpdateMediavaletCategoryInput!
    # ): MediavaletCategory! @requireAuth
    # deleteMediavaletCategory(id: String!): MediavaletCategory! @requireAuth
  }
`;
