const userAuthRouter = require('express').Router();

const { validateRequest } = require('../../middleware/index');
const { USER_MIDDLEWARE } = require('../../middleware/auth/user/index');

const { createUser, authenticateUser } = require('../../controller/user/index');

userAuthRouter.post(
    '/register',
    validateRequest(USER_MIDDLEWARE.validatePayload, ['email', 'password', 'username'], USER_MIDDLEWARE),
    createUser
);
userAuthRouter.post(
    '/login',
    validateRequest(USER_MIDDLEWARE.validatePayload, ['email'], USER_MIDDLEWARE),
    authenticateUser
);

module.exports = { userAuthRouter };