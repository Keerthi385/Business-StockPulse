import express from "express";
import dotenv from "dotenv";
import productsRoute from "./routes/productsRoute.js";
import vendorAuthRoutes from "./routes/vendorAuthRoutes.js"
import agentAuthRoutes from "./routes/agentAuthRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import vendorAgentConnectionRoutes from "./routes/vendorAgentConnectionRoutes.js"
import cors from "cors";
import http from "http";
import { initSocket } from "./sockets/socket.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors()); // add specific method to give access

app.use("/vendorAuth", vendorAuthRoutes);
app.use("/agentAuth", agentAuthRoutes);
app.use("/products", productsRoute);
app.use("/orders", orderRoutes);
app.use("/connections", vendorAgentConnectionRoutes);



const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

initSocket(server);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server is running at the PORT", PORT);
  })
}  
);
