import mongoose from "mongoose";

//creating schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
},{minimize:false});
//mongoose neglect the empty object--to avoid it we have used minimize:false to display cartdata in mngodb
const UserModel = mongoose.models.user || mongoose.model('user',userSchema);


export default UserModel;