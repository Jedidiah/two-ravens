export const schema = gql`
  type CameraTrapBatchApproval {
    id: String!
    userId: String!
    user: User!
    batchId: String!
    cameraTrapBatch: CameraTrapBatch!
    approvedImages: String!
    rejectedImages: String!
  }

  type Query {
    cameraTrapBatchApprovals: [CameraTrapBatchApproval!]! @requireAuth
    cameraTrapBatchApproval(id: String!): CameraTrapBatchApproval @requireAuth
  }

  input CreateCameraTrapBatchApprovalInput {
    userId: String!
    batchId: String!
    approvedImages: String!
    rejectedImages: String!
  }

  input UpdateCameraTrapBatchApprovalInput {
    userId: String
    batchId: String
    approvedImages: String
    rejectedImages: String
  }

  type Mutation {
    createCameraTrapBatchApproval(
      input: CreateCameraTrapBatchApprovalInput!
    ): CameraTrapBatchApproval! @requireAuth
    updateCameraTrapBatchApproval(
      id: String!
      input: UpdateCameraTrapBatchApprovalInput!
    ): CameraTrapBatchApproval! @requireAuth
    deleteCameraTrapBatchApproval(id: String!): CameraTrapBatchApproval!
      @requireAuth
  }
`;
