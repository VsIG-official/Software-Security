const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

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
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user
    } catch (error) {
        return res.status(401).send()
    }

    next()
});

app.get('/', (req, res) => {
    if (req.user) {
        return res.json({
            username: req.user.login,
            logout: 'http://localhost:3000/logout'
        })
    }
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/logout', (req, res) => {
    res.redirect('/');
});

const users = [
    {
        login: 'Login',
        password: 'Password',
        username: 'Username',
    },
    {
        login: 'Valentyn',
        password: 'vsig',
        username: 'Dominskyi',
    }
]

app.post('/api/login', (req, res) => {
    const { login, password } = req.body;

    const user = users.find((user) => (
        user.login == login && user.password == password
    ));

    if (user) {
        const token = CreateJWT({ login: user.login });

        res.json({ token });
    }

    res.status(401).send();
});

function CreateJWT(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
  }

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
