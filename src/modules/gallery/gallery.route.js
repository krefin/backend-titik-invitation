import express from "express";
import * as ctrl from "./gallery.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", ctrl.getAll);
router.post("/", authMiddleware, ctrl.create);
router.delete("/:id", authMiddleware, ctrl.remove);

export default router;