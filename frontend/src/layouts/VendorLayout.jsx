import { Outlet } from "react-router";
import { VendorProvider, useVendor } from "../context/VendorContext";
import { useEffect } from "react";
import { socket } from "../socket";
import toast from "react-hot-toast";

const VendorSocketHandler = () => {
  const { setOrders, setConnections } = useVendor();

  useEffect(() => {
    const token = localStorage.getItem("vendorToken");
    if (!token) return;

    const vendorId = JSON.parse(atob(token.split(".")[1])).vendorId;

    socket.emit("register", {
      userId: vendorId,
      role: "vendor",
    });

    socket.on("orderStatus", ({message, data}) => {
      console.log("Order status updated")
      setOrders((prev) =>
        prev.map((o) =>
          o._id === data._id ? data : o
        )
      );
      toast.success(message);
    });

    socket.on("connectionStatus", ({message, data}) => {
      setConnections((prev) =>
        prev.map((c) =>
          c._id === data._id ? data : c
        )
      );
      toast.success(message);
    });

    return () => {
      socket.off("newOrder");
      socket.off("orderStatus");
      socket.off("connectionStatus");
    };
  }, []);

  return null;
};

const VendorLayout = () => {
  return (
    <VendorProvider>
      <VendorSocketHandler /> 
      <Outlet />
    </VendorProvider>
  );
};

export default VendorLayout;
