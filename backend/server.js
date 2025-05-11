import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import "dotenv/config";
import connectDB from "../config/mongodb.js";
import connectCloudinary from "../config/cloudinary.js";
import userRouter from "../routes/userRoute.js";
import productRouter from "../routes/productRoute.js";
import cartRouter from "../routes/cartRoute.js";
import orderRouter from "../routes/orderRoute.js";
const serverless = require("serverless-http");
const app = express();
connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

export default serverless(app);
