const express = require('express');
const { sequelize, Users } = require('./models');

const apartments = require('./routes/apartments');
const guests = require('./routes/guests');
const reservations = require('./routes/reservations');
const users = require('./routes/users');

const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const app = express();

app.use('/admin/apartments', apartments);
app.use('/admin/guests', guests);
app.use('/admin/reservations', reservations);
app.use('/admin/users', users);










function getCookies(req) {
    if (req.headers.cookie == null ) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
}



function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];

    if (token == null) return res.redirect(301, '/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.redirect(301, '/login');

        req.user = user;

        next();
    });
}



app.get('/register', (req, res) => {
    res.sendFile('registerAdmin.html', {root: './statc'});
})

app.get('/login', (req, res) => {
    res.sendFile('login.html', {root: './static'});
});

app.get('/', authToken, (req, res) => {
    res.sendFile('index.html', {root: './static'});
});



app.use(express.static(path.join(__dirname, 'static')));


app.listen({port: 8000}, async() => {
    await sequelize.authenticate();
});


