const Router = require('express').Router();

const Decryptor = require('../utils/decryptor');
const Middleware = require('../middlewares/authMiddleware');
const Validation = require('../helpers/validationHelper');
const AuthHelper = require('../helpers/authHelper');
const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/api/auth.js';

const register = async (request, reply) => {
  try {
    Validation.registerValidation(request.body);

    const { name, email, password, role } = request.body;
    const response = await AuthHelper.registerUser({ name, email, password, role });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'register', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const login = async (request, reply) => {
  try {
    const decryptedData = Decryptor.decryptObject(request.body);
    Validation.loginValidation(decryptedData);
    const { email, password } = decryptedData;
    const response = await AuthHelper.login({ email, password });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'login', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}
const getUserDetails = async (request, reply) => {
  try {
    Validation.userDetailValidation(request.params);
    const { id } = request.params;
    const response = await AuthHelper.getUserDetails({ id });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'list', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

// eslint-disable-next-line arrow-body-style
const hello = async (request, reply) => {
  // SAMPLE API WITH JWT MIDDLEWARE 
  return reply.send('HELLO');
}

Router.post('/api/register', register);
Router.post('/api/login', login);
Router.get('/api/hello', Middleware.validateToken, hello);
Router.get('/api/user-details/:id', getUserDetails);

module.exports = Router;