import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { FaSearch, FaUserPlus, FaUsers } from "react-icons/fa";

const FindConnectionsPage = () => {
  const [agentID, setAgentID] = useState("");
  const [agent, setAgent] = useState({});

  const findAgent = async () => {
    try {
      const token = localStorage.getItem("vendorToken");
      const res = await axios.get(
        `http://localhost:8000/connections/findAgentByID/${agentID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setAgent(res.data);
        toast.success("Agent Found");
      } else {
        toast.error("Agent not found!");
      }
    } catch (error) {
      console.log("Error in findAgent fun");
      toast.error("Agent not found!");
    }
  };

  const handleConnection = async () => {
    try {
      const token = localStorage.getItem("vendorToken");
      const res = await axios.post(
        `http://localhost:8000/connections/${agentID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("Connection request sent!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error in handle connection");
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-900 via-purple-600 to-purple-900 p-8">

      {/* Header */}
      <Link
        to="/vendor/vendor-connections"
        className="mb-8 text-white underline text-lg flex items-center gap-2 hover:text-purple-200"
      >
        <FaUsers /> My Connections
      </Link>

      {/* Main Search Card */}
      <div className="bg-white w-full max-w-xl p-10 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700 flex items-center justify-center gap-3">
          <FaSearch /> Find Agent
        </h1>

        <input
          type="text"
          name="agentID"
          placeholder="Enter Agent ID to search"
          onChange={(e) => setAgentID(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={findAgent}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl transition font-medium"
        >
          Search
        </button>

        {/* Agent Details Section */}
        {agent && agent.agentName && (
          <div className="mt-8 p-6 bg-gray-50 rounded-2xl shadow-inner">
            <h1 className="text-xl font-semibold mb-3 text-gray-800">
              Agent Name: {agent.agentName}
            </h1>

            <button
              onClick={handleConnection}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl mt-3 flex items-center gap-2 transition"
            >
              <FaUserPlus /> Connect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindConnectionsPage;
