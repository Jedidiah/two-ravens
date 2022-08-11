export const schema = gql`
  type Photo {
    id: String!
    date: DateTime!
    cameraTrap: CameraTrap!
    cameraTrapId: String!
    cameraTrapBatch: CameraTrapBatch
    cameraTrapBatchId: String
    assetId: String
    title: String!
    description: String
    altText: String
    thumb: String!
    small: String!
    medium: String!
    large: String!
    original: String!
  }

  type Query {
    photos: [Photo!]! @requireAuth
    photo(id: String!): Photo @requireAuth
  }

  input CreatePhotoInput {
    date: DateTime!
    cameraTrapId: String!
    cameraTrapBatchId: String
    assetId: String
    title: String!
    description: String
    altText: String
    thumb: String!
    small: String!
    medium: String!
    large: String!
    original: String!
  }

  input CreatePhotoFromAssetInput {
    cameraTrapId: String!
    assetId: String!
  }

  input UpdatePhotoInput {
    date: DateTime
    cameraTrapId: String
    cameraTrapBatchId: String
    assetId: String
    title: String
    description: String
    altText: String
    thumb: String
    small: String
    medium: String
    large: String
    original: String
  }

  input UpdatePhotoForBatchInput {
    batchId: String
  }

  input UpdatePhotosForCameraTrapInput {
    cameraTrapId: String
  }

  type UpdatePhotoForBatchOutput {
    count: Int!
  }

  type UpdatePhotosForCameraTrapOutput {
    success: Boolean!
    status: String
  }

  type Mutation {
    createPhoto(input: CreatePhotoInput!): Photo! @requireAuth
    createPhotoFromAsset(input: CreatePhotoFromAssetInput!): Photo! @requireAuth
    updatePhoto(id: String!, input: UpdatePhotoInput!): Photo! @requireAuth
    updatePhotosForBatch(
      input: UpdatePhotoForBatchInput!
    ): UpdatePhotoForBatchOutput! @requireAuth
    updatePhotosForCameraTrap(
      input: UpdatePhotosForCameraTrapInput!
    ): UpdatePhotosForCameraTrapOutput! @requireAuth
    deletePhoto(id: String!): Photo! @requireAuth
  }
`;
