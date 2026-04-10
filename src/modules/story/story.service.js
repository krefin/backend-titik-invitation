import prisma from "../../config/prisma.js";

export const getAll = () => {
    return prisma.story.findMany();
}
export const createStory = (data) => {
  return prisma.story.create({ data });
};

export const updateStory = (id, data) => {
  return prisma.story.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteStory = (id) => {
  return prisma.story.delete({
    where: { id: Number(id) },
  });
};