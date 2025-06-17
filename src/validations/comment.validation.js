import Joi from "joi";

const createComment = {
  body: Joi.object().keys({
    comment: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
  }),
};

export default {
  createComment,
};
