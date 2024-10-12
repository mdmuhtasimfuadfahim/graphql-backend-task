/**
* @file server.js
* @description Apollo Server setup and configuration
* @version 1.0
* @license GNU
* @created 2023-10-01
**/

// Load environment variables from .env file
require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const authenticate = require('./auth');

/**
* server
* Apollo Server instance with type definitions, resolvers, and context.
**/
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Authenticate the request
        authenticate(req);
        return {};
    },
});

// Get the port from environment variables or default to 4000
const PORT = process.env.PORT || 4000;

/**
* Start the server and listen on the specified port
**/
server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});