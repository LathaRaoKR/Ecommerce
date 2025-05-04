import mongoose from "mongoose";

//creating schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: false },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean },
  date: { type: Number, required: true },
});
//using schema ,we are creating a model
const ProductModel =mongoose.models.product || mongoose.model("product",productSchema);
//the above thing creates  a model if not present and updates if not present
export default ProductModel