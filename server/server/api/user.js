const Router = require('express').Router();

const UserHelper = require('../helpers/userHelper');
const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/api/user.js';

const getProfileUser = async (request, reply) => {
    try {
        const {id} = request.query;

        const response = await UserHelper.getProfileUser(id);
        return reply.send({
            message: 'Get Profile Success',
            response
        })
    } catch (error) {
        console.log([fileName, 'get profile api', 'ERROR'], { info: `${error}` });
        return reply.send(GeneralHelper.errorResponse(error));
    }
}

Router.get('/my-profile', getProfileUser);

module.exports = Router;