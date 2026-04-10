import * as service from "./event.service.js";
import { success } from "../../utils/response.js";

export const create = async (req, res, next) => {
  try {
    console.log(req.body);
    const data = await service.createEvent(req.body);
    return success(res, data, "Event created");
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const data = await service.updateEvent(req.params.id, req.body);
    return success(res, data, "Event updated");
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.deleteEvent(req.params.id);
    return success(res, null, "Event deleted");
  } catch (err) {
    next(err);
  }
};

export const getByWebsite = async (req, res, next) => {
  try {
    const data = await service.getEventsByWebsite(req.params.websiteId);
    return success(res, data);
  } catch (err) {
    next(err);
  }
};