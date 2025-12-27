import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TrashIcon } from "lucide-react";
import { FaUsers } from "react-icons/fa";
import { useVendor } from "../context/VendorContext";

const VendorConnectionsPage = () => {
  const { connections, setConnections } = useVendor();

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

  const handleDeleteConnection = async (connectionId) => {
    const token = localStorage.getItem("vendorToken");

    try {
      const res = await axios.delete(
        `http://localhost:8000/connections/${connectionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setConnections((prev) =>
          prev.filter((conn) => conn._id !== connectionId)
        );
        toast.success("Connection removed successfully");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to remove connection"
      );
    }
  };

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
                className="relative p-5 border rounded-xl bg-gray-50 hover:shadow-md transition"
              >
                {/* Delete Button (Top Right) */}
                {connection.connectionStatus === "rejected" && (
                  <button
                    onClick={() => handleDeleteConnection(connection._id)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700
                 bg-red-100 hover:bg-red-200
                 p-2 rounded-full transition shadow-sm"
                    title="Remove connection"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                )}

                {/* Connection Details */}
                <p className="text-lg font-semibold text-gray-800">
                  Agent ID: {connection.agentID}
                </p>

                <p className="text-gray-500 text-sm">
                  Agent Name: {connection.agentName}
                </p>

                <p className="text-gray-600">Agency: {connection.agencyName}</p>

                <p className="text-gray-600">
                  Status:{" "}
                  <span className="font-semibold capitalize">
                    {connection.connectionStatus}
                  </span>
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
