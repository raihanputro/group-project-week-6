const db = require("../../models");
const _ = require("lodash");
const GeneralHelper = require("./generalHelper");
const Boom = require("boom");
const fileName = "server/helpers/taskPivotHelper.js";

const updateMemberTask = async (task_id, member_id, dataToken) => {
  try {
    const checkMember = await db.User.findOne({
      where: { id: member_id },
    });
    if (_.isEmpty(checkMember)) {
      return Promise.reject(
        Boom.unauthorized("Member with this id is doesn't exist")
      );
    }
    const checkAuthorization = await db.Task.findOne({
      where: { user_id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to see this data")
      );
    }
    const userIds = Array.isArray(member_id) ? member_id : [member_id];

    await db.TaskPivot.destroy({
      where: {
        task_id: task_id,
        user_id: dataToken.id,
      },
    });
    const newRows = userIds.map((userId) => ({
      user_id: dataToken.id,
      task_id: task_id,
      member_id: userId,
    }));
    await db.TaskPivot.bulkCreate(newRows);

    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "updateMemberTask", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  updateMemberTask,
};
