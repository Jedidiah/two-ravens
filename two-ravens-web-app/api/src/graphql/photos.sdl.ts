export const schema = gql`
  type Photo {
    id: String!
    date: DateTime!
    cameraTrap: CameraTrap!
    cameraTrapId: String!
    cameraTrapBatch: CameraTrapBatch
    cameraTrapBatchId: String!
    url: String!
  }

  type Query {
    photos: [Photo!]! @requireAuth
    photo(id: String!): Photo @requireAuth
  }

  input CreatePhotoInput {
    date: DateTime!
    cameraTrapId: String!
    cameraTrapBatchId: String!
    url: String!
  }

  input UpdatePhotoInput {
    date: DateTime
    cameraTrapId: String
    cameraTrapBatchId: String
    url: String
  }

  type Mutation {
    createPhoto(input: CreatePhotoInput!): Photo! @requireAuth
    updatePhoto(id: String!, input: UpdatePhotoInput!): Photo! @requireAuth
    deletePhoto(id: String!): Photo! @requireAuth
  }
`;
