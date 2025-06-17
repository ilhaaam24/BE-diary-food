import Joi from "joi";

const createKategori = {
  body: Joi.object().keys({
    nama: Joi.string().required(),
    parentId: Joi.number().integer().allow(null).optional(),
  }),
};

const getKategori = {
  params: Joi.object().keys({
    kategoriId: Joi.number().integer().required(),
  }),
};

const updateKategori = {
  params: Joi.object().keys({
    kategoriId: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      nama: Joi.string().required(),
    })
    .min(1),
};

const deleteKategori = {
  params: Joi.object().keys({
    kategoriId: Joi.number().integer().required(),
  }),
};

export default { createKategori, updateKategori, deleteKategori, getKategori };
