import express from "express";
import { createOrder, viewVendorOrders, viewAgentOrders, acceptOrder, getAvailableOrders, updateOrderStatus } from "../controllers/ordersController.js";
import { vendorAuthMiddleware } from "../middleware/vendorAuthMiddleware.js";
import { agentAuthMiddleware } from "../middleware/agentAuthMiddleware.js";


const router = express.Router();

router.post("/",vendorAuthMiddleware,createOrder);
router.get("/vendorOrders", vendorAuthMiddleware, viewVendorOrders)
router.put("/:id", agentAuthMiddleware,acceptOrder);
router.get("/agentOrders",agentAuthMiddleware, viewAgentOrders);
router.get("/availableOrders", agentAuthMiddleware, getAvailableOrders);
router.put("/status/:id", agentAuthMiddleware, updateOrderStatus);

export default router