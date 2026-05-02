import * as service from "./gift.service.js";
import { success, fail } from "../../utils/response.js";
import {
  giftSchema,
  updateGiftSchema,
} from "./gift.validation.js";

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
    const parsed = giftSchema.parse({
      ...req.body,
      websiteId: Number(req.body.websiteId),
    });

    const data = await service.createGift(parsed);

    return success(res, data, "Gift created");
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

    const parsed = updateGiftSchema.parse(req.body);

    const data = await service.updateGift(id, parsed);

    return success(res, data, "Gift updated");
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

    await service.deleteGift(id);

    return success(res, null, "Gift deleted");
  } catch (err) {
    next(err);
  }
};