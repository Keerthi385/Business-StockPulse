import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useVendor } from "../context/VendorContext";

const VendorOrdersPage = () => {
  const { orders, setOrders } = useVendor();

  useEffect(() => {
    const token = localStorage.getItem("vendorToken");
    const vendorId = JSON.parse(atob(token.split(".")[1])).vendorId;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/orders/vendorOrders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data);
        toast.success("Orders loaded!");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load orders");
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (id) => {
    try {
      const token = localStorage.getItem("vendorToken");
      const res = await axios.delete(`http://localhost:8000/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        toast.success("Order cancelled successfully!");
        setOrders(orders.filter((order) => order._id !== id));
      }
    } catch (error) {
      console.log("Failed to cancel order", error);
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-purple-900 p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Vendor Orders
      </h1>

      {/* Orders List */}
      <div className="max-w-4xl mx-auto space-y-6">
        {orders.length === 0 && (
          <p className="text-center text-white text-lg">No orders available.</p>
        )}

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white/90 rounded-2xl shadow-lg p-6 text-purple-900 hover:shadow-xl transition"
          >
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Product:</span>{" "}
                {order.productId?.productName}
              </p>

              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                {order.orderQuantity}
              </p>

              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`font-bold ${
                    order.status === "pending"
                      ? "text-yellow-600"
                      : order.status === "delivered"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {order.status}
                </span>
              </p>

              <p>
                <span className="font-semibold">Agent ID:</span> {order.agentID}
              </p>

              <p>
                <span className="font-semibold">Agent Name:</span>{" "}
                {order.agentName}
              </p>
            </div>

            {/* Cancel Button */}
            {order.status != "delivered" && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition"
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorOrdersPage;
