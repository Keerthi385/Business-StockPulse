import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaSignInAlt, FaStore } from "react-icons/fa";

const VendorLoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    vendorEmail: "",
    vendorPassword: "",
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/vendorAuth/login",
        loginInfo
      );

      if (res.status === 200) {
        localStorage.setItem("vendorToken", res.data.token);
        toast.success(res.data.message);
        navigate("/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Issue");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-900 via-purple-700 to-purple-900 p-6">

      {/* Header */}
      <div className="text-center mt-3 mb-10">
        <FaStore className="text-white mx-auto text-6xl mb-3" />
        <h1 className="text-5xl font-bold text-white">Vendor Portal</h1>
        <p className="text-white/80 text-lg mt-2">
          Manage your inventory, orders, and stock easily
        </p>
      </div>

      {/* Login Box */}
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="vendorEmail"
              placeholder="Enter your email"
              onChange={handleChange}
              value={loginInfo.vendorEmail}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
              name="vendorPassword"
              placeholder="Enter your password"
              onChange={handleChange}
              value={loginInfo.vendorPassword}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold p-3 rounded-lg transition duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : <><FaSignInAlt /> Login</>}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-5 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/vendor-signup")}
            className="text-purple-500 font-medium cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default VendorLoginPage;
