const express = require('express');
const { sequelize, Users, Guests, Apartments, Reservations } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended: true}));


function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({msg: err});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({msg: err});

        req.user = user;

        next();
    });
}


route.use(authToken);


route.get('/', (req,res) => {
    Users.findOne({where: {jmbg: req.user.jmbg}})
        .then(usr => {
            if (usr.admin){
                Users.findAll()
                    .then(rows => res.json(rows))
                    .catch(err => res.json(err));
            }
        });
});











module.exports = route;