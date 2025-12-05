import express from "express";
import { login, signup } from "../controllers/authController.js";
import { loginValidation, signupValidation } from "../middleware/authValidation.js";

const router = express.Router();

router.post("/signup", signupValidation,signup);
router.post("/login", loginValidation, login);

export default router;