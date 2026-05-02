import * as service from "./story.service.js";
import { success, fail } from "../../utils/response.js";
import {
  storySchema,
  updateStorySchema,
} from "./story.validation.js";

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
    const parsed = storySchema.parse({
      ...req.body,
      websiteId: Number(req.body.websiteId),
    });

    const data = await service.createStory(parsed);

    return success(res, data, "Story created");
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

    const parsed = updateStorySchema.parse(req.body);

    const data = await service.updateStory(id, parsed);

    return success(res, data, "Story updated");
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

    await service.deleteStory(id);

    return success(res, null, "Story deleted");
  } catch (err) {
    next(err);
  }
};