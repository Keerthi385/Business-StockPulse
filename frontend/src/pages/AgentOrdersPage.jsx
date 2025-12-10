import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import socket from "../socket.js";

const AgentOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("agentToken");
    const agentId = JSON.parse(atob(token.split(".")[1])).agentId;
    socket.emit("join_agent", agentId);

    socket.emit("join_agent", agentId);

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

    

    socket.on("order_status_updated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) =>
          String(o._id) === String(updatedOrder._id) ? updatedOrder : o
        )
      );
    });

    socket.on("new_order", (order) => {
    setOrders((prev) => [...prev, order]);
  });

    return () => {
      socket.off("order_status_updated");
      socket.off("new_order");
    };
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
        prev.map((o) => (String(o._id) === String(res.data._id) ? res.data : o))
      );
      toast.success("Status updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div>
      <h2>My Accepted Orders</h2>
      {orders.length === 0 && <p>You have no accepted orders.</p>}
      {orders.map((order) => (
        <div key={order._id}>
          <p>Product: {order.productId?.productName}</p>
          <p>Quantity: {order.orderQuantity}</p>
          <p>Vendor: {order.vendorId?.name}</p>
          <p>Status: {order.status}</p>

          {order.status !== "packed" && (
            <button onClick={() => updateStatus(order._id, "packed")}>
              Mark Packed
            </button>
          )}
          {order.status === "packed" && (
            <button onClick={() => updateStatus(order._id, "shipped")}>
              Mark Shipped
            </button>
          )}
          {order.status !== "delivered" && order.status === "shipped" && (
            <button onClick={() => updateStatus(order._id, "delivered")}>
              Mark Delivered
            </button>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
};

export default AgentOrdersPage;
