'use strict'

const axios = require('axios');
const config = require('../config');

const pemOptions = {
    method: 'GET',
    url: `https://${config.domain}/pem`,
}

const getPublicKey = async () => {
    try {
        const body = await axios.request(pemOptions);
        return body.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = getPublicKey;
