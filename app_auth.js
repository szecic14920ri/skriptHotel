const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const req = require('express/lib/request');
const res = require('express/lib/response');
require('dotenv').config();
const Joi = require('joi');


const app = express();

var corsOptions = {
    origin: 'http://127.0.0.1:8000',
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));







const semaReg = Joi.object().keys({
    name: Joi.string().trim().min(3).max(20).required(),
    password: Joi.string().trim().min(3).max(20).required(),
    email: Joi.string().trim().email().required(),
    admin: Joi.required()
});





app.post('/register', (req,res) => {
    Joi.validate(req.body, semaReg, (err, res) => {
        if(err){
            res.status(400).send(err);
        } else {
            const obj = {
                name: req.body.name,
                password: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email,
                admin: req.body.admin
            };
        
            Users.create(obj).then( row => {
                const obj = {
                    name: usr.name,
                    admin: usr.admin
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
        
                console.log(token);
                res.json({token: token});
            }).catch(err => res.status(500).json(err));
        }
    });

    

});







app.post('/login', (req, res) => {
    Users.findOne({where: {name: req.body.name}})
        .then(usr => {
            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    name: usr.name,
                    admin: usr.admin
                };

                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);

                res.json({token: token});
            } else {
                res.status(400).json({msg: "Invalid name or password"});
            }
        })
        .catch(err => res.status(500).json(err));
});










app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});