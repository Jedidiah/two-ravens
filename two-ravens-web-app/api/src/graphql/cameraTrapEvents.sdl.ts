export const schema = gql`
  type CameraTrapEvent {
    id: String!
    date: DateTime!
    cameraTrap: CameraTrap!
    cameraTrapId: String!
    projectName: String
    staffName: String
    datetime_updated: DateTime!
    cameraLocation: String!
    cameraProcedure: String!
    cameraAttachmentPosition: String
    cameraHeight: Float
    areaDeployed: String
    cameraMake: String
    cameraTarget: String
    cameraSitePhoto: String
    cameraWorking: Boolean!
    comments: String
  }

  type Query {
    cameraTrapEvents: [CameraTrapEvent!]! @requireAuth
    cameraTrapEvent(id: String!): CameraTrapEvent @requireAuth
  }

  input CreateCameraTrapEventInput {
    date: DateTime!
    cameraTrapId: String!
    projectName: String
    staffName: String
    datetime_updated: DateTime!
    cameraLocation: String!
    cameraProcedure: String!
    cameraAttachmentPosition: String
    cameraHeight: Float
    areaDeployed: String
    cameraMake: String
    cameraTarget: String
    cameraSitePhoto: String
    cameraWorking: Boolean!
    comments: String
  }

  input UpdateCameraTrapEventInput {
    date: DateTime
    cameraTrapId: String
    projectName: String
    staffName: String
    datetime_updated: DateTime
    cameraLocation: String
    cameraProcedure: String
    cameraAttachmentPosition: String
    cameraHeight: Float
    areaDeployed: String
    cameraMake: String
    cameraTarget: String
    cameraSitePhoto: String
    cameraWorking: Boolean
    comments: String
  }

  type Mutation {
    createCameraTrapEvent(input: CreateCameraTrapEventInput!): CameraTrapEvent!
      @requireAuth
    updateCameraTrapEvent(
      id: String!
      input: UpdateCameraTrapEventInput!
    ): CameraTrapEvent! @requireAuth
    deleteCameraTrapEvent(id: String!): CameraTrapEvent! @requireAuth
  }
`;
