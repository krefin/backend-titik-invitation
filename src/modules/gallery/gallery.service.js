import prisma from "../../config/prisma.js";

export const getAll = () => prisma.gallery.findMany();
export const createGallery = (data) => {
  return prisma.gallery.create({ data });
};

export const deleteGallery = (id) => {
  return prisma.gallery.delete({
    where: { id: Number(id) },
  });
};