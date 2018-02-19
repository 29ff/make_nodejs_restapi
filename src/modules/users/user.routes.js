import express from 'express';
import validate from 'express-validation';
import * as userController from './user.controllers';
import userValidation from './user.validations';
const routes = new express.Router();
routes.post('/signup', validate(userValidation.signup), userController.signUp);
export default routes;