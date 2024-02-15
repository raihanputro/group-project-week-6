const db = require("../../models");
const _ = require("lodash");
const GeneralHelper = require("./generalHelper");
const Boom = require("boom");
const fileName = "server/helpers/taskHelper.js";


const getListTaskAdmin = async () => {
  try {
      const response = await db.Task.findAll();

      return Promise.resolve(response);
  } catch (error) {
      console.log([fileName, 'get all user helper', 'ERROR'], { info: `${error}` });
      return Promise.reject(GeneralHelper.errorResponse(error));
  }
}

const getListTaskHelper = async (dataToken) => {
  try {
    const checkTask = await db.Task.findAll({
      include: {
        model: db.User,
      },
      where: { user_id: dataToken.id },
    });
    if (_.isEmpty(checkTask)) {
      return { message: "Your Task is Empty" };
    }
    return Promise.resolve(checkTask);
  } catch (err) {
    console.log([fileName, "getListTaskHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getTaskDetailHelper = async (id, dataToken) => {
  try {
    const checkTask = await db.Task.findOne({
      where: {
        id: id,
        user_id: dataToken.id,
      },
      include: {
        model: db.User,
      },
    });
    if (_.isEmpty(checkTask)) {
      return Promise.reject(
        Boom.badRequest("Task with this id is doesn't exist")
      );
    }
    return Promise.resolve(checkTask);
  } catch (err) {
    console.log([fileName, "getTaskDetailHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const createTaskHelper = async (dataObject, dataToken) => {
  const { name, description, start_date, end_date, status } = dataObject;
  try {
    await db.Task.create({
      name: name,
      description: description,
      start_date: start_date,
      end_date: end_date,
      status: status,
      user_id: dataToken.id,
    });
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "createTaskHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const updateTaskHelper = async (
  id,
  name,
  description,
  start_date,
  end_date,
  status,
  dataToken
) => {
  try {
    const checkAuthorization = await db.Task.findOne({
      where: { user_id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to see this data")
      );
    }
    const checkTask = await db.Task.findOne({
      where: { id: id },
    });
    if (!checkTask) {
      return Promise.reject(
        Boom.badRequest("Task with this id is doesn't exist")
      );
    }
    await db.Task.update(
      {
        name: name ? name : checkTask.dataValues.name,
        description: description
          ? description
          : checkTask.dataValues.description,
        start_date: start_date ? start_date : checkTask.dataValues.start_date,
        end_date: end_date ? end_date : checkTask.dataValues.end_date,
        status: status ? status : checkTask.dataValues.status,
      },
      { where: { id: id } }
    );
    return Promise.resolve(true);
  } catch (error) {
    console.log([fileName, "updateTaskHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const deleteTaskAdmin = async (id) => {
  try {
    const checkTask = await db.Task.findOne({
      where: { id: id },
    });
    if (!checkTask) {
      return Promise.reject(
        Boom.badRequest("Task with this id is doesn't exist")
      );
    } else {
      await db.Task.destroy({
        where: {
          id: id,
        },
      });
    }
    return Promise.resolve(true);
  } catch (error) {
    console.log([fileName, "deleteTaskAdmin", "ERROR"], {info: `${err}`});
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
}

const deleteTaskHelper = async (id, dataToken) => {
  try {
    const checkAuthorization = await db.Task.findOne({
      where: { user_id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to see this data")
      );
    }
    const checkTask = await db.Task.findOne({
      where: { id: id },
    });
    if (!checkTask) {
      return Promise.reject(
        Boom.badRequest("Task with this id is doesn't exist")
      );
    } else {
      await db.Task.destroy({
        where: {
          id: id,
        },
      });
    }
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "deleteTaskHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  getListTaskAdmin,
  getListTaskHelper,
  createTaskHelper,
  getTaskDetailHelper,
  deleteTaskAdmin,
  deleteTaskHelper,
  updateTaskHelper,
};
