const Router = require("express").Router();

const taskHelper = require("../helpers/taskHelper");

const GeneralHelper = require("../helpers/generalHelper");

const ValidationTask = require("../helpers/validationHelper");

const fileName = "server/api/task.js";

const listTask = async (req, res) => {
  try {
    const response = await taskHelper.getListTaskHelper();
    return res.send({
      message: "Task data received successfully",
      response,
    });
  } catch (err) {
    console.log([fileName, "listTask", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const createTask = async (req, res) => {
  try {
    ValidationTask.createTaskValidation(req.body);
    const {
      name,
      description,
      start_date,
      end_date,
      status,
      user_id,
      user_member,
    } = req.body;
    const response = await taskHelper.createTaskHelper({
      name,
      description,
      start_date,
      end_date,
      status,
      user_id,
      user_member,
    });
    return res.send(response);
  } catch (err) {
    console.log([fileName, "createList", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const detailList = async (req, res) => {
  try {
    ValidationTask.idTaskValidation(req.params);
    const { id } = req.params;
    const response = await taskHelper.getTaskDetailHelper(id);
    return res.send({
      message: "Task detail data received successfully",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "detailList", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, start_date, end_date, status } = req.body;
    const response = await taskHelper.updateTaskHelper(
      id,
      name,
      description,
      start_date,
      end_date,
      status
    );
    return res.send({
      message: "Task data successfully updated",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "updateTask", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const deleteTask = async (req, res) => {
  try {
    ValidationTask.idTaskValidation(req.params);
    const { id } = req.params;
    const response = await taskHelper.deleteTaskHelper(id);
    return res.status(200).send({
      message: "Task data successfully deleted",
      response,
    });
  } catch (err) {
    console.log([fileName, "deleteTask", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/list", listTask);
Router.post("/create", createTask);
Router.get("/detail/:id", detailList);
Router.put("/update/:id", updateTask);
Router.delete("/delete/:id", deleteTask);

module.exports = Router;
