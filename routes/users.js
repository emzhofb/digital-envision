const express = require('express');
const routes = express();
const { insertUser, deleteUser, updateUser } = require('../controllers/users');

routes.post('/user', insertUser);
routes.delete('/user/:id', deleteUser);
routes.put('/user/:id', updateUser);

module.exports = routes;
