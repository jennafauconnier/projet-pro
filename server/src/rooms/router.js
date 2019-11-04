const express = require('express');

const roomRouter = express.Router();
const controller = require('./controller');
const authMiddleware = require('../middlewares/auth.middleware');

roomRouter.get('/', authMiddleware, controller.getAll);
roomRouter.post('/', authMiddleware, controller.createRoom);
roomRouter.post('/:roomName/join', authMiddleware, controller.joinRoom);
roomRouter.post('/:roomName/messages', authMiddleware, controller.addMessage);
roomRouter.get('/:roomName/messages', authMiddleware, controller.getMessages);

module.exports = roomRouter;
