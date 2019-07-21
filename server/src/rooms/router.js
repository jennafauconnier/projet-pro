const express = require('express');

const roomRouter = express.Router();
const controller = require('./controller');
const authMiddleware = require('../middlewares/auth.middleware');

roomRouter.get('/', authMiddleware, controller.getAll);
roomRouter.post('/', authMiddleware, controller.createRoom);

module.exports = roomRouter;
