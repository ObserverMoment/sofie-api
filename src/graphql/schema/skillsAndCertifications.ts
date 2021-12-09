import { gql } from 'apollo-server-express'

export default gql`
  type Skill {
    id: ID!
    createdAt: DateTime!
    name: String!
    experience: String
    certification: String
    awardingBody: String
    certificateRef: String
    documentUri: String
  }

  input CreateSkillInput {
    name: String!
    experience: String
  }

  input UpdateSkillInput {
    id: ID!
    name: String
    experience: String
    certification: String
    awardingBody: String
    certificateRef: String
    documentUri: String
  }

  input AddDocumentToSkillInput {
    id: ID! # Skill ID.
    uri: String!
  }

  input RemoveDocumentFromSkillInput {
    id: ID! # Skill ID.
  }
`
