import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { FaBoxOpen, FaShippingFast, FaClipboardList } from "react-icons/fa";

const AgentOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("agentToken");

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/orders/agentOrders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(res.data);
      } catch (err) {
        toast.error("Failed to load orders");
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("agentToken");
      const res = await axios.put(
        `http://localhost:8000/orders/status/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((o) => (String(o._id) === String(orderId) ? res.data : o))
      );

      toast.success("Status updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 p-6">
      
      {/* Header */}
      <div className="text-center mb-10">
        <FaClipboardList className="text-blue-200 text-6xl mx-auto mb-4 drop-shadow-lg" />
        <h1 className="text-5xl font-bold text-white drop-shadow-md">My Orders</h1>

        <Link
          to="/connection-requests"
          className="mt-4 inline-block text-blue-300 hover:text-white transition underline"
        >
          View Connection Requests
        </Link>
      </div>

      {/* Orders Section */}
      <div className="max-w-4xl mx-auto space-y-6">
        {orders.length === 0 && (
          <p className="text-center text-blue-200 text-lg">
            You have no accepted orders.
          </p>
        )}

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white/90 shadow-xl rounded-2xl p-6 border border-gray-200 hover:shadow-blue-500/30 transition"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4 mb-4">
              <FaBoxOpen className="text-blue-600 text-3xl" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {order.productId?.productName}
                </h2>
                <p className="text-gray-600">
                  Vendor: <span className="font-semibold">{order.vendorId?.vendorName}</span>
                </p>
                <p className="text-gray-700">
                  Quantity: <span className="font-semibold">{order.orderQuantity}</span>
                </p>
              </div>
            </div>

            {/* Status Buttons */}
            <div className="mt-4">
              {order.status === "Pending" && (
                <button
                  onClick={() => updateStatus(order._id, "placed")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-xl shadow-lg transition"
                >
                  Accept Order
                </button>
              )}

              {order.status === "placed" && (
                <button
                  onClick={() => updateStatus(order._id, "packed")}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold p-3 rounded-xl shadow-lg transition"
                >
                  Mark as Packed
                </button>
              )}

              {order.status === "packed" && (
                <button
                  onClick={() => updateStatus(order._id, "shipped")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-xl shadow-lg transition"
                >
                  Mark as Shipped
                </button>
              )}

              {order.status === "shipped" && (
                <button
                  onClick={() => updateStatus(order._id, "delivered")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-xl shadow-lg transition"
                >
                  Mark as Delivered
                </button>
              )}

              {order.status === "delivered" && (
                <p className="text-green-600 font-bold text-center mt-3">
                  ✓ Delivered
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentOrdersPage;
