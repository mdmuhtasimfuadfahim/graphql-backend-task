/**
* @file auth.js
* @description Authentication middleware for verifying JWT tokens
* @version 1.0
* @license GNU
* @created 2023-10-01
**/

// Load environment variables from .env file
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

/**
* loadJSON
* Function to load a JSON file and parse its content.
* @param {string} filename - The name of the JSON file to load.
* @return {Object} - The parsed JSON content.
**/
const loadJSON = (filename) => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, './data', filename), 'utf8'));
};

// Load demo token from JSON file
const demoToken = loadJSON('demoToken.json');

/**
* authenticate
* Middleware function to authenticate a request using JWT token.
* @param {Object} req - The request object containing headers.
* @return {Object} - The decoded token payload if authentication is successful.
* @throws {AuthenticationError} - If the token is invalid or missing.
**/
const authenticate = (req) => {
    // Extract the authorization header from the request
    const authHeader = req.headers.authorization || '';
    // Remove the 'Bearer ' prefix to get the actual token
    const token = authHeader.replace('Bearer ', '');

    try {
        // Verify and decode the JWT token using the secret key
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        // Compare each property of decodedToken with demoToken[0]
        if (
            decodedToken.userId !== demoToken[0].userId ||
            decodedToken.authToken !== demoToken[0].authToken ||
            decodedToken.timeStamp !== demoToken[0].timeStamp
        ) {
            // Throw an authentication error if any property does not match
            throw new AuthenticationError('Invalid token');
        }

        // Return the decoded token if all properties match
        return decodedToken;
    } catch (err) {
        // Throw an authentication error if the token is invalid
        throw new AuthenticationError('Invalid token');
    }
};

module.exports = authenticate;