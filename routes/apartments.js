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
    name: Joi.string().trim().min(3).max(20).required(),
    numberOfRooms: Joi.number().min(1).max(10).required(),
    numberOfBeds: Joi.number().min(1).max(10).required()
});




route.get('/', (req, res) => {
    Apartments.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});


route.post('/', (req, res) => {
    Joi.validate(req.body, sema, (err, res) => {
        if(err) {
            res.status(400).send(err);
        } else {
            Apartments.create({name: req.body.name, numberOfRooms: req.body.numberOfRooms, numberOfBeds: req.body.numberOfBeds})
            .then(row => res.json(row))
            .catch(err => res.status(500).json(err));
        }
    });
    
});



route.delete('/', (req, res) => {
    Apartment.findOne({where: {name: req.body.name}})
        .then(apt => {
            apt.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
});







module.exports = route;