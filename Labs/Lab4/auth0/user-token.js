'use strict';

const axios = require('axios');
const config = require('../../config')

const userTokenOptions = (username, password) => ({
    method: 'POST',
    url: `https://${config.domain}/oauth/token`,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
        grant_type: 'password',
        audience: config.audience,
        scope: 'offline_access',
        client_id: config.clientId,
        client_secret: config.clientSecret,
        username,
        password,
    })
});

const getUserToken = async (username, password) => {
    try {
        const options = userTokenOptions(username, password);
        const body = await axios.request(options);
        return body.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = getUserToken;
