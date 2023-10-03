const express = require('express');
const { creerUser, getAllUsers, getUserById, deleteUser, updateUser, createdUserWithRole, SignIn } = require('../services/user.service');

const routes = express.Router();

routes.post('/createUser',creerUser);
routes.post('/createUserRole',createdUserWithRole);
routes.get('/allUser', getAllUsers);
routes.get('/:id', getUserById);
routes.delete('/delete/:id', deleteUser);
routes.put('/:id',updateUser);
routes.post('/login', SignIn);

module.exports = routes;