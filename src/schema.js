/**
* @file schema.js
* @description GraphQL schema definition for NodeObject and related types
* @version 1.0
* @license MIT
* @created 2023-10-01
* @modified 2023-10-01
**/

const { gql } = require('apollo-server');
const { GraphQLLong, GraphQLJSON } = require('graphql-scalars');

/** 
* typeDefs
* GraphQL schema definition for NodeObject and related types.
**/
const typeDefs = gql`
  scalar Long
  scalar JSON

  type Action {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    params: JSON
    functionString: String
    resourceTemplateId: ID
    resourceTemplate: ResourceTemplate
  }

  type Trigger {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    params: JSON
    functionString: String
    resourceTemplateId: ID
    resourceTemplate: ResourceTemplate
  }

  type Response {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    platforms: JSON
    tags: JSON
  }

  type ResourceTemplate {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    type: String
    description: String
    schema: JSON
    requestedVerification: Boolean
    verified: Boolean
    published: Boolean
    integrationId: String
    functionString: String
    key: String
  }

  type NodeObject {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    parents: JSON
    parentIds: [ID]
    root: Boolean
    redirect: JSON
    analytics: String
    memberTagging: String
    type: String
    trigger: Trigger
    responses: [Response]
    actions: String
    postActions: [Action]
    priority: Float
    position: JSON
    compositeId: ID
    global: Boolean
    colour: String
  }

  type Query {
    node(nodeId: ID): NodeObject
    nodes: [NodeObject]
    trigger(triggerId: ID): Trigger
    triggers: [Trigger]
    action(actionId: ID): Action
    actions: [Action]
  }
`;

module.exports = typeDefs;