'use strict'

const axios = require('axios');
const config = require('../config');

const codeTokenOptions = (code) => ({
    method: 'POST',
    url: `https://${config.domain}/oauth/token`,
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
    },
    data: new URLSearchParams( {
        grant_type: 'authorization_code',
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        redirect_uri: 'http://localhost:3000',
    }),
});

const getTokenByCode = async (code) => {
  try {
      const body = await axios.request(codeTokenOptions(code));
      return body.data;
  } catch (error) {
      console.log(error);
      return null;
  }
};

module.exports = getTokenByCode;
