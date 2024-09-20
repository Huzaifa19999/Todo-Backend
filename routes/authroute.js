const express = require('express');
const AuthController = require('../controllers/authcontroller');
const route = express.Router();

route.post('/signup',AuthController.signup)
route.post('/login',AuthController.login)
route.get('/checkauth',AuthController.checkauth)

module.exports = route;