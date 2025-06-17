import prisma from "../../prisma/index.js";

const getDashboardData = async () => {
  try {
    const totalUsers = await prisma.user.count();
    console.log("Total users:", totalUsers);

    const totalRecipes = await prisma.resep.count();
    console.log("Total recipes:", totalRecipes);

    const totalCategories = await prisma.kategori.count();
    console.log("Total categories:", totalCategories);

    const latestRecipes = await prisma.resep.findMany({
      take: 5,
      where: { isApproved: "PENDING" },
      include: {
        kategori: { select: { nama: true } },
        user: { select: { name: true } },
      },
    });
    console.log("Latest recipes:", latestRecipes);

    return {
      totalUsers,
      totalRecipes,
      totalCategories,
      latestRecipes,
    };
  } catch (error) {
    console.error("Error in getDashboardData:", error);
    throw error;
  }
};

const getAllCategoriesData = async () => {
  try {
    const categories = await prisma.kategori.findMany({
      select: {
        id: true,
        nama: true,
        _count: {
          select: {
            resep: true, // Menghitung jumlah resep yang terkait dengan kategori
          },
        },
      },
    });

    // Format ulang hasil untuk mengubah _count.resep menjadi totalRecipes
    return categories.map((category) => ({
      id: category.id,
      nama: category.nama,
      totalRecipes: category._count.resep,
    }));
  } catch (error) {
    throw error;
  }
};

//  const getPendingRecipes = async ()=>{
//   try {

//     const pendingRecipes = await 
    
//   } catch (error) {
//     throw error;
//   }
//  }

export default {
  getDashboardData,
  getAllCategoriesData,
};
