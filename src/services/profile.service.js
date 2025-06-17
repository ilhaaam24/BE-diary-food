import prisma from "../../prisma/index.js";

const getProfile = async (userId) => {
  try {
    console.log("getProfile called with userId:", userId); // Debug log
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
  } catch (error) {
    console.error("getProfile error:", error); // Debug log
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message || "Failed to retrieve profile data");
  }
};

const getUserRecipes = async (userId) => {
  try {
    const recipes = await prisma.resep.findMany({
      where: { userId },
      select: {
        id: true,
        nama: true,
        photoResep: true,
        user: true,
        kategori: true,
        isApproved: true,
      },
    });
    return recipes;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch user recipes");
  }
};


export default { getProfile, getUserRecipes };
