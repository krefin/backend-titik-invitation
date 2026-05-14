import * as service from "./payment.service.js";
import { success, fail } from "../../utils/response.js";
import { consultPaySchema } from "./payment.validation.js";

//
// CONSULT PAY
//
export const consultPay = async (req, res, next) => {
  try {
    const parsed = consultPaySchema.parse({
      ...req.body,
      userId: req.user?.id?.toString(),
    });

    if (!parsed.amount) {
      return fail(res, "Amount is required", 400);
    }

    const data = await service.consultPay(parsed);

    return success(res, data, "Consult Pay success");
  } catch (err) {
    next(err);
  }
};

//
// CREATE ORDER ONLY (tanpa consult)
//
export const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const {
      amount,
      paymentMethod,
      bank,
      referenceId, // bisa payment.id atau order.id
    } = req.body;

    if (!amount) throw new Error("Amount is required");

    if (paymentMethod === "VIRTUAL_ACCOUNT" && !bank) {
      throw new Error("Bank is required for VA");
    }

    const danaResponse = await service.createDanaOrder({
      amount,
      userId,
      referenceId,
      paymentMethod,
      bank,
    });

    return res.json({
      success: true,
      data: danaResponse,
    });
  } catch (err) {
    next(err);
  }
};