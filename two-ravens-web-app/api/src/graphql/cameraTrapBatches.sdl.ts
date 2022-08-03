export const schema = gql`
  type CameraTrapBatch {
    id: String!
    dateStart: DateTime!
    dateEnd: DateTime!
    cameraTrap: CameraTrap!
    cameraTrapId: String!
    photos: [Photo]!
    location: String!
    cameraTrapBatchApprovals: [CameraTrapBatchApproval]!
    status: String!
  }

  type Query {
    cameraTrapBatches: [CameraTrapBatch!]! @requireAuth
    cameraTrapBatch(id: String!): CameraTrapBatch @requireAuth
  }

  input CreateCameraTrapBatchInput {
    dateStart: DateTime!
    dateEnd: DateTime!
    cameraTrapId: String!
    location: String!
    status: String!
  }

  input UpdateCameraTrapBatchInput {
    dateStart: DateTime
    dateEnd: DateTime
    cameraTrapId: String
    location: String
    status: String
  }

  type Mutation {
    createCameraTrapBatch(input: CreateCameraTrapBatchInput!): CameraTrapBatch!
      @requireAuth
    updateCameraTrapBatch(
      id: String!
      input: UpdateCameraTrapBatchInput!
    ): CameraTrapBatch! @requireAuth
    deleteCameraTrapBatch(id: String!): CameraTrapBatch! @requireAuth
  }
`;
