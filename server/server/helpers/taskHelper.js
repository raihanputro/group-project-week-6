const db = require("../../models");
const _ = require("lodash");
const GeneralHelper = require("./generalHelper");
const Boom = require("boom");
const fileName = "server/helpers/taskHelper.js";

//admin-start
const getListTaskAdminHelper = async (dataToken) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id, role: 1 },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to see this data")
      );
    }
    const checkTask = await db.Task.findAll({
      include: {
        model: db.User,
      },
      paranoid: false,
    });
    if (_.isEmpty(checkTask)) {
      return { message: "Your Task is Empty" };
    }

    return Promise.resolve(checkTask);
  } catch (err) {
    console.log([fileName, "getListTaskAdmin", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getTaskDetailAdminHelper = async (id, dataToken) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id, role: 1 },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to see this data")
      );
    }
    const checkTask = await db.Task.findOne({
      where: {
        id: id,
      },
      include: {
        model: db.User,
      },
      paranoid: false,
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

const createTaskAdminHelper = async (dataObject, dataToken) => {
  const { name, description, start_date, end_date, status } = dataObject;
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id, role: 1 },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to create this data")
      );
    }
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

const updateTaskAdminHelper = async (
  id,
  name,
  description,
  start_date,
  end_date,
  status,
  user_id,
  dataToken
) => {
  try {
    const checkAuthorizationUser = await db.User.findOne({
      where: { id: dataToken.id, role: 1 },
    });
    if (_.isEmpty(checkAuthorizationUser)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
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
        user_id: user_id ? user_id : checkTask.dataValues.user_id,
      },
      { where: { id: id } }
    );
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "updateTaskAdminHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const restoreTaskAdminHelper = async (id, dataToken) => {
  try {
    const checkAuthorizationUser = await db.User.findOne({
      where: { id: dataToken.id, role: 1 },
    });
    if (_.isEmpty(checkAuthorizationUser)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
    }
    const checkTask = await db.Task.findOne({
      where: { id: id },
      paranoid: false,
    });
    if (!checkTask) {
      return Promise.reject(
        Boom.badRequest("Task with this id is doesn't exist")
      );
    } else {
      await db.Task.restore({
        where: {
          id: id,
        },
      });
    }
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "restoreTaskAdminHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const deleteTaskAdminHelper = async (id, dataToken) => {
  try {
    const checkAuthorizationUser = await db.User.findOne({
      where: { id: dataToken.id, role: 1 },
    });
    if (_.isEmpty(checkAuthorizationUser)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
    }
    const checkTask = await db.Task.findOne({
      where: { id: id },
      paranoid: false,
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
        force: true,
      });
    }
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "deleteTaskAdminHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

//admin-end

//manager-start
const getListTaskManagerHelper = async (dataToken) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id, role: 2 },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to see this data")
      );
    }
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

const getTaskDetailManagerHelper = async (id, dataToken) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id, role: 2 },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to see this data")
      );
    }
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

const createTaskManagerHelper = async (dataObject, dataToken) => {
  const { name, description, start_date, end_date, status } = dataObject;
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id, role: 2 },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to see this data")
      );
    }
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

const updateTaskManagerHelper = async (
  id,
  name,
  description,
  start_date,
  end_date,
  status,
  dataToken
) => {
  try {
    const checkAuthorizationUser = await db.User.findOne({
      where: { id: dataToken.id, role: 2 },
    });
    const checkAuthorizationTask = await db.Task.findOne({
      where: { user_id: dataToken.id, id: id },
    });
    if (_.isEmpty(checkAuthorizationUser)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
    }

    if (_.isEmpty(checkAuthorizationTask)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to update this data")
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
  } catch (err) {
    console.log([fileName, "updateTaskHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const deleteTaskManagerHelper = async (id, dataToken) => {
  try {
    const checkAuthorizationUser = await db.User.findOne({
      where: { id: dataToken.id, role: 2 },
    });
    if (_.isEmpty(checkAuthorizationUser)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
    }
    const checkAuthorizationTask = await db.Task.findOne({
      where: { user_id: dataToken.id, id: id },
    });
    if (_.isEmpty(checkAuthorizationTask)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to delete this data")
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
    console.log([fileName, "deleteTaskManagerHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};
//manager-end

//member-start
const getListTaskMemberHelper = async (dataToken) => {
  try {
    const checkAuthorizationUser = await db.User.findOne({
      where: { id: dataToken.id, role: 3 },
    });
    if (_.isEmpty(checkAuthorizationUser)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
    }
    const checkTask = await db.TaskPivot.findAll({
      include: [
        {
          model: db.User,
        },
        {
          model: db.Task,
          include: {
            model: db.User,
          },
        },
      ],
      where: { member_id: dataToken.id },
    });
    if (_.isEmpty(checkTask)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
    }
    return Promise.resolve(checkTask);
  } catch (err) {
    console.log([fileName, "getListTaskMemberHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getDetailTaskMemberHelper = async (id, dataToken) => {
  try {
    const checkAuthorizationUser = await db.User.findOne({
      where: { id: dataToken.id, role: 3 },
    });
    if (_.isEmpty(checkAuthorizationUser)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
    }
    const checkTask = await db.TaskPivot.findAll({
      include: [
        {
          model: db.User,
        },
        {
          model: db.Task,
          include: {
            model: db.User,
          },
        },
      ],
      where: { member_id: dataToken.id, task_id: id },
    });
    if (_.isEmpty(checkTask)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
    }
    return Promise.resolve(checkTask);
  } catch (err) {
    console.log([fileName, "getDetailTaskMemberHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};
//member-start

module.exports = {
  //admin-route-start
  getListTaskAdminHelper,
  getTaskDetailAdminHelper,
  createTaskAdminHelper,
  updateTaskAdminHelper,
  restoreTaskAdminHelper,
  deleteTaskAdminHelper,
  //admin-route-end

  //manager-route-start
  getListTaskManagerHelper,
  createTaskManagerHelper,
  getTaskDetailManagerHelper,
  deleteTaskManagerHelper,
  updateTaskManagerHelper,
  //manager-route-end

  //member-route-start
  getListTaskMemberHelper,
  getDetailTaskMemberHelper,
  //member-route-end
};
