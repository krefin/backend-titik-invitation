import express from "express";
import * as ctrl from "./gallery.controller.js";

const router = express.Router();

router.get("/", ctrl.getAll);
router.post("/", ctrl.create);
router.delete("/:id", ctrl.remove);

export default router;