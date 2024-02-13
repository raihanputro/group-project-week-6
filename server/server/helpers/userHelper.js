const Boom = require('boom');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const db = require('../../models');
const GeneralHelper = require('./generalHelper');
const fileName = 'server/helpers/userHelper.js';

const getProfileUser = async (id) => {
    try {
        const response = await db.User.findOne({
            where:{
                id
            },
            attributes: ['id', 'name', 'email', 'imageUrl', 'role', 'deletedAt']
        });

        return Promise.resolve(response)
    } catch (error) {
        console.log([fileName, 'get profile helper', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error))
    }
}

module.exports = {
    getProfileUser
}