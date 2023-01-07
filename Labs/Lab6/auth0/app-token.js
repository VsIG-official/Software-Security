'use strict'

const axios = require('axios');
const config = require('../config')

const appTokenOptions = {
    method: 'POST',
    url: `https://${config.domain}/oauth/token`,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        audience: config.audience,
        grant_type: 'client_credentials'
    }),
}

const getAppToken = async () => {
    try {
        const body = await axios.request(appTokenOptions);
        return body.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = getAppToken;
