import prisma from "../../config/prisma.js";

export const createWebsite = async (data) => {
  return prisma.website.create({
    data: {
      slug: data.slug,
      title: data.title,
      template: data.template,

      couple: { create: data.couple },
      events: { create: data.events },
      galleries: { create: data.galleries },
      stories: { create: data.stories },
      gifts: { create: data.gifts },
    },
    include: {
      couple: true,
      events: true,
      galleries: true,
      stories: true,
      gifts: true,
    },
  });
};

export const getAll = () =>
  prisma.website.findMany({ orderBy: { createdAt: "desc" } });

export const getBySlug = (slug) =>
  prisma.website.findUnique({
    where: { slug },
    include: {
      couple: true,
      events: true,
      galleries: true,
      stories: true,
      gifts: true,
    },
  });

export const updateWebsite = async (id, data) => {
  return prisma.website.update({
    where: { id: Number(id) },
    data: {
      title: data.title,
      template: data.template,
      isActive: data.isActive,
    },
  });
};

export const deleteWebsite = (id) =>
  prisma.website.delete({ where: { id: Number(id) } });