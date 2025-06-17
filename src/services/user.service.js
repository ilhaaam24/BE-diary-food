import httpStatus from "http-status";
import prisma from "../../prisma/index.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import removePassword from "../utils/sanitizeUser.js";
import uploadFile from "../utils/uploadFile.js";

const uploadPhoto = async (file) => {
  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "File tidak ditemukan");
  }

  const photoUrl = await uploadFile(file, "photo-user");
  return photoUrl;
};

const updateUserPhoto = async (userId, file) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User tidak ditemukan");
  }

  const photoUrl = await uploadFile(file, "photo-user", user.photo);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { photo: photoUrl },
  });

  return updatedUser;
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const hashedPassword = bcrypt.hashSync(userBody.password, 8);

  const newUser = await prisma.user.create({
    data: {
      ...userBody,
      password: hashedPassword,
    },
  });

  return removePassword(newUser);
};

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const page = parseInt(options.page || 1);
  const limit = parseInt(options.limit || 10);
  const skip = (page - 1) * limit;

  const users = await prisma.user.findMany({
    skip,
    take: limit,
    where: filter,
  });

  const totalItems = await prisma.user.count({ where: filter });
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = page;

  const pagination = {
    totalItems,
    totalPages,
    currentPage,
  };

  const sanitizedUsers = users.map(removePassword);

  return { users: sanitizedUsers, pagination };
};

const getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return removePassword(user);
};

/**
 * Get user by email
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return removePassword(user);
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateBody,
  });

  return removePassword(updateUser);
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const deleteUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return deleteUser;
};

const getCurrentUserData = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      photo: true,
    },
  });

  return user;
};

export default {
  uploadPhoto,
  updateUserPhoto,
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getCurrentUserData,
};
