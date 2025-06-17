import prisma from "../../prisma/index.js";

export const createFeedbackData = async (userId, data) => {
  return prisma.feedback.create({
    data: {
      userId,
      fullname: data.fullname,
      email: data.email,
      subject: data.subject,
      message: data.message,
    },
  });
};

export const getFeedbacksData = async () => {
  return prisma.feedback.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          photo: true,
        },
      },
    },
    orderBy: {
      tanggalFeedback: "desc",
    },
  });
};
