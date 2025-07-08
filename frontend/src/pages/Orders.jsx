import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const fetchOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        let allOrderItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["orderStatus"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.PaymentMethod;
            item["date"] = order.date;
            allOrderItem.push(item);
          });
        });

        setOrderData(allOrderItem);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="pt-16 border-t">
      <div className="mb-3 text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orderData.length === 0 ? (
        <p className="text-gray-500">You have no orders.</p>
      ) : (
        <div>
          {orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6">
                <img src={item.image[0]} alt="" className="w-16 sm:w-20" />

                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>

                  <div className="flex items-center gap-5 mt-1 text-base text-gray-700">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className="mt-1">
                    Date:{" "}
                    <span className="text-gray-400">
                      {formatDate(item.date)}
                    </span>
                  </p>
                  <p className="mt-1">
                    Payment Method:{" "}
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="flex justify-between md:w-1/2">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-400"></p>
                  <p className="text-sm md:text-base">{item.orderStatus}</p>
                </div>
                <button
                  onClick={fetchOrderData}
                  className="border px-4 py-2 text-sm font-medium rounded-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
