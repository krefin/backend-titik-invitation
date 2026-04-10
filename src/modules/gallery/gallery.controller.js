import * as service from "./gallery.service.js";
import { success } from "../../utils/response.js";

export const getAll = async (req, res, next) => {
    try {
        const data = await service.getAll();
        return success(res, data);
    } catch (err) {
        next(err);
    }
}
export const create = async (req, res, next) => {
  try {
    const data = await service.createGallery(req.body);
    return success(res, data);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.deleteGallery(req.params.id);
    return success(res, null, "Deleted");
  } catch (err) {
    next(err);
  }
};