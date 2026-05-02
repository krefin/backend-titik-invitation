import express from "express";
import * as ctrl from "./couple.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", ctrl.getAll);
router.put("/:websiteId", authMiddleware, ctrl.update);

export default router;