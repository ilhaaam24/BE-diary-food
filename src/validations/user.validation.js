import Joi from "joi";
import { password } from "./custom.validation.js";

const uploadPhoto = Joi.object({
  mimetype: Joi.string().valid("image/jpeg", "image/png", "image/webp").messages({
    "any.only": "File harus berupa gambar (jpeg, png, webp)",
  }),
  size: Joi.number()
    .max(5 * 1024 * 1024) // 5MB
    .messages({
      "number.max": "Ukuran file maksimal 5MB",
    })
    .required(),
});

const updateUserPhoto = {
  params: Joi.object({
    userId: Joi.number().integer().required(),
  }),
  file: uploadPhoto,
};

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().custom(password).required(),
    role: Joi.string().valid("user", "admin").default("user"),
    photo: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
  }),
};

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
});

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const getUserByEmail = {
  query: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
      role: Joi.string().valid("user", "admin").optional(),
      photo: Joi.string().optional(),
      phoneNumber: Joi.string().trim().allow("", null).optional(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const loginUser = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

// const updatePassword = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId).required(),
//   }),
//   body: Joi.object().keys({
//     oldPassword: Joi.string().required(),
//     newPassword: Joi.string().custom(password).required(),
//   }),
// };

export default {
  uploadPhoto,
  updateUserPhoto,
  createUser,
  querySchema,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  loginUser,
  // updatePassword,
};
