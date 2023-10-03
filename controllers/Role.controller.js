const express = require('express');
const { creerRole } = require('../services/role.service');
const routes = express.Router();

routes.post('/createRole',creerRole);

module.exports = routes;