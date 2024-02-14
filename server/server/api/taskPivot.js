const Router = require("express").Router();

const taskPivotHelper = require("../helpers/taskPivotHelper");

const GeneralHelper = require("../helpers/generalHelper");

const Validation = require("../helpers/validationHelper");

const Middleware = require("../middlewares/authMiddleware");

const fileName = "server/api/task.js";

const updateMemberTask = async (req, res) => {
  try {
    Validation.updateMemberValidation(req.body);
    const dataToken = req.body.dataToken;
    const { task_id, member_id } = req.body;
    const response = await taskPivotHelper.updateMemberTask(
      task_id,
      member_id,
      dataToken
    );
    return res.send(response);
  } catch (err) {
    console.log([fileName, "updateMemberTask", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

Router.put("/update-member", Middleware.validateToken, updateMemberTask);

module.exports = Router;
