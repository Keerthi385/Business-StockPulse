import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const ConnectionRequestsPage = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnectionRequests = async () => {
      try {
        const token = localStorage.getItem("agentToken");
        const res = await axios.get(
          "http://localhost:8000/connections/connectionRequests",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 200) {
          setConnections(res.data);
        } else {
          toast.error("Failed to fetch connections");
        }
      } catch (error) {
        console.log("Error fetching connection requests", error);
        toast.error(error.response?.data?.message || "Unknown Error");
      }
    };

    fetchConnectionRequests();
  }, []);

  const handleAccept = async (orderId) => {
    try {
      const token = localStorage.getItem("agentToken");
      const res = await axios.put(
        `http://localhost:8000/connections/accept/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        toast.success("Vendor request accepted");
        setConnections((prev) => prev.filter((c) => c._id !== orderId));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Accept error", error);
      toast.error(error.response?.data?.message || "Unknown Error");
    }
  };

  const handleReject = async (orderId) => {
    try {
      const token = localStorage.getItem("agentToken");
      const res = await axios.put(
        `http://localhost:8000/connections/reject/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        toast.success("Vendor request rejected");
        setConnections((prev) => prev.filter((c) => c._id !== orderId));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Reject error", error);
      toast.error(error.response?.data?.message || "Unknown Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-white-600 to-blue-900 py-12 px-6 flex flex-col items-center">

      {/* Header */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center w-full max-w-3xl border border-white/30">
        <h1 className="text-4xl font-bold text-white drop-shadow-md">
          Connection Requests
        </h1>

        <Link
          to="/myVendors"
          className="inline-block mt-3 text-white/90 hover:text-white underline"
        >
          View My Vendors →
        </Link>
      </div>

      {/* Requests List */}
      <div className="w-full max-w-3xl mt-10 space-y-6">
        {connections.length === 0 ? (
          <p className="text-center text-white text-xl opacity-90 mt-10">
            No new connection requests.
          </p>
        ) : (
          connections.map((connection) => (
            <div
              key={connection._id}
              className="bg-white rounded-3xl shadow-xl p-8 border border-purple-100"
            >
              <h2 className="text-2xl font-semibold text-gray-900">
                {connection.vendorName}
              </h2>
              <p className="text-gray-600">{connection.vendorShopName}</p>

              <div className="mt-5 flex gap-4">
                <button
                  onClick={() => handleAccept(connection._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition font-medium"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleReject(connection._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition font-medium"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConnectionRequestsPage;
