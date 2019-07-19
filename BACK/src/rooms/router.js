const express = require('express');
const roomRouter = express.Router();
const controller = require('./controller');

roomRouter.post('/room', controller.getAll);

module.exports = roomRouter;
