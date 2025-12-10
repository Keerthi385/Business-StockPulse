import Order from "../models/Order.js";
import { getIO } from "../sockets/socket.js";

export const createOrder = async (req, res) => {
  try {
    const { productId, orderQuantity } = req.body;
    const orderExists = await Order.findOne({
      productId,
      vendorId: req.vendor.vendorId,
    });
    if (orderExists) {
      return res
        .status(409)
        .json({ message: "Pending order for this product already exists!" });
    }
    const vendorId = req.vendor.vendorId;
    const order = new Order({
      productId,
      orderQuantity,
      vendorId,
      status: "pending",
    });
    let savedOrder = await order.save();

    savedOrder = await savedOrder.populate("productId", "productName");
    savedOrder = await savedOrder.populate("vendorId", "name");

    getIO().to("agents").emit("new_order", savedOrder);

    return res
      .status(201)
      .json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    console.log("Error in createOrder", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const viewVendorOrders = async (req, res) => {
  try {
    const vendorId = req.vendor.vendorId;
    const orders = await Order.find({ vendorId })
      .populate("productId", "productName")
      .populate("agentId", "agentName")
      .populate("vendorId", "name");
    return res.status(200).json(orders);
  } catch (error) {
    console.log("Error in viewVendorOrders", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const acceptOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, status: "pending" },
      { status: "accepted", agentId: req.agent.agentId },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or already accepted" });
    }

    const populated = await Order.findById(order._id)
      .populate("productId", "productName")
      .populate("vendorId", "name")
      .populate("agentId", "agentName");

    getIO().to("agents").emit("order_removed", order._id);
    getIO().to(`agent_${populated.agentId._id}`).emit("new_order", populated);
    getIO()
      .to(`vendor_${populated.vendorId._id}`)
      .emit("order_accepted", populated);

    res.status(200).json(populated);
  } catch (error) {
    console.log("Error in acceptOrder", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const viewAgentOrders = async (req, res) => {
  try {
    const orders = await Order.find({ agentId: req.agent.agentId })
      .populate("productId", "productName")
      .populate("vendorId", "name");
    return res.status(200).json(orders);
  } catch (error) {
    console.log("Error in viewAgentOrders", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, agentId: req.agent.agentId },
      { status },
      { new: true }
    );

    if (!order) return res.status(400).json({ message: "Not allowed" });

    const populated = await Order.findById(order._id)
      .populate("productId", "productName")
      .populate("vendorId", "name");

    getIO()
      .to(`vendor_${populated.vendorId._id}`)
      .emit("order_status_updated", populated);

    getIO()
      .to(`agent_${populated.agentId._id}`)
      .emit("order_status_updated", populated);

    res.json(populated);
  } catch (error) {
    console.log("Error in updateOrderStatus", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAvailableOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "pending" })
      .populate("productId", "productName")
      .populate("vendorId", "name");

    return res.status(200).json(orders);
  } catch (error) {
    console.log("Error in getAvailableOrders", error);
    res.status(500).json({ message: "Server error" });
  }
};
