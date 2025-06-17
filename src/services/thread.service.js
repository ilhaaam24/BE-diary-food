import prisma from "../../prisma/index.js";

const getThreadsByUser = async (userId) => {
  return prisma.thread.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { messages: true } },
    },
  });
};

const getThreadById = async (threadId) => {
  return prisma.thread.findUnique({
    where: { id: threadId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
};

const deleteThreadById = async (threadId) => {
  return prisma.thread.delete({
    where: { id: threadId },
  });
};

export default { getThreadsByUser, getThreadById, deleteThreadById };
