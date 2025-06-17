import prisma from "../../prisma/index.js";

const createCommentData = async (userId, resepId, data) => {
  const resep = await prisma.resep.findUnique({
    where: { id: resepId },
  });
  if (!resep) {
    throw new Error("Recipe not found");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }

  return prisma.comment.create({
    data: {
      userId,
      resepId,
      comment: data.comment,
      rating: data.rating,
    },
  });
};

const getCommentsData = async (resepId) => {
  try {
    // Ensure resepId is an integer
    const parsedResepId = parseInt(resepId);
    if (isNaN(parsedResepId) || parsedResepId <= 0) {
      throw new Error("Invalid recipe ID");
    }

    // Verify recipe exists
    const resep = await prisma.resep.findUnique({
      where: { id: parsedResepId },
    });
    if (!resep) {
      throw new Error("Recipe not found");
    }

    return await prisma.comment.findMany({
      where: { resepId: parsedResepId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            photo: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Sort by creation date
      },
    });
  } catch (error) {
    console.error("Fetch comments error:", error);
    throw new Error(`Failed to fetch comments: ${error.message}`);
  }
};
export default {
  createCommentData,
  getCommentsData,
};
