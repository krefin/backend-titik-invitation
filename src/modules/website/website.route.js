import express from "express";
import * as ctrl from "./website.controller.js";

const router = express.Router();

router.post("/", ctrl.create);
router.get("/", ctrl.getAll);
router.get("/:slug", ctrl.getBySlug);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

export default router;