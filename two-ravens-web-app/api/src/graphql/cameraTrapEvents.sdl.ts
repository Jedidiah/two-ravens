export const schema = gql`
  type CameraTrapEvent {
    areaDeployed: String
    cameraAttachmentPosition: String
    cameraHeight: Float
    cameraLocation: String!
    cameraMake: String
    cameraProcedure: String!
    cameraSitePhoto: String
    cameraTarget: String
    cameraTrap: CameraTrap
    cameraTrapId: String
    cameraWorking: Boolean!
    comments: String
    date: DateTime!
    datetimeUpdated: DateTime!
    deviceId: String!
    gisLink: String
    id: String!
    projectName: String
    staffName: String
    userEmail: String
    userFullname: String
    userUsername: String
  }

  type Query {
    cameraTrapEvents: [CameraTrapEvent!]! @requireAuth
    cameraTrapEvent(id: String!): CameraTrapEvent @requireAuth
  }

  input CreateCameraTrapEventInput {
    areaDeployed: String
    cameraAttachmentPosition: String
    cameraHeight: Float
    cameraLocation: String!
    cameraMake: String
    cameraProcedure: String!
    cameraSitePhoto: String
    cameraTarget: String
    cameraTrapId: String
    cameraWorking: Boolean!
    comments: String
    date: DateTime!
    datetimeUpdated: DateTime!
    deviceId: String!
    gisLink: String
    projectName: String
    staffName: String
    userEmail: String
    userFullname: String
    userUsername: String
  }

  input UpdateCameraTrapEventInput {
    areaDeployed: String
    cameraAttachmentPosition: String
    cameraHeight: Float
    cameraLocation: String
    cameraMake: String
    cameraProcedure: String
    cameraSitePhoto: String
    cameraTarget: String
    cameraTrapId: String
    cameraWorking: Boolean
    comments: String
    date: DateTime
    datetimeUpdated: DateTime
    deviceId: String
    gisLink: String
    projectName: String
    staffName: String
    userEmail: String
    userFullname: String
    userUsername: String
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
