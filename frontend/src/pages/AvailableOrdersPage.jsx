import axios from "axios";
import { useEffect, useState } from "react";
import socket from "../socket.js";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

const AvailableOrdersPage = () => {
  const [availableOrders, setAvailableOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("agentToken");

    const agentId = JSON.parse(atob(token.split(".")[1])).agentId;

    const fetchAvailableOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/orders/availableOrders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAvailableOrders(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    fetchAvailableOrders();

    socket.on("connect", () => {
      console.log("Socket connected, joining agent room");
      socket.emit("join_agent", agentId);
    });

    socket.on("new_order", (order) => {
      setAvailableOrders((prev) => [...prev, order]);
      toast.success("New order received");
    });

    socket.on("order_removed", (orderId) => {
      setAvailableOrders((prev) =>
        prev.filter((o) => String(o._id) !== String(orderId))
      );
    });

    return () => {
      socket.off("connect");
      socket.off("new_order");
      socket.off("order_removed");
    };
  }, []);

  const acceptOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("agentToken");
      await axios.put(
        `http://localhost:8000/orders/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/agent-my-orders");
      toast.success("Order accepted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to accept order");
    }
  };

  return (
    <div>
      <h2>Available Orders (Pending)</h2>
      <Link to={"/agent-my-orders"}>My Orders</Link>
      {availableOrders.length === 0 && <p>No available orders at the moment.</p>}
      {availableOrders.map((order) => (
        <div key={order._id}>
          <p>Product: {order.productId?.productName}</p>
          <p>Quantity: {order.orderQuantity}</p>
          <p>Vendor: {order.vendorId?.name}</p>
          <p>Status: {order.status}</p>
          <button onClick={() => acceptOrder(order._id)}>Accept</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AvailableOrdersPage;
