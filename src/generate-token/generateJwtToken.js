/**
* @file generateToken.js
* @description Script to generate a JWT token with specified JSON data
* @version 1.0
* @license GNU
* @created 2023-10-01
**/

// Load environment variables from .env file
require('dotenv').config();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * generateAuthToken
 * Generates a one-way hash token.
 * @param {string} data - The data to be hashed.
 * @return {string} - The hashed token.
 **/
const generateAuthToken = (data) => {
    // Create a one-way hash using SHA-256
    return crypto.createHash('sha256').update(data).digest('hex');
};

/**
 * generateJwtToken
 * Generates a JWT token with the specified payload.
 * @param {Object} payload - The payload to be included in the JWT token.
 * @param {string} secret - The secret key to sign the JWT token.
 * @return {string} - The generated JWT token.
 **/
const generateJwtToken = (payload, secret) => {
    // Sign the JWT token with the payload and secret
    return jwt.sign(payload, secret);
};

// Define the payload data
const payload = {
    userId: 1,
    authToken: generateAuthToken('a hash data'), // Generate a one-way hash token
    timeStamp: new Date().toISOString()
};
console.log("🚀 ~ payload:", payload);

// Generate the JWT token
const token = generateJwtToken(payload, process.env.TOKEN_SECRET);

console.log('Generated JWT Token:', token);