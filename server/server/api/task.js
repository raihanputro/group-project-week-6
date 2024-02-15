const Router = require("express").Router();

const taskHelper = require("../helpers/taskHelper");

const GeneralHelper = require("../helpers/generalHelper");

const ValidationTask = require("../helpers/validationHelper");

const Middleware = require("../middlewares/authMiddleware");

const fileName = "server/api/task.js";

//admin-start
const listTaskAdmin = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    const response = await taskHelper.getListTaskAdminHelper(dataToken);
    return res.send({
      message: "Task data received successfully",
      response,
    });
  } catch (err) {
    console.log([fileName, "listTask", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const detailListAdmin = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    ValidationTask.idTaskValidation(req.params);
    const { id } = req.params;
    const response = await taskHelper.getTaskDetailAdminHelper(id, dataToken);
    return res.send({
      message: "Task detail data received successfully",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "detailListAdmin", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const createTaskAdmin = async (req, res) => {
  try {
    const dataToken = req.body.dataToken; // Assuming dataToken contains user information
    ValidationTask.createTaskAdminValidation(req.body);
    const { name, description, start_date, end_date, status, user_id } =
      req.body;
    const response = await taskHelper.createTaskAdminHelper(
      { name, description, start_date, end_date, status, user_id },
      dataToken
    );
    return res.send(response);
  } catch (err) {
    console.log([fileName, "createTaskAdmin", "ERROR"], { info: `${err}` });
    return res.status(500).send(GeneralHelper.errorResponse(err));
  }
};

const updateTaskAdmin = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    ValidationTask.idTaskValidation(req.params);
    const { id } = req.params;
    const { name, description, start_date, end_date, status, user_id } =
      req.body;
    const response = await taskHelper.updateTaskAdminHelper(
      id,
      name,
      description,
      start_date,
      end_date,
      status,
      user_id,
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

const restoreTaskAdmin = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    ValidationTask.idTaskValidation(req.params);
    const { id } = req.params;
    const response = await taskHelper.restoreTaskAdminHelper(id, dataToken);
    return res.status(200).send({
      message: "Task data successfully restored",
      response,
    });
  } catch (err) {
    console.log([fileName, "restoreTaskAdmin", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const deleteTaskAdmin = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    ValidationTask.idTaskValidation(req.params);
    const { id } = req.params;
    const response = await taskHelper.deleteTaskAdminHelper(id, dataToken);
    return res.status(200).send({
      message: "Task data successfully deleted",
      response,
    });
  } catch (err) {
    console.log([fileName, "deleteTaskAdmin", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};
//admin-end

//manager-start
const listTaskManager = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    const response = await taskHelper.getListTaskManagerHelper(dataToken);
    return res.send({
      message: "Task data received successfully",
      response,
    });
  } catch (err) {
    console.log([fileName, "listTask", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const createTaskManager = async (req, res) => {
  try {
    const dataToken = req.body.dataToken; // Assuming dataToken contains user information
    ValidationTask.createTaskValidation(req.body);
    const { name, description, start_date, end_date, status } = req.body;
    const response = await taskHelper.createTaskManagerHelper(
      { name, description, start_date, end_date, status },
      dataToken
    );
    return res.send(response);
  } catch (err) {
    console.log([fileName, "createTask", "ERROR"], { info: `${err}` });
    return res.status(500).send(GeneralHelper.errorResponse(err));
  }
};

const detailListManager = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    ValidationTask.idTaskValidation(req.params);
    const { id } = req.params;
    const response = await taskHelper.getTaskDetailManagerHelper(id, dataToken);
    return res.send({
      message: "Task detail data received successfully",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "detailList", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const updateTaskManager = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    ValidationTask.idTaskValidation(req.params);
    const { id } = req.params;
    const { name, description, start_date, end_date, status } = req.body;
    const response = await taskHelper.updateTaskManagerHelper(
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

const deleteTaskManager = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    ValidationTask.idTaskValidation(req.params);
    const { id } = req.params;
    const response = await taskHelper.deleteTaskManagerHelper(id, dataToken);
    return res.status(200).send({
      message: "Task data successfully deleted",
      response,
    });
  } catch (err) {
    console.log([fileName, "deleteTaskManager", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};
//manager-end

//member-start
const listTaskMember = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    const response = await taskHelper.getListTaskMemberHelper(dataToken);
    return res.send({
      message: "Task data received successfully",
      response,
    });
  } catch (err) {
    console.log([fileName, "listTask", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const detailTaskMember = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    ValidationTask.idTaskValidation(req.params);
    const { id } = req.params;
    const response = await taskHelper.getDetailTaskMemberHelper(id, dataToken);
    return res.send({
      message: "Task detail data received successfully",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "detailList", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};
// member-end

//admin-route-start
Router.get("/admin/list", Middleware.validateToken, listTaskAdmin);
Router.get("/admin/detail/:id", Middleware.validateToken, detailListAdmin);
Router.post("/admin/create", Middleware.validateToken, createTaskAdmin);
Router.put("/admin/update/:id", Middleware.validateToken, updateTaskAdmin);
Router.post("/admin/restore/:id", Middleware.validateToken, restoreTaskAdmin);
Router.delete(
  "/admin/delete/:id",
  Middleware.validateToken,
  deleteTaskAdmin
);
//admin-route-end

//manager-route-start
Router.get("/manager/list", Middleware.validateToken, listTaskManager);
Router.post("/manager/create", Middleware.validateToken, createTaskManager);
Router.get("/manager/detail/:id", Middleware.validateToken, detailListManager);
Router.put("/manager/update/:id", Middleware.validateToken, updateTaskManager);
Router.delete(
  "/manager/delete/:id",
  Middleware.validateToken,
  deleteTaskManager
);
//manager-route-end

//member-route-start
Router.get("/member/list", Middleware.validateToken, listTaskMember);
Router.get("/member/detail/:id", Middleware.validateToken, detailTaskMember);
//member-route-end

module.exports = Router;
