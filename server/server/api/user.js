const Router = require('express').Router();

const UserHelper = require('../helpers/userHelper');
const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');

const fileName = 'server/api/user.js';

const getProfileUser = async (request, reply) => {
    try {
        const { id } = request.query;

        const response = await UserHelper.getProfileUser(id);
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

        const { id } = request.query;

        const response = await UserHelper.changePassword(old_password, new_password, new_confirm_password, id);

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

Router.get('/my-profile', getProfileUser);
Router.patch('/change-password', changePassword);
Router.patch('/update-profile', updateProfile);

module.exports = Router;