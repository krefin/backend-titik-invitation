import DanaPkg from "dana-node";
import dotenv from "dotenv";

dotenv.config();

const Dana = DanaPkg.default || DanaPkg;

const dana = new Dana({
  partnerId: "2026030315062074542772",
  privateKey: process.env.PRIVATE_KEY || "",
  origin: process.env.ORIGIN || "",
  env: process.env.ENV || "sandbox",
});

/**
 * ✅ HELPER: FORMAT TIME GMT+7 (VALID DANA)
 */
// const generateValidUpTo = (seconds = 1800) => {
//   const date = new Date(Date.now() + seconds * 1000);

//   const jakarta = new Date(
//     date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
//   );

//   const year = jakarta.getFullYear();
//   const month = String(jakarta.getMonth() + 1).padStart(2, "0");
//   const day = String(jakarta.getDate()).padStart(2, "0");

//   const hours = String(jakarta.getHours()).padStart(2, "0");
//   const minutes = String(jakarta.getMinutes()).padStart(2, "0");
//   const secondsStr = String(jakarta.getSeconds()).padStart(2, "0");

//   return `${year}-${month}-${day}T${hours}:${minutes}:${secondsStr}+07:00`;
// };

/**
 * STEP 1: CONSULT PAY
 */
export const consultPay = async ({ amount, userId }) => {
  if (!amount) throw new Error("Amount is required");

  return dana.paymentGatewayApi.consultPay({
    merchantId: process.env.MERCHANT_ID,

    amount: {
      value: Number(amount).toFixed(2),
      currency: "IDR",
    },

    additionalInfo: {
      buyer: {
        externalUserId: userId,
      },
      envInfo: {
        sourcePlatform: "IPG",
        terminalType: "SYSTEM",
        orderTerminalType: "SYSTEM",
      },
    },

    externalStoreId: process.env.EXTERNAL_SHOP_ID,
  });
};

/**
 * STEP 2: CREATE ORDER
 */
/**
 * CREATE ORDER - VA BRI (API)
 */
/**
 * FORMAT GMT+7
 */
const generateValidUpTo = (minutes = 30) => {
  const date = new Date(Date.now() + minutes * 60000);

  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});

  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}+07:00`;
};

export const createDanaOrder = async ({
  amount,
  userId,
  referenceId,
  paymentMethod,
  bank,
}) => {
  const formattedAmount = Number(amount).toFixed(2);

  const request = {
    merchantId: process.env.MERCHANT_ID,
    partnerReferenceNo: referenceId,

    amount: {
      value: formattedAmount,
      currency: "IDR",
    },

    validUpTo: generateValidUpTo(),
    externalStoreId: process.env.EXTERNAL_SHOP_ID,

    payOptionDetails: [
      {
        payMethod: paymentMethod,
        payOption: paymentMethod === "VIRTUAL_ACCOUNT" ? bank : undefined,
        transAmount: {
          value: formattedAmount,
          currency: "IDR",
        },
      },
    ],

    urlParams: [
      {
        type: "NOTIFICATION",
        url: `${process.env.ORIGIN}/api/webhook/dana/finished`,
        isDeeplink: "N",
      },
      {
        type: "PAY_RETURN",
        url: `${process.env.ORIGIN}/payment-result`,
        isDeeplink: "N",
      },
    ],

    additionalInfo: {
      mcc: "5311",

      order: {
        orderTitle: "Satu Ekspedisi",
        scenario: "API",
        merchantTransType: "ONLINE",

        buyer: {
          externalUserType: "USER_ID",
          externalUserId: userId.toString(),
        },
      },

      envInfo: {
        sourcePlatform: "IPG",
        orderTerminalType: "SYSTEM",
        terminalType: "SYSTEM",
      },
    },
  };

  try {
    const response = await dana.paymentGatewayApi.createOrder(request);
    return response;
  } catch (error) {
    console.error("=== DANA ERROR ===");
    console.error(error.rawResponse || error.message);

    console.error("=== REQUEST ===");
    console.error(JSON.stringify(request, null, 2));

    throw error;
  }
};