import prisma from "../../prisma/index.js";

const getAllReseps = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const data = await prisma.resep.findMany({
    skip,
    take: parseInt(limit),
    orderBy: { tanggalUnggahan: "desc" },
    include: {
      bahanList: true,
      langkahList: {
        orderBy: {
          urutan: "asc",
        },
      },
    },
  });

  const total = await prisma.resep.count({ where: {} });
  return {
    data,
    pagination: {
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    },
  };
};

const getPendingReseps = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const data = await prisma.resep.findMany({
    where: { isApproved: "PENDING" },
    skip,
    take: parseInt(limit),
    orderBy: { tanggalUnggahan: "desc" },
    include: {
      user:{
        select: {
          id:true,
          name: true
        }
      },
      kategori:{
        select:{
          nama:true,

        }
      },
      bahanList: true,
      langkahList: {
        orderBy: {
          urutan: "asc",
        },
      },
    },
  });

  const total = await prisma.resep.count({ where: { isApproved: "PENDING" } });
  return {
    data,
    pagination: {
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    },
  };
};

const approveResep = async (id) => {
  return prisma.resep.update({
    where: { id },
    data: { isApproved: "APPROVED" },
  });
};

const rejectResep = async (id) => {
  return prisma.resep.update({
    where: { id },
    data: { isApproved: "REJECTED" },
  });
};

export default { getAllReseps, getPendingReseps, approveResep, rejectResep };
