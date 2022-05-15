const Joi = require("@hapi/joi");

module.exports.registerValidation = (data) => {
  const schema = Joi.object({
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
