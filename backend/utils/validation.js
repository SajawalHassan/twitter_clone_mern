const Joi = require("@hapi/joi");

module.exports.registerValidation = (data) => {
  const schema = Joi.object({
    displayname: Joi.string().required().min(3).max(255),
    username: Joi.string().required().min(3).max(255),
    email: Joi.string().required().min(3).max(255).email(),
    password: Joi.string().required().min(8).max(1024),
    month: Joi.number().required(),
    day: Joi.number().required(),
    year: Joi.number().min(1902).max(2022).required(),
  });

  return schema.validate(data);
};

module.exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().min(3).max(255),
    password: Joi.string().required().min(8).max(1024),
  });

  return schema.validate(data);
};

module.exports.userEditValidation = (data) => {
  const schema = Joi.object({
    displayname: Joi.string().min(3).max(255),
    username: Joi.string().min(3).max(255),
    email: Joi.string().min(3).max(255).email(),
    password: Joi.string().min(8).max(1024),
    month: Joi.number(),
    day: Joi.number(),
    year: Joi.number().min(1902).max(2022),
  });

  return schema.validate(data);
};

module.exports.postsValidation = (data) => {
  const schema = Joi.object({
    textfield: Joi.string().max(280).allow(""),
    image: Joi.string().allow(""),
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

module.exports.repliesValidation = (data) => {
  const schema = Joi.object({
    content: Joi.string().required().min(1),
    postId: Joi.string().required().min(1),
  });

  return schema.validate(data);
};

module.exports.repliesEditValidation = (data) => {
  const schema = Joi.object({
    content: Joi.string().required().min(1),
  });

  return schema.validate(data);
};
