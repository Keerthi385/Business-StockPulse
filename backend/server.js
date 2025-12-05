import express from "express";
import dotenv from "dotenv";
import productsRoute from "./routes/productsRoute.js";
import authRoutes from "./routes/authRoutes.js"
import cors from "cors";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/products", productsRoute);


const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running at the PORT", PORT);
  })
}
  
);
