const express = require('express');

const userRouter = express.Router();
const controller = require('./controller');

userRouter.post('/signin', controller.login);

userRouter.post('/signup', controller.create);

userRouter.get('/', controller.getAll);

userRouter.put('/update/:id', controller.updateById);

userRouter.delete('/:id', controller.remove);

module.exports = userRouter;
