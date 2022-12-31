'use strict';

const dotenv = require('dotenv')
dotenv.config()

const config = {
    port: process.env.PORT || 3000,
    domain: process.env.DOMAIN || '',
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || '',
    audience: process.env.AUDIENCE || '',
};

module.exports = {
    ...config,
    jwtVerifyOptions: {
        issuer: `https://${config.domain}/`,
        audience: config.audience,
        algorithms: ['RS256'],
    }
}
