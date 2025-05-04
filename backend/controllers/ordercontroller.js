//Placing orders using COD method

import orderModel  from "../models/orderModel.js";
import userModel from "../models/userModel.js";
//global variables
const currency = 'inr'
const deliveryCharge = 10
//gateway intialise
import Stripe from 'stripe'
import Razorpay from "razorpay";





const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


const placeOrder = async (req,res) =>{
    try{
        const {userId,items,amount,address} = req.body;
        const orderData = {
            userId,items,amount,PaymentMethod:"COD",address,
            payment:false,
            date:Date.now()
        }
const newOrder = new orderModel(orderData)

await newOrder.save()
await userModel.findByIdAndUpdate(userId,{cartData:{}});

res.json({success:true,message:"Order placed"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }

}
//Placing orders using stripe method
export const placeOrderStripe = async (req, res) => {
try{
  const { userId, items, amount, address } = req.body;
  const {origin} = req.headers;
  const orderData = {
    userId,
    items,
    amount,
    PaymentMethod: "Stripe",
    address,
    payment: false,
    date: Date.now(),
  };
  const newOrder = new orderModel(orderData);

  await newOrder.save();
  const line_items = items.map((item)=>(
    {
        price_data:{
            currency:currency,
            product_data:{
                name:item.name
            },
            unit_amount : item.price *100
        },
        quantity:item.quantity
    }
  ))
  line_items.push(
    {
        price_data:{
            currency:currency,
            product_data:{
                name:'Delivery Charges'
            },
            unit_amount : deliveryCharge *100
        },
        quantity:1
    

    }
  )
  const session = await stripe.checkout.sessions.create({
    success_url: `${origin}/verify ? success=true&orderId=${newOrder._id}`,
    cancel_url: `${origin}/verify ? success=false&orderId=${newOrder._id}`,
    line_items,
    mode:'payment',

  });
  res.json({success:true,session_url:session.url});
}catch(error){
      console.log(error);
      res.json({ success: false, message: error.message });
}
};

//verify stripe

const verifyStripe = async (req,res)=>{
    const {orderId,success,userId} = req.body
    try{
if(success === 'true'){
    await orderModel.findByIdAndUpdate(orderId,{payment:true});
    await userModel.findByIdAndUpdate(userId,{cartData:{}});
    res.json({success:true});
}else{
    await orderModel.findByIdAndUpdate(orderId);
    res.json({success:false})
}
    }catch(error){
console.log(error);
res.json({ success: false, message: error.message });
    }
}


//Placing orders using Razorpay method
export const placeOrderRazorpay = async (req, res) => {




};


const verifyRazorpay = async (req,res)=>{
    try{
const {userId,razorpay_order_id} = req.body
const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
   if(orderInfo.status === 'paid'){
    await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
    await userModel.findByIdAndUpdate(userId,{cardData:{}})
   res.json({success:true,message:"payment successful"})

}else{
    res.json({success:false,message:"payment failed"})
}

}catch(error){
    console.log(error);
res.json({ success: false, message: error.message });

    }
}
//all orders data for admin panel
const allOrders = async (req, res) => {
try{
   const orders = await orderModel.find({})
   res.json({success:true,orders})
}catch(error){
 console.log(error);
 res.json({ success: false, message: error.message });
}


};

//user orders data for frontend
const userOrders = async (req, res) => {
    try{
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})

    }catch(error){
console.log(error);
res.json({ success: false, message: error.message });
    }


};

//update order Status from admin panel
const updateStatus = async (req, res) => {

    try{
const {orderId,status} = req.body
await orderModel.findByIdAndUpdate(orderId,{status})
response.json({success:true,message:'status updated'})
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });

    }

};
export {verifyStripe,placeOrder,allOrders,userOrders,updateStatus,verifyRazorpay}