import prisma from "../../config/prisma.js";

export const getAll = () => {
    return prisma.couple.findMany();
}
export const updateCouple = async (websiteId, data) => {
  return prisma.couple.upsert({
    where: { websiteId: Number(websiteId) },
    update: data,
    create: {
      ...data,
      websiteId: Number(websiteId),
    },
  });
};