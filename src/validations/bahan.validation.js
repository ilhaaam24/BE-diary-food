import Joi from "joi";

const createBahan = {
  body: Joi.object().keys({
    resepId: Joi.number().required(),
    nama: Joi.string().required(),
    jumlah: Joi.string().required(),
  }),
};

const updateBahan = {
  params: Joi.object().keys({
    bahanId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      nama: Joi.string().optional(),
      jumlah: Joi.string().optional(),
    })
    .min(1),
};

const deleteBahan = {
  params: Joi.object().keys({
    bahanId: Joi.number().required(),
  }),
};

export default { createBahan, updateBahan, deleteBahan };
