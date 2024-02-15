const Router = require('express').Router();

const UserHelper = require('../helpers/userHelper');
const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const Middleware = require('../middlewares/authMiddleware');

const fileName = 'server/api/user.js';

const getProfileUser = async (request, reply) => {
    try {
        const dataToken = request.body.token;

        const response = await UserHelper.getProfileUser(dataToken);
        return reply.send({
            message: 'Get Profile Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'get profile api', 'ERROR'], { info: `${error}` });
        return reply.send(GeneralHelper.errorResponse(error));
    }
};

const changePassword = async (request, reply) => {
    try {
        Validation.changePassValidation(request.body);

        const { old_password, new_password, new_confirm_password } = request.body;

        const dataToken = request.body.token;

        const response = await UserHelper.changePassword(old_password, new_password, new_confirm_password, dataToken);

        return reply.send({
            message: 'Change Password Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Change Password API', 'ERROR'], { info: `${error}` });
        return reply.send(GeneralHelper.errorResponse(error));
    }
};

const updateProfile = async (request, reply) => {
    try {
        const { id } = request.query;
        const { name } = request.body;

        const response = await UserHelper.updateProfile(id, name);

        return reply.send({
            message: 'Update Profile Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Update Profile API', 'ERROR'], { info: `${error}` });
        return reply.send(GeneralHelper.errorResponse(error));
    }
};

Router.get('/api/my-profile', Middleware.validateToken, getProfileUser);
Router.patch('api/change-password', Middleware.validateToken, changePassword);
Router.patch('api/update-profile', updateProfile);

module.exports = Router;