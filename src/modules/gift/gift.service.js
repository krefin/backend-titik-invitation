import prisma from "../../config/prisma.js";

export const getAll = () => {
    return prisma.gift.findMany();
}
export const createGift = (data) => {
  return prisma.gift.create({ data });
};

export const updateGift = (id, data) => {
  return prisma.gift.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteGift = (id) => {
  return prisma.gift.delete({
    where: { id: Number(id) },
  });
};