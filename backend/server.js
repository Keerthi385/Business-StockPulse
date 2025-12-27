import express from "express";
import dotenv from "dotenv";
import productsRoute from "./routes/productsRoute.js";
import vendorAuthRoutes from "./routes/vendorAuthRoutes.js";
import agentAuthRoutes from "./routes/agentAuthRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import vendorAgentConnectionRoutes from "./routes/vendorAgentConnectionRoutes.js";
import cors from "cors";
import { connectDB } from "./config/db.js";
import chatbotRouter from "./chatbot.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); // add specific method to give access

app.use("/vendorAuth", vendorAuthRoutes);
app.use("/agentAuth", agentAuthRoutes);
app.use("/products", productsRoute);
app.use("/orders", orderRoutes);
app.use("/connections", vendorAgentConnectionRoutes);
app.use("/api/chatbot", chatbotRouter);

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("register", ({ userId, role }) => {
    onlineUsers.set(`${role}_${userId}`, socket.id);
    console.log("Registered:", role, userId);
  });

  socket.on("disconnect", () => {
    [...onlineUsers.entries()].forEach(([key, value]) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    });
    console.log("Socket disconnected:", socket.id);
  });
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server is running at the PORT", PORT);
  });
});

export { io, onlineUsers };
