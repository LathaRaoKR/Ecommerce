import express from 'express'
import {
  getListProducts,
  removeProduct,
  addProduct,
  getSingleProduct,
  
} from "../controllers/productController.js";
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminauth.js';



const productRouter = express.Router();
productRouter.get("/list", getListProducts);
productRouter.post(
  "/add",adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", getSingleProduct);



export default productRouter;