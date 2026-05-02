import * as service from "./event.service.js";
import { success, fail } from "../../utils/response.js";
import {
  eventSchema,
  updateEventSchema,
} from "./event.validation.js";

//
// CREATE
//
export const create = async (req, res, next) => {
  try {
    const parsed = eventSchema.parse({
      ...req.body,
      websiteId: Number(req.body.websiteId),
    });

    const data = await service.createEvent(parsed);

    return success(res, data, "Event created");
  } catch (err) {
    next(err);
  }
};

//
// UPDATE
//
export const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!id) return fail(res, "Invalid ID", 400);

    const parsed = updateEventSchema.parse(req.body);

    const data = await service.updateEvent(id, parsed);

    return success(res, data, "Event updated");
  } catch (err) {
    next(err);
  }
};

//
// DELETE
//
export const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!id) return fail(res, "Invalid ID", 400);

    await service.deleteEvent(id);

    return success(res, null, "Event deleted");
  } catch (err) {
    next(err);
  }
};

//
// GET BY WEBSITE
//
export const getByWebsite = async (req, res, next) => {
  try {
    const websiteId = Number(req.params.websiteId);

    if (!websiteId) return fail(res, "Invalid websiteId", 400);

    const data = await service.getEventsByWebsite(websiteId);

    return success(res, data);
  } catch (err) {
    next(err);
  }
};