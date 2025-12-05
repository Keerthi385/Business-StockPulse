import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productsController.js";

const router = express.Router();

router.get("/",authMiddleware, getAllProducts);
router.post("/",authMiddleware, createProduct);
router.put("/:id",authMiddleware, updateProduct);
router.delete("/:id",authMiddleware, deleteProduct);

export default router;