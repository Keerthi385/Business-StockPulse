import { Link } from "react-router";
import { FaStore, FaUserTie, FaWarehouse } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 flex flex-col items-center justify-center p-6">
      
      {/* Logo + Title */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
          <FaWarehouse className="text-white text-4xl" />
        </div>

        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-300 via-white to-yellow-300 text-transparent bg-clip-text drop-shadow-lg">
          StockPulse
        </h1>

        <p className="text-white/90 text-lg mt-2 font-semibold">
          Your store's heartbeat — always in sync
        </p>

        <p className="text-white/70 mt-1 text-sm">
          Choose your login type to continue
        </p>
      </div>

      {/* Card Container */}
      <div className="flex gap-12 flex-wrap justify-center">

        {/* Vendor Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-4 w-96 hover:scale-105 transition duration-300">
          <div className="flex items-center justify-center w-20 h-20 bg-purple-100 rounded-2xl mx-auto mb-3">
            <FaStore className="text-purple-600 text-4xl" />
          </div>

          <h2 className="text-3xl font-semibold text-center mb-2">Vendor</h2>
          <p className="text-gray-600 text-center mb-2">
            Manage your inventory and orders
          </p>

          <ul className="text-gray-700 space-y-2 mb-4">
            <li>✔ Track product stock levels</li>
            <li>✔ Automated reorder alerts</li>
            <li>✔ Revenue analytics dashboard</li>
            <li>✔ AI-powered stock assistant</li>
          </ul>

          <Link
            to="/vendor"
            className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl text-center font-semibold transition"
          >
            Login as Vendor →
          </Link>
        </div>

        {/* Agent Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-4 w-96 hover:scale-105 transition duration-300">
          <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mx-auto mb-3">
            <FaUserTie className="text-blue-600 text-4xl" />
          </div>

          <h2 className="text-3xl font-semibold text-center mb-2">Agent</h2>
          <p className="text-gray-600 text-center mb-2">
            Process and fulfill vendor orders
          </p>

          <ul className="text-gray-700 space-y-2 mb-4">
            <li>✔ Receive vendor orders</li>
            <li>✔ Manage order fulfillment</li>
            <li>✔ Track delivery status</li>
            <li>✔ Inventory management tools</li>
          </ul>

          <Link
            to="/agent"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center font-semibold transition"
          >
            Login as Agent →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HomePage;