const Boom = require('boom');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const db = require('../../models');
const GeneralHelper = require('./generalHelper');
const fileName = 'server/helpers/userHelper.js';
const salt = bcrypt.genSaltSync(10);

// eslint-disable-next-line arrow-body-style
const __hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

// eslint-disable-next-line arrow-body-style
const __comparePassword = (payloadPass, dbPass) => {
    return bcrypt.compareSync(payloadPass, dbPass);
};

const getProfileUser = async (id) => {
    try {
        const response = await db.User.findOne({
            where: {
                id
            },
            attributes: ['id', 'name', 'email', 'imageUrl', 'role', 'deletedAt']
        });

        return Promise.resolve(response);
    } catch (error) {
        console.log([fileName, 'get profile helper', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const changePassword = async (old_password, new_password, new_confirm_password, id) => {
    try {
        if (!old_password || !new_password || !new_confirm_password) {
            return Promise.reject(Boom.badRequest('Must Fill Old Password, New Password and New Confirm Password'))
        };

        const checkUser = await db.User.findOne({
            where: {
                id
            }
        });

        const isPassMatch = __comparePassword(old_password, checkUser.password);

        if (!isPassMatch) {
            return Promise.reject(Boom.badRequest('Wrong Old Password'))
        };

        if (new_password !== new_confirm_password) {
            return Promise.reject(Boom.badRequest('New Confirm Password Incorrect'))
        };

        if (old_password === new_password) {
            return Promise.reject(Boom.badRequest('New Password Must be Different'))
        };

        await db.User.update({
            password: __hashPassword(new_password)
        },
            {
                where: {
                    id
                }
            });

        return Promise.resolve(true);
    } catch (error) {
        console.log([fileName, 'Change Password', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

module.exports = {
    getProfileUser,
    changePassword
}