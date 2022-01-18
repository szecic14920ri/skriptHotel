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
    lastName: Joi.string().trim().min(3).max(20).required(),
    jmbg: Joi.string().trim().min(13).max(13).required()
});




route.get('/', (req, res) => {
    Guests.findOne({where: {jmbg: req.body.jmbg}})
        .then(guest => res.json(guest))
        .catch(err => res.status(403).json(err));
});


route.post('/', (req, res) => { 
    Joi.validate(req.body, sema, (err, res) => {
        if (err) {
            res.status(400).send(err);
        } else {
            Guests.create({name: req.body.name, lastName: req.body.lastName, jmbg: req.body.jmbg})
            .then(row => res.json(row))
            .catch(err => res.status(500).json(err));
        }
    });
        
});


route.delete('/', (req, res) => {
    Guests.findOne({where: {jmbg: req.body.jmbg}})
        .then(gst => {
            gst.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
});


route.get('/all', (req, res) =>{
    Guests.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});






module.exports = route;