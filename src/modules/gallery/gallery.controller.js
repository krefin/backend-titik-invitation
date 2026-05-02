import * as service from "./gallery.service.js";
import { success, fail } from "../../utils/response.js";
import {
  gallerySchema,
} from "./gallery.validation.js";

//
// GET ALL
//
export const getAll = async (req, res, next) => {
  try {
    const data = await service.getAll();
    return success(res, data);
  } catch (err) {
    next(err);
  }
};

//
// CREATE
//
export const create = async (req, res, next) => {
  try {
    const parsed = gallerySchema.parse({
      ...req.body,
      websiteId: Number(req.body.websiteId),
    });

    const data = await service.createGallery(parsed);

    return success(res, data, "Gallery created");
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

    await service.deleteGallery(id);

    return success(res, null, "Gallery deleted");
  } catch (err) {
    next(err);
  }
};