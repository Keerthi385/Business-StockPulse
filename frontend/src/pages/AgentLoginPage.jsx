import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaUserShield, FaSignInAlt } from "react-icons/fa";
import { socket } from "../socket.js";

const AgentLoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    agentEmail: "",
    agentPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/agentAuth/login",
        loginInfo
      );

      if (res.status === 200) {
        localStorage.setItem("agentToken", res.data.token);
        const token = localStorage.getItem("agentToken");
        const agentId = JSON.parse(atob(token.split(".")[1])).agentId;

        socket.emit("register", {
          userId: agentId,
          role: "agent",
        });
        toast.success(res.data.message);
        navigate("/agent/agent-orders");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Issue");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-blue-900 to-black p-4">
      {/* HEADER */}
      <div className="text-center mb-10 animate-fadeIn">
        <FaUserShield className="text-blue-300 mx-auto text-7xl drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold text-white mt-3 tracking-wide">
          Agent Login
        </h1>
        <p className="text-blue-200/80 text-lg mt-2">
          Access your agent account & manage orders
        </p>
      </div>

      {/* WHITE BOX */}
      <div className="bg-white border border-gray-200 shadow-2xl rounded-3xl p-10 w-full max-w-md animate-slideUp">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="agentEmail"
              placeholder="Enter email"
              className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="agentPassword"
              placeholder="Enter password"
              className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/40"
          >
            <FaSignInAlt />
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentLoginPage;
