const Router = require('express').Router();

const UserHelper = require('../helpers/userHelper');
const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const Middleware = require('../middlewares/authMiddleware');
const { decryptObject, decryptTextPayload } = require('../utils/decryptor');

const fileName = 'server/api/user.js';

const getProfileUser = async (request, reply) => {
    try {
        const dataToken = request.body.dataToken;

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
        // const { old_password, new_password, new_confirm_password } = decryptObject(request.body);
        const data = request.body;
        const old_password = decryptTextPayload(data?.old_password);
        const new_password = decryptTextPayload(data?.new_password);
        const new_confirm_password = decryptTextPayload(data?.new_confirm_password);

        Validation.changePassValidation({ old_password, new_password, new_confirm_password });

        const dataToken = request.body.dataToken;

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
        const dataToken = request.body.dataToken;
        const { name } = request.body;

        const response = await UserHelper.updateProfile(dataToken, name);

        return reply.send({
            message: 'Update Profile Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Update Profile API', 'ERROR'], { info: `${error}` });
        return reply.send(GeneralHelper.errorResponse(error));
    }
};

Router.get('/my-profile', Middleware.validateToken, getProfileUser);
Router.patch('/change-password', Middleware.validateToken, changePassword);
Router.patch('/update-profile', Middleware.validateToken, updateProfile);

module.exports = Router;