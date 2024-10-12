/**
* @file resolvers.js
* @description GraphQL resolvers for handling queries and fetching data from JSON files
* @version 1.0
* @license MIT
* @created 2023-10-01
**/

const fs = require('fs');
const path = require('path');
const { GraphQLLong, GraphQLJSON } = require('graphql-scalars');

/**
* loadJSON
* Function to load a JSON file and parse its content.
* @param {string} filename - The name of the JSON file to load.
* @return {Object} - The parsed JSON content.
**/
const loadJSON = (filename) => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, './data', filename), 'utf8'));
};

// Load data from JSON files
const actions = loadJSON('action.json');
const triggers = loadJSON('trigger.json');
const responses = loadJSON('response.json');
const resourceTemplates = loadJSON('resourceTemplate.json');
const nodes = loadJSON('node.json');

/**
* resolvers
* Object containing GraphQL resolvers for handling queries and fetching data.
**/
const resolvers = {
    Long: GraphQLLong,
    JSON: GraphQLJSON,
    Query: {
        /**
        * node
        * Resolver function to fetch a node by its ID or return all nodes if no ID is provided.
        * @param {Object} _ - Unused parameter.
        * @param {Object} args - Arguments object containing nodeId.
        * @param {string} [args.nodeId] - The ID of the node to fetch.
        * @return {Object|Array} - The node object with the specified ID or an array of all nodes.
        **/
        node: (_, { nodeId }) => nodeId ? nodes.find(node => node._id === nodeId) : nodes,

        /**
        * nodes
        * Resolver function to return all nodes.
        * @return {Array} - An array of all nodes.
        **/
        nodes: () => nodes,

        /**
        * trigger
        * Resolver function to fetch a trigger by its ID or return all triggers if no ID is provided.
        * @param {Object} _ - Unused parameter.
        * @param {Object} args - Arguments object containing triggerId.
        * @param {string} [args.triggerId] - The ID of the trigger to fetch.
        * @return {Object|Array} - The trigger object with the specified ID or an array of all triggers.
        **/
        trigger: (_, { triggerId }) => triggerId ? triggers.find(trigger => trigger._id === triggerId) : triggers,

        /**
        * triggers
        * Resolver function to return all triggers.
        * @return {Array} - An array of all triggers.
        **/
        triggers: () => triggers,

        /**
        * actions
        * Resolver function to fetch an action by its ID or return all actions if no ID is provided.
        * @param {Object} _ - Unused parameter.
        * @param {Object} args - Arguments object containing actionId.
        * @param {string} [args.actionId] - The ID of the action to fetch.
        * @return {Object|Array} - The action object with the specified ID or an array of all actions.
        **/
        actions: (_, { actionId }) => actionId ? actions.find(action => action._id === actionId) : actions,

        /**
        * response
        * Resolver function to fetch a response by its ID or return all responses if no ID is provided.
        * @param {Object} _ - Unused parameter.
        * @param {Object} args - Arguments object containing responseId.
        * @param {string} [args.responseId] - The ID of the response to fetch.
        * @return {Object|Array} - The response object with the specified ID or an array of all responses.
        **/
        response: (_, { responseId }) => responseId ? responses.find(response => response._id === responseId) : responses,

        /**
        * responses
        * Resolver function to return all responses.
        * @return {Array} - An array of all responses.
        **/
        responses: () => responses,

        /**
        * resourceTemplate
        * Resolver function to fetch a resource template by its ID or return all resource templates if no ID is provided.
        * @param {Object} _ - Unused parameter.
        * @param {Object} args - Arguments object containing resourceTemplateId.
        * @param {string} [args.resourceTemplateId] - The ID of the resource template to fetch.
        * @return {Object|Array} - The resource template object with the specified ID or an array of all resource templates.
        **/
        resourceTemplate: (_, { resourceTemplateId }) => resourceTemplateId ? resourceTemplates.find(template => template._id === resourceTemplateId) : resourceTemplates,

        /**
        * resourceTemplates
        * Resolver function to return all resource templates.
        * @return {Array} - An array of all resource templates.
        **/
        resourceTemplates: () => resourceTemplates,
    },
    NodeObject: {
        /**
        * trigger
        * Resolver function to fetch the trigger associated with a node.
        * @param {Object} node - The node object.
        * @return {Object} - The trigger object associated with the node.
        **/
        trigger: (node) => triggers.find(trigger => trigger._id === node.trigger),

        /**
        * responses
        * Resolver function to fetch the responses associated with a node.
        * @param {Object} node - The node object.
        * @return {Array} - An array of response objects associated with the node.
        **/
        responses: (node) => {
            if (Array.isArray(node.responses)) {
                return node.responses.map(id => responses.find(response => response._id === id));
            }
            return [];
        },

        /**
        * postActions
        * Resolver function to fetch the postActions associated with a node.
        * @param {Object} node - The node object.
        * @return {Array} - An array of postAction objects associated with the node.
        **/
        postActions: (node) => {
            if (Array.isArray(node.postActions)) {
                return node.postActions.map(id => {
                    const action = actions.find(action => action._id === id);
                    if (action) {
                        return {
                            ...action,
                            resourceTemplate: resourceTemplates.find(template => template._id === action.resourceTemplateId)
                        };
                    }
                    return null;
                }).filter(action => action !== null);
            }
            return null;
        },
    },
    Trigger: {
        /**
        * resourceTemplate
        * Resolver function to fetch the resource template associated with a trigger.
        * @param {Object} trigger - The trigger object.
        * @return {Object} - The resource template object associated with the trigger.
        **/
        resourceTemplate: (trigger) => resourceTemplates.find(template => template._id === trigger.resourceTemplateId),
    },
};

module.exports = resolvers;