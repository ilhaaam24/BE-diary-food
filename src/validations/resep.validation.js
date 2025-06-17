import Joi from "joi";

const uploadPhoto = Joi.object({
  mimetype: Joi.string()
    .valid("image/jpeg", "image/png", "image/webp")
    .messages({
      "any.only": "File harus berupa gambar (jpeg, png, webp)",
    }),
  size: Joi.number()
    .max(5 * 1024 * 1024)
    .messages({
      "number.max": "Ukuran file maksimal 5MB",
    }),
});

const updateResepPhoto = {
  params: Joi.object({
    resepId: Joi.number().integer().positive().required(),
  }),
  file: uploadPhoto,
};

const saveResep = {
  params: Joi.object({
    resepId: Joi.number().integer().positive().required(),
  }),
};

const unsaveResep = {
  params: Joi.object({
    resepId: Joi.number().integer().positive().required(),
  }),
};

const bahanSchema = Joi.object({
  nama: Joi.string().required(),
  jumlah: Joi.string().required(),
});

const langkahPembuatanSchema = Joi.object({
  urutan: Joi.number().integer().min(1).required(),
  deskripsi: Joi.string().required(),
});

const createResep = {
  body: Joi.object({
    nama: Joi.string().required(),
    photoResep: Joi.string().optional(),
    preparationTime: Joi.string().required(),
    cookingTime: Joi.string().required(),
    servingTime: Joi.string().required(),
    description: Joi.string().required(),
    note: Joi.string().optional(),
    rating: Joi.number().optional(),
    kategoriId: Joi.number().integer().positive().required(),
    userId: Joi.number().integer().positive().required(),
    bahan: Joi.array().items(bahanSchema).min(1).required(),
    langkahPembuatan: Joi.array()
      .items(langkahPembuatanSchema)
      .min(1)
      .required(),
  }).min(1),
};

const updateResep = {
  params: Joi.object({
    resepId: Joi.number().integer().positive().required(),
  }),
  body: Joi.object({
    nama: Joi.string().optional(),
    photoResep: Joi.string().optional(),
    preparationTime: Joi.string().required(),
    cookingTime: Joi.string().required(),
    servingTime: Joi.string().required(),
    description: Joi.string().required(),
    note: Joi.string().optional(),
    rating: Joi.number().optional(),
    kategoriId: Joi.number().integer().positive().optional(),
    userId: Joi.number().integer().positive().optional(),
    isApproved: Joi.string()
      .valid("APPROVED", "REJECTED", "PENDING")
      .default("PENDING"),
    bahan: Joi.array().items(bahanSchema).optional(),
    langkahPembuatan: Joi.array().items(langkahPembuatanSchema).optional(),
  }).min(1),
};

const getResep = {
  params: Joi.object({
    resepId: Joi.number().integer().positive().required(),
  }),
};

const deleteResep = {
  params: Joi.object({
    resepId: Joi.number().integer().positive().required(),
  }),
};

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  kategoriId: Joi.number().integer().positive().optional(),
  userId: Joi.number().integer().positive().optional(),
  isApproved: Joi.string()
    .valid("APPROVED", "REJECTED", "PENDING")
    .default("PENDING"),
});

export default {
  uploadPhoto,
  updateResepPhoto,
  saveResep,
  unsaveResep,
  createResep,
  getResep,
  updateResep,
  deleteResep,
  querySchema,
};
