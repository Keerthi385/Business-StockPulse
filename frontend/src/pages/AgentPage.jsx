import React from "react";
import { useNavigate } from "react-router";
import { FaUserShield } from "react-icons/fa";

const AgentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 flex flex-col items-center p-6">

      {/* Title Section */}
      <div className="text-center mt-24 mb-12">
        <FaUserShield className="text-white text-6xl mx-auto mb-4 drop-shadow-lg" />

        <h1 className="text-5xl font-extrabold text-white drop-shadow-md">
          Agent Portal
        </h1>

        <p className="text-white/80 text-lg mt-2">
          Manage vendor stock, orders & distribution seamlessly
        </p>
      </div>

      {/* Login / Signup Cards */}
      <div className="flex gap-10 flex-wrap justify-center">

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10 w-72 text-center hover:scale-105 transition-transform duration-300 border border-blue-100">
          <FaUserShield className="text-blue-600 text-5xl mx-auto mb-4" />

          <h2 className="text-2xl font-bold mb-2 text-gray-900">Agent Login</h2>
          <p className="text-gray-600 mb-4">Access your dashboard</p>

          <button
            onClick={() => navigate("/agent-login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            Login →
          </button>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10 w-72 text-center hover:scale-105 transition-transform duration-300 border border-blue-100">
          <FaUserShield className="text-blue-600 text-5xl mx-auto mb-4" />

          <h2 className="text-2xl font-bold mb-2 text-gray-900">Agent Signup</h2>
          <p className="text-gray-600 mb-4">Create your agent account</p>

          <button
            onClick={() => navigate("/agent-signup")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            Signup →
          </button>
        </div>

      </div>
    </div>
  );
};

export default AgentPage;
