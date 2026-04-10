import express from "express";
import * as ctrl from "./story.controller.js";

const router = express.Router();

router.get("/", ctrl.getAll);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

export default router;