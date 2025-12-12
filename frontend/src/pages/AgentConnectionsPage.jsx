import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserFriends } from "react-icons/fa";

const AgentConnectionsPage = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      const token = localStorage.getItem("agentToken");
      try {
        const res = await axios.get(
          "http://localhost:8000/connections/connectedVendors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          setConnections(res.data);
          toast.success("Connections loaded successfully!");
        } else {
          toast.error(res.data?.message || "Failed to fetch connections");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Server Error");
      }
    };

    fetchConnections();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 p-6">

      {/* Page Header */}
      <div className="text-center mb-10">
        <FaUserFriends className="text-blue-200 text-6xl mx-auto mb-4 drop-shadow-lg" />
        <h1 className="text-5xl font-bold text-white drop-shadow-md">
          My Vendor Connections
        </h1>
        <p className="text-blue-200/80 mt-2 text-lg">
          View all vendors connected to you
        </p>
      </div>

      {/* Connections List */}
      <div className="max-w-3xl mx-auto space-y-6">
        {connections.length === 0 && (
          <p className="text-center text-blue-100 text-lg">
            You have no vendor connections yet.
          </p>
        )}

        {connections.map((connection, idx) => (
          <div
            key={idx}
            className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 hover:shadow-blue-500/30 transition"
          >
            <h2 className="text-2xl font-bold text-gray-800">
              {connection.vendorName}
            </h2>

            <p className="text-gray-600 mt-2">
              <span className="font-semibold">Shop Name:</span>{" "}
              {connection.vendorShopName}
            </p>

            <hr className="my-4 border-gray-300" />

            <p className="text-sm text-gray-500">
              Connected Vendor #{idx + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentConnectionsPage;
