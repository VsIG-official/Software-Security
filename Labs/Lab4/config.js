'use strict';

const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    port: process.env.PORT || 3000,
    domain: process.env.DOMAIN || '',
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || '',
    audience: process.env.AUDIENCE || '',
}
