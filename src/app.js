import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import registerRoutes from "./endpoints/index.js";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

registerRoutes(app);

app.use(notFound);
app.use(errorHandler);
app.use("/", (req, res) => res.json({
    success: true,
    status: 200,
    message: "Welcome to Titik Invitation API",
}));

export default app;