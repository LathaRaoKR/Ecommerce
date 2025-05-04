import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useSearchParams } from "react-router-dom";



const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyStripePayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    verifyStripePayment();
  }, [token]);
  return (
    <div>
      <p className="text-gray-500">Verifying payment...</p>
    </div>
  );
};

export default Verify;