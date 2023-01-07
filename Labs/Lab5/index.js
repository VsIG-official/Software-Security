const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const jwt = require('jsonwebtoken');
const config = require('./config');
const getAppToken = require('./auth0/app-token');
const getUserToken = require('./auth0/user-token');
const getUser = require('./auth0/user-get');
const getPublicKey = require('./auth0/pem-get');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SESSION_KEY = 'Authorization';

// works every request
app.use((req, res, next) => {
    const authHeader = req.get(SESSION_KEY)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return next()

    try {
        const user = jwt.verify(token, config.publicKey, config.jwtVerifyOptions);
        req.userID = user.sub;
    } catch (error) {
        console.log({jwtError: error.message});
        return res.status(401).send()
    }

    next()
});

app.get('/', async (req, res) => {
    if (req.userID) {
        const user = await getUser(req.userID);

        return res.json({
            username: `${user.name} (${user.email})`,
            logout: 'http://localhost:3000/logout'
        })
    }
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/logout', (req, res) => {
    res.redirect('/');
});

app.post('/api/login', async (req, res) => {
    const { login, password } = req.body;

    try {
        const userTokenInfo = await getUserToken(login, password);
        if (!userTokenInfo) {
            return res.status(401).send();
        }

        res.json({ token: userTokenInfo.access_token });
    } catch (error) {
        console.log(error)
    }
});

app.listen(config.port, async () => {
    console.log(`Example app listening on port ${port}`);

    const publicKey = await getPublicKey();
    const appTokenInfo = await getAppToken();
    config.appToken = appTokenInfo.access_token;
    config.publicKey = publicKey;
})
