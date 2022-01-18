const express = require('express');
const { sequelize, Users, Guests, Apartments, Reservations } = require('../models');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
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




const semaReg = Joi.object().keys({
    guestJMBG: Joi.string().trim().min(13).max(13).required(),
    apartmentName: Joi.string().trim().min(3).max(20).required(),
    dateOfArrival: Joi.date().required(),
    dateOfDeparture: Joi.date().required()
});




route.get('/', (req, res) => {
    Reservations.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});


route.post('/', (req, res) => {
    Joi.validate(req.body, sema, (err, res) => {
        if (err) {
            res.status(400).send(err);
        } else {
            Reservations.create({guestJMBG: req.body.guestJMBG, apartmentName: req.body.apartmentName, dateOfArrival: req.body.dateOfArrival, dateOfDeparture: req.body.dateOfDeparture})
            .then(row => res.json(row))
            .catch(err => res.status(500).json(err));
        }
    });
    
});





module.exports = route;