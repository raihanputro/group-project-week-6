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

const getListUserAdmin = async () => {
    try {
        const response = await db.User.findAll();

        return Promise.resolve(response);
    } catch (error) {
        console.log([fileName, 'get all user helper', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

const getProfileUser = async (dataToken) => {
    try {
        const response = await db.User.findOne({
            where: {
                id: dataToken?.id
            },
            attributes: ['id', 'name', 'email', 'imageUrl', 'role', 'deletedAt']
        });

        return Promise.resolve(response);
    } catch (error) {
        console.log([fileName, 'get profile helper', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const changePassword = async (old_password, new_password, new_confirm_password, dataToken) => {
    try {
        if (!old_password || !new_password || !new_confirm_password) {
            return Promise.reject(Boom.badRequest('Must Fill Old Password, New Password and New Confirm Password'))
        };

        const checkUser = await db.User.findOne({
            where: {
                id: dataToken?.id
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
                    id: dataToken?.id
                }
            });

        return Promise.resolve(true);
    } catch (error) {
        console.log([fileName, 'Change Password Helper', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const updateProfile = async (dataToken, name) => {
    try {
        const checkUser = await db.User.findOne({
            where: {
                id: dataToken?.id
            }
        });

        if (!checkUser) {
            return Promise.reject(Boom.badRequest('User not found'))
        };

        await db.User.update({
            name: name ? name : checkUser.name
        }, {
            where: {
                id: dataToken?.id
            }
        });

        return Promise.resolve(true)
    } catch (error) {
        console.log([fileName, 'Update Profile Helper', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const changeImage = async () => {
    try {
        return Promise.resolve(true);
    } catch (error) {
        console.log([fileName, 'Change Image Helper', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

module.exports = {
    getListUserAdmin,
    getProfileUser,
    changePassword,
    updateProfile,
    changeImage
};