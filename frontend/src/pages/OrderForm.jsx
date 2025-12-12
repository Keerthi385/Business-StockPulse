import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { FaShoppingCart } from "react-icons/fa";

const OrderForm = () => {
  const { productId, productName } = useParams();

  const [orderDetails, setOrderDetails] = useState({
    productId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("vendorToken");
      const res = await axios.post("http://localhost:8000/orders", orderDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order placed successfully!");
    } catch (error) {
      console.log("Error in orderplace fun");
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-900 via-purple-600 to-purple-900 p-6">

      {/* Header */}
      <div className="text-center mb-10">
        <FaShoppingCart className="text-white text-6xl mx-auto mb-3" />
        <h1 className="text-4xl font-bold text-white">Place Order</h1>
        <p className="text-white/80 mt-2">Order stock for your selected product</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

        <form className="space-y-5">
          {/* Product ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product ID
            </label>
            <input
              value={productId}
              disabled
              name="productId"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Name
            </label>
            <input
              value={productName}
              disabled
              name="productName"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Order Quantity */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Order Quantity
            </label>
            <input
              type="number"
              value={10}
              name="orderQuantity"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Agent ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Agent ID
            </label>
            <input
              type="text"
              placeholder="Enter agent ID"
              name="agentID"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-xl transition duration-300 shadow-lg hover:shadow-purple-400/40"
          >
            Place Order
          </button>
        </form>

      </div>

    </div>
  );
};

export default OrderForm;
