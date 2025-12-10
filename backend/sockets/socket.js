import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_vendor", (vendorId) => {
      socket.join(`vendor_${vendorId}`);
      console.log(`Vendor joined room vendor_${vendorId}`);
    });

    socket.on("join_agent", (agentId) => {
      socket.join("agents");
      socket.join(`agent_${agentId}`);
      console.log(`Agent joined rooms: agents, agent_${agentId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
