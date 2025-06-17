import Joi from "joi";

const createFeedbackValidation = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});

export default {
  createFeedbackValidation,
};
