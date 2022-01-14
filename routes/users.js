const express = require('express');
const routes = express();
const { insertUser, deleteUser } = require('../controllers/users');

routes.post('/user', insertUser);
routes.delete('/user/:id', deleteUser);

module.exports = routes;
