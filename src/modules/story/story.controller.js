import * as service from "./story.service.js";
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
    const data = await service.createStory(req.body);
    return success(res, data);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const data = await service.updateStory(req.params.id, req.body);
    return success(res, data);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.deleteStory(req.params.id);
    return success(res, null, "Deleted");
  } catch (err) {
    next(err);
  }
};