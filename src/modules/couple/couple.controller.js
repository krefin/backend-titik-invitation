import * as service from "./couple.service.js";
import { success } from "../../utils/response.js";

export const getAll = async (req, res, next) => {
    try {
        const data = await service.getAll();
        return success(res, data);
    } catch (err) {
        next(err);
    }
}
export const update = async (req, res, next) => {
  try {
    const data = await service.updateCouple(
      req.params.websiteId,
      req.body
    );
    return success(res, data, "Couple updated");
  } catch (err) {
    next(err);
  }
};