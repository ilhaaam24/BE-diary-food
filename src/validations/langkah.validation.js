import Joi from "joi";

const createLangkah = {
  body: Joi.object().keys({
    resepId: Joi.number().required(),
    urutan: Joi.number().integer().required(),
    deskripsi: Joi.string().required(),
  }),
};

const updateLangkah = {
  params: Joi.object().keys({
    langkahId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      urutan: Joi.number().integer().optional(),
      deskripsi: Joi.string().optional(),
    })
    .min(1),
};

const deleteLangkah = {
  params: Joi.object().keys({
    langkahId: Joi.number().required(),
  }),
};

export default { createLangkah, updateLangkah, deleteLangkah };
