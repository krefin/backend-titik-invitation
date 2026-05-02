import express from "express";
import * as ctrl from "./auth.controller.js";

const router = express.Router();

router.post("/login", ctrl.login);
router.post("/logout", ctrl.logout);
router.get("/me", ctrl.me);

export default router;