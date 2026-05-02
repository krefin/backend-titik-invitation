import * as service from "./couple.service.js";
import { success, fail } from "../../utils/response.js";
import {
  coupleSchema,
  updateCoupleSchema,
} from "./couple.validation.js";

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
// UPDATE (UPSERT)
//
export const update = async (req, res, next) => {
  try {
    const websiteId = Number(req.params.websiteId);

    if (!websiteId) return fail(res, "Invalid websiteId", 400);

    const parsed = updateCoupleSchema.parse(req.body);

    const data = await service.updateCouple(websiteId, parsed);

    return success(res, data, "Couple updated");
  } catch (err) {
    next(err);
  }
};