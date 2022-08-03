export const schema = gql`
  type CameraTrap {
    id: String!
    deviceId: String!
    batches: [CameraTrapBatch]!
    events: [CameraTrapEvent]!
    photos: [Photo]!
  }

  type Query {
    cameraTraps: [CameraTrap!]! @requireAuth
    cameraTrap(id: String!): CameraTrap @requireAuth
  }

  input CreateCameraTrapInput {
    deviceId: String!
  }

  input UpdateCameraTrapInput {
    deviceId: String
  }

  type Mutation {
    createCameraTrap(input: CreateCameraTrapInput!): CameraTrap! @requireAuth
    updateCameraTrap(id: String!, input: UpdateCameraTrapInput!): CameraTrap!
      @requireAuth
    deleteCameraTrap(id: String!): CameraTrap! @requireAuth
  }
`;
