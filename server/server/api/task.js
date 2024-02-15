const Router = require("express").Router();

const taskHelper = require("../helpers/taskHelper");

const GeneralHelper = require("../helpers/generalHelper");

const ValidationTask = require("../helpers/validationHelper");

const Middleware = require("../middlewares/authMiddleware");

const fileName = "server/api/task.js";

const listTask = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    const response = await taskHelper.getListTaskHelper(dataToken);
    return res.send({
      message: "Task data received successfully",
      response,
    });
  } catch (err) {
    console.log([fileName, "listTask", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const listTaskAdmin = async ( req, res ) => {
  try {
    const response = await taskHelper.getListTaskAdmin();

    return res.send({
      message: 'List task data received successfully',
      response,
    })
  } catch (error) {
    console.log([fileName, "listTaskAdmin", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
}

const createTask = async (req, res) => {
  try {
    const dataToken = req.body.dataToken; // Assuming dataToken contains user information
    ValidationTask.createTaskValidation(req.body);
    const { name, description, start_date, end_date, status } = req.body;
    const response = await taskHelper.createTaskHelper(
      { name, description, start_date, end_date, status },
      dataToken
    );
    return res.send(response);
  } catch (err) {
    console.log([fileName, "createTask", "ERROR"], { info: `${err}` });
    return res.status(500).send(GeneralHelper.errorResponse(err));
  }
};

const detailList = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    ValidationTask.idTaskValidation(req.params);
    const { id } = req.params;
    const response = await taskHelper.getTaskDetailHelper(id, dataToken);
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
    const dataToken = req.body.dataToken;
    ValidationTask.idTaskValidation(req.params);
    const { id } = req.params;
    const { name, description, start_date, end_date, status } = req.body;
    const response = await taskHelper.updateTaskHelper(
      id,
      name,
      description,
      start_date,
      end_date,
      status,
      dataToken
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
    const dataToken = req.body.dataToken;
    ValidationTask.idTaskValidation(req.params);
    const { id } = req.params;
    const response = await taskHelper.deleteTaskHelper(id, dataToken);
    return res.status(200).send({
      message: "Task data successfully deleted",
      response,
    });
  } catch (err) {
    console.log([fileName, "deleteTask", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const deleteTaskAdmin = async (req, res) => {
  try {
    ValidationTask.idTaskValidation(req.params);
    const { id } = req.params;
    const response = await taskHelper.deleteTaskAdmin(id);
    return res.status(200).send({
      message: 'Task data successfully deleted',
      response,
    });
  } catch (error) {
    console.log([fileName, "deleteTaskAdmin", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
}

Router.get("/list", Middleware.validateToken, listTask);
Router.get("/list-admin", Middleware.validateToken, listTaskAdmin);
Router.post("/create", Middleware.validateToken, createTask);
Router.get("/detail/:id", Middleware.validateToken, detailList);
Router.put("/update/:id", Middleware.validateToken, updateTask);
Router.delete("/delete/:id", Middleware.validateToken, deleteTask);
Router.delete("/delete-admin/:id", Middleware.validateToken, deleteTaskAdmin)

module.exports = Router;
