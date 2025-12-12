import { useNavigate } from "react-router";
import { FaSignInAlt, FaUserPlus, FaStore } from "react-icons/fa";

const VendorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-white-600 to-purple-900 flex flex-col items-center p-6">

      {/* Title Section */}
      <div className="text-center mt-24 mb-12">
        <div className="flex items-center justify-center mb-4">
          <FaStore className="text-white text-5xl" />
        </div>

        <h1 className="text-5xl font-bold text-white">Vendor Portal</h1>
        <p className="text-white/80 text-lg mt-2">
          Manage your inventory, orders, and stock easily
        </p>
      </div>

      {/* Login / Signup Cards */}
      <div className="flex gap-10 flex-wrap justify-center">

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-72 text-center hover:scale-105 transition transform duration-300">
          <FaSignInAlt className="text-purple-500 text-5xl mx-auto mb-4" />

          <h2 className="text-2xl font-semibold mb-2">Vendor Login</h2>
          <p className="text-gray-600 mb-4">Access your dashboard</p>

          <button
            onClick={() => navigate("/vendor-login")}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            Login →
          </button>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-72 text-center hover:scale-105 transition transform duration-300">
          <FaUserPlus className="text-purple-500 text-5xl mx-auto mb-4" />

          <h2 className="text-2xl font-semibold mb-2">Vendor Signup</h2>
          <p className="text-gray-600 mb-4">Create your vendor account</p>

          <button
            onClick={() => navigate("/vendor-signup")}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            Signup →
          </button>
        </div>

      </div>
    </div>
  );
};

export default VendorPage;