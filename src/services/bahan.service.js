import prisma from "../../prisma/index.js";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";

const createBahan = async (bahan) => {
  return prisma.bahan.create({ data: bahan });
};

const getBahanById = async (bahanId) => {
  return prisma.bahan.findUnique({
    where: { id: parseInt(bahanId) },
  });
};

const updateBahanById = async (bahanId, updateBody) => {
  const bahan = await getBahanById(bahanId);
  console.log(bahan);
  if (!bahan) throw new ApiError(httpStatus.NOT_FOUND, "Bahan not found");

  return prisma.bahan.update({
    where: { id: parseInt(bahanId) },
    data: updateBody,
  });
};

const deleteBahanById = async (bahanId) => {
  const bahan = await getBahanById(bahanId);
  if (!bahan) throw new ApiError(httpStatus.NOT_FOUND, "Bahan not found");

  return prisma.bahan.delete({
    where: { id: parseInt(bahanId) },
  });
};

export default { createBahan, updateBahanById, deleteBahanById };
