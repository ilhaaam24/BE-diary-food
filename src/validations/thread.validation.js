import Joi from "joi";

const getThread = {
  params: Joi.object().keys({
    threadId: Joi.number().required(),
  }),
};

const deleteThread = {
  params: Joi.object().keys({
    threadId: Joi.number().required(),
  }),
};

export default { getThread, deleteThread };
