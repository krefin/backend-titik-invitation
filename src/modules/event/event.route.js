import express from "express";
import * as ctrl from "./event.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddleware, ctrl.create);
router.get("/website/:websiteId", ctrl.getByWebsite);
router.put("/:id", authMiddleware, ctrl.update);
router.delete("/:id", authMiddleware, ctrl.remove);

export default router;