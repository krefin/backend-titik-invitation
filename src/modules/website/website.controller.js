import * as service from "./website.service.js";
import { success, fail } from "../../utils/response.js";
import { createSchema, updateSchema } from "./website.validation.js";

export const create = async (req, res, next) => {
  try {
    const body = createSchema.parse(req.body);
    const data = await service.createWebsite(body);
    return success(res, data, "Created");
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await service.getAll({ page, limit });

    return success(res, result);
  } catch (err) {
    next(err);
  }
};

export const getBySlug = async (req, res, next) => {
  try {
    const data = await service.getBySlug(req.params.slug);
    if (!data) return fail(res, "Not found", 404);
    return success(res, data);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const body = updateSchema.parse(req.body);
    const data = await service.updateWebsite(req.params.id, body);
    return success(res, data, "Updated");
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.deleteWebsite(req.params.id);
    return success(res, null, "Deleted");
  } catch (err) {
    next(err);
  }
};