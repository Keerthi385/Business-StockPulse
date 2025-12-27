import { Outlet } from "react-router";
import { useEffect } from "react";
import { socket } from "../socket";
import toast from "react-hot-toast";
import { AgentProvider, useAgent } from "../context/AgentContext";

const AgentSocketHandler = () => {
  const { setOrders, setConnections } = useAgent();

  useEffect(() => {
    const token = localStorage.getItem("agentToken");
    if (!token) return;

    const agentId = JSON.parse(atob(token.split(".")[1])).agentId;

    // register socket
    socket.emit("register", {
      userId: agentId,
      role: "agent",
    });

    // 🔔 new connection request
    socket.on("connectionRequest", ({ message, data }) => {
      setConnections((prev) => [data, ...prev]);
      toast.success(message);
    });

    // 📦 new order
    socket.on("newOrder", ({ message, data }) => {
      setOrders((prev) => [data, ...prev]);
      toast.success(message);
    });
    
    socket.on("orderCancel",({message, data}) => {
      setOrders((prev) => 
        prev.filter((o) => o._id != data._id)
      )
      toast.success(message);
    })

    return () => {
      socket.off("connectionRequest");
      socket.off("newOrder");
    };
  }, [setOrders, setConnections]);

  return null;
};

const AgentLayout = () => {
  return (
    <AgentProvider>
      <AgentSocketHandler />
      <Outlet />
    </AgentProvider>
  );
};

export default AgentLayout;
