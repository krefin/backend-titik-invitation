import express from "express";
import * as ctrl from "./event.controller.js";

const router = express.Router();

router.post("/", ctrl.create);
router.get("/website/:websiteId", ctrl.getByWebsite);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

export default router;