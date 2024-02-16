const Joi = require("joi");
const Boom = require("boom");

const blogListValidation = (data) => {
  const schema = Joi.object({
    offset: Joi.number()
      .optional()
      .description("Starting position in which data will be shown"),
    limit: Joi.number().optional().description("Number of data to be shown"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().description("Person's full name"),
    email: Joi.string().required().description("Active email"),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
      .description("Should be between 8-20 characters"),
    confirmPassword: Joi.string()
      .min(8)
      .max(20)
      .required()
      .valid(Joi.ref("password"))
      .description("Should match password"),
    role: Joi.number()
      .required()
      .description("1  for admin, 2 for manager, 3 for user"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().description("Active email"),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
      .description("Should be between 8-20 characters"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

//validation Task
const createTaskAdminValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    status: Joi.string().required(),
    user_id: Joi.number().required(),
    dataToken: Joi.object().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};


const createTaskValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    status: Joi.string().required(),
    dataToken: Joi.object().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const idTaskValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const changePassValidation = (data) => {
  const schema = Joi.object({
    old_password: Joi.string().required().description("Old Password"),
    new_password: Joi.string()
      .min(8)
      .required()
      .description("Minimal 8 charachters"),
    new_confirm_password: Joi.string()
      .min(8)
      .required()
      .description("Minimal 8 charachters"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const updateMemberValidation = (data) => {
  const schema = Joi.object({
    task_id: Joi.number().required(),
    member_id: Joi.array().required(),
    dataToken: Joi.object().required(),
  });
  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  blogListValidation,
  registerValidation,
  loginValidation,
  changePassValidation,
  createTaskValidation,
  idTaskValidation,

  createTaskAdminValidation,

  updateMemberValidation,
};
