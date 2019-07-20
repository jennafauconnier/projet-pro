const express = require('express');
const roomRouter = express.Router();
const controller = require('./controller');

roomRouter.get('/', controller.getAll);
roomRouter.post('/', controller.createRoom);

module.exports = roomRouter;
