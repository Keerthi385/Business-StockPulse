import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import socket from "../socket.js";

const VendorOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("vendorToken");
    const vendorId = JSON.parse(atob(token.split(".")[1])).vendorId;
    socket.emit("join_vendor", vendorId);
    
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

    socket.on("order_accepted", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    });

    socket.on("order_status_updated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    });

    return () => {
      socket.off("order_accepted");
      socket.off("order_status_updated");
    };  
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <div>
          <p>Product: {order.productId?.productName}</p>
          <p>Quantity: {order.orderQuantity}</p>
          <p>Status: {order.status}</p>
          {order.agentId && <p>Accepted By: {order.agentId?.agentName}</p>}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default VendorOrdersPage;
