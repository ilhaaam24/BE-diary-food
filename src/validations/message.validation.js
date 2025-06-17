import Joi from "joi";

const createMessage = {
  params: Joi.object().keys({
    threadId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
};

const createFirstMessage = {
  body: Joi.object({
    content: Joi.string().required(),
  }),
};

const getMessages = {
  params: Joi.object().keys({
    threadId: Joi.number().required(),
  }),
};

export default { createMessage, createFirstMessage, getMessages };
