import express from "express";
import * as ctrl from "./payment.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

//
// CONSULT PAY (DANA)
//
router.post("/consult", ctrl.consultPay);

//
// CREATE ORDER (DANA)
//
router.post("/order",authMiddleware, ctrl.createOrder);

export default router;