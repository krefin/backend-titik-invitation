import prisma from "../../config/prisma.js";

export const createEvent = (data) => {
  return prisma.event.create({ data });
};

export const updateEvent = (id, data) => {
  return prisma.event.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteEvent = (id) => {
  return prisma.event.delete({
    where: { id: Number(id) },
  });
};

export const getEventsByWebsite = (websiteId) => {
  return prisma.event.findMany({
    where: { websiteId: Number(websiteId) },
  });
};