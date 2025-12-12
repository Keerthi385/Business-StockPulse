import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaStore } from "react-icons/fa";

const VendorSignupPage = () => {
  const [signupInfo, setSignupInfo] = useState({
    vendorName: "",
    vendorShopName: "",
    vendorDOB: "",
    vendorEmail: "",
    vendorPassword: "",
    vendorPhoneNo: "",
    vendorAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/vendorAuth/signup",
        signupInfo
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/vendor-login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Issue");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-900 via-purple-600 to-purple-900 p-6">
      
      {/* Header */}
      <div className="text-center mt-2 mb-8">
        <FaStore className="text-white text-6xl mx-auto mb-4" />
        <h1 className="text-5xl font-bold text-white">Vendor Portal</h1>
        <p className="text-white/80 text-lg mt-2">
          Create your vendor account & start managing your inventory
        </p>
      </div>

      {/* Signup Card */}
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <InputField
            label="Full Name"
            name="vendorName"
            type="text"
            handleChange={handleChange}
          />

          <InputField
            label="Shop Name"
            name="vendorShopName"
            type="text"
            handleChange={handleChange}
          />

          <InputField
            label="Date of Birth"
            name="vendorDOB"
            type="date"
            handleChange={handleChange}
          />

          <InputField
            label="Email"
            name="vendorEmail"
            type="email"
            handleChange={handleChange}
          />

          <InputField
            label="Password"
            name="vendorPassword"
            type="password"
            handleChange={handleChange}
          />

          <InputField
            label="Phone Number"
            name="vendorPhoneNo"
            type="text"
            handleChange={handleChange}
          />

          <InputField
            label="Address"
            name="vendorAddress"
            type="text"
            handleChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold p-3 rounded-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/vendor-login")}
            className="text-purple-500 hover:underline cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type = "text", handleChange }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={`Enter ${label}`}
      onChange={handleChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      required
    />
  </div>
);

export default VendorSignupPage;
