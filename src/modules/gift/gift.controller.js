import * as service from "./gift.service.js";
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
    const data = await service.createGift(req.body);
    return success(res, data);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const data = await service.updateGift(req.params.id, req.body);
    return success(res, data);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.deleteGift(req.params.id);
    return success(res, null, "Deleted");
  } catch (err) {
    next(err);
  }
};