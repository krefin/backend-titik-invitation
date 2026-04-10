import express from "express";
import * as ctrl from "./couple.controller.js";

const router = express.Router();

router.get("/", ctrl.getAll);
router.put("/:websiteId", ctrl.update);

export default router;