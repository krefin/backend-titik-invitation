import express from "express";
import * as ctrl from "./story.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", ctrl.getAll);
router.post("/", authMiddleware, ctrl.create);
router.put("/:id", authMiddleware, ctrl.update);
router.delete("/:id", authMiddleware, ctrl.remove);

export default router;