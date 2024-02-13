const Router = require("express").Router();

const taskPivotHelper = require("../helpers/taskPivotHelper");

const GeneralHelper = require("../helpers/generalHelper");

const ValidationTask = require("../helpers/validationHelper");

const fileName = "server/api/task.js";

const createMemberTask = async (req, res) => {
  try {
    const { task_id, user_id } = req.body;
    const response = await taskPivotHelper.createMemberTask({
      task_id,
      user_id,
    });
    return res.send(response);
  } catch (err) {
    console.log([fileName, "createMemberTask", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const updateMemberTask = async (req, res) => {
  console.log(req.body,"<<<<<<")
  try {
    const { task_id } = req.body;
    const response = await taskPivotHelper.createMemberTask(
      task_id,
    );
    return res.send(response);
  } catch (err) {
    console.log([fileName, "updateMemberTask", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

Router.post("/add-member", createMemberTask);
Router.delete("/update-member",updateMemberTask);

module.exports = Router;
