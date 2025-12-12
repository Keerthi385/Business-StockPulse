import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUsers } from "react-icons/fa";

const VendorConnectionsPage = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      const token = localStorage.getItem("vendorToken");
      try {
        const res = await axios.get(
          "http://localhost:8000/connections/connectedAgents",
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
        console.log("Error in fetch connections");
        toast.error(error.response?.data?.message);
      }
    };

    fetchConnections();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-900 via-purple-600 to-purple-900 p-8">

      {/* Header */}
      <div className="text-center mb-10">
        <FaUsers className="text-white text-6xl mx-auto mb-3" />
        <h1 className="text-4xl font-bold text-white">My Connections</h1>
        <p className="text-white/80 mt-2">Connected Agents & Agencies</p>
      </div>

      {/* Connections List Card */}
      <div className="bg-white w-full max-w-2xl p-8 rounded-3xl shadow-xl">
        {connections.length === 0 ? (
          <p className="text-gray-600 text-center">No connections found.</p>
        ) : (
          <div className="space-y-6">
            {connections.map((connection, index) => (
              <div
                key={index}
                className="p-5 border rounded-xl bg-gray-50 hover:shadow-md transition"
              >
                <p className="text-gray-600">
                  Agency: {connection.agentID}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Agent: {connection.agentName}
                </p>
                <p className="text-gray-600">
                  Agency: {connection.agencyName}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorConnectionsPage;
