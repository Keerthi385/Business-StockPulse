
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Agent from "../models/Agent.js";

export const signup = async (req, res) => {
  try {
    const { agentName, agencyName, email, password, phoneNo, address } = req.body;
    const agentExists = await Agent.findOne({ email });
    if (agentExists) {
      return res.status(400).json({message: "Email already exists!"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = new Agent({
      agentName,
      agencyName,
      email,
      password: hashedPassword,
      phoneNo,
      address,
    });

    const savedagent = await agent.save();
    return res
      .status(201)
      .json({ message: "Signup successful!", agent: savedagent });
  } catch (error) {
    console.log("Error in signup", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log("LOGIN BODY:", req.body);

    const agent = await Agent.findOne({ email });
    if (!agent) {
      return res.status(404).json({ message: "Agent does not exists!" });
    }
    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ agentId: agent._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({ message: "Login successful!", token, agent });
  } catch (error) {
    console.log("Error in login", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
