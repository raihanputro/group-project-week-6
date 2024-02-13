const db = require("../../models");
const _ = require("lodash");
const GeneralHelper = require("./generalHelper");
const Boom = require("boom");
const fileName = "server/helpers/taskPivotHelper.js";

const createMemberTask = async (dataObject) => {
  const { task_id, user_id } = dataObject;
  try {
    if (!Array.isArray(user_id)) {
      throw new Error('user_id is not an array');
    }
    for (const userId of user_id) {
      await db.TaskPivot.create({
        task_id: task_id,
        user_id: userId,
      });
    }
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "createMemberTask", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const updateMemberTask = async (task_id) => {
  try {
    await db.TaskPivot.destroy({ where: { task_id: task_id } });
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "updateMemberTask", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  createMemberTask,
  updateMemberTask,
};
