'use strict';

const axios = require('axios');
const config = require('../config');

const userGetOptions = (userID) => ({
    method: 'GET',
    url: `https://${config.domain}/api/v2/users/${userID}`,
    headers: {
      Authorization: `Bearer ${config.appToken}`,
    },
});

const getUser = async (userID) => {
    try {
        const options = userGetOptions(userID);
        const body = await axios.request(options);
        return body.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = getUser;
