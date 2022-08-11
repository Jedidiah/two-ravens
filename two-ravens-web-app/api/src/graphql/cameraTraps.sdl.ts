export const schema = gql`
  type CameraTrap {
    id: String!
    deviceId: String!
    manufacturer: String!
    project: String
    batches: [CameraTrapBatch]!
    events: [CameraTrapEvent]!
    photos: [Photo]!
    mediavaletCategoryId: String
    mediavaletDownloadsFolderId: String
    mediavaletProcessedFolderId: String
  }

  type Query {
    cameraTraps: [CameraTrap!]! @requireAuth
    cameraTrap(id: String!): CameraTrap @requireAuth
    cameraTrapFromDeviceId(deviceId: String!): CameraTrap @skipAuth
  }

  input CreateCameraTrapInput {
    deviceId: String!
    manufacturer: String!
    project: String
    mediavaletCategoryId: String
    mediavaletDownloadsFolderId: String
    mediavaletProcessedFolderId: String
  }

  input UpdateCameraTrapInput {
    deviceId: String
    manufacturer: String
    project: String
    mediavaletCategoryId: String
    mediavaletDownloadsFolderId: String
    mediavaletProcessedFolderId: String
  }

  type Mutation {
    createCameraTrap(input: CreateCameraTrapInput!): CameraTrap! @requireAuth
    updateCameraTrap(id: String!, input: UpdateCameraTrapInput!): CameraTrap!
      @requireAuth
    deleteCameraTrap(id: String!): CameraTrap! @requireAuth
  }
`;
