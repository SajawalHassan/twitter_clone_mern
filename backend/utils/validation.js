const Joi = require("@hapi/joi");

module.exports.registerValidation = (data) => {
  const schema = Joi.object({
    displayName: Joi.string().required().min(3).max(255),
    username: Joi.string().required().min(3).max(255),
    email: Joi.string().required().min(3).max(255).email(),
    password: Joi.string().required().min(8).max(1024),
  });

  return schema.validate(data);
};

module.exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().min(3).max(255).email(),
    password: Joi.string().required().min(8).max(1024),
  });

  return schema.validate(data);
};

module.exports.userEditValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255),
    email: Joi.string().min(3).max(255).email(),
    password: Joi.string().min(8).max(1024),
  });

  return schema.validate(data);
};

module.exports.postsValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().default("").max(280),
    picture: Joi.string().default(""),
  });

  return schema.validate(data);
};

module.exports.listsValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().max(280),
    description: Joi.string().default(""),
    members: Joi.array().required(),
  });

  return schema.validate(data);
};

module.exports.listsEditValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().max(280),
    description: Joi.string().default(""),
    members: Joi.array(),
  });

  return schema.validate(data);
};
