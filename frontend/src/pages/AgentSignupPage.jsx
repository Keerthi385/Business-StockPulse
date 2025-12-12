import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaUserShield } from "react-icons/fa";

const AgentSignupPage = () => {
  const [signupInfo, setSignupInfo] = useState({
    agentName: "",
    agencyName: "",
    agentDOB: "",
    agentEmail: "",
    agentPassword: "",
    agentPhoneNo: "",
    agentAddress: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/agentAuth/signup",
        signupInfo
      );

      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/agent-login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Issue");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 p-6">

      {/* Header */}
      <div className="text-center mt-4 mb-8">
        <FaUserShield className="text-blue-200 text-6xl mx-auto mb-4 drop-shadow-lg" />
        <h1 className="text-5xl font-bold text-white">Agent Portal</h1>
        <p className="text-blue-200/80 text-lg mt-2">
          Create your agent account & manage vendors easily
        </p>
      </div>

      {/* Signup Form Box */}
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create an Agent Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <InputField label="Full Name" name="agentName" handleChange={handleChange} />
          <InputField label="Agency Name" name="agencyName" handleChange={handleChange} />
          <InputField label="Date of Birth" type="date" name="agentDOB" handleChange={handleChange} />
          <InputField label="Email" type="email" name="agentEmail" handleChange={handleChange} />
          <InputField label="Password" type="password" name="agentPassword" handleChange={handleChange} />
          <InputField label="Phone Number" name="agentPhoneNo" handleChange={handleChange} />
          <InputField label="Address" name="agentAddress" handleChange={handleChange} />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/agent-login")}
            className="text-blue-600 hover:underline cursor-pointer font-medium"
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
      placeholder={`Enter ${label.toLowerCase()}`}
      onChange={handleChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
);

export default AgentSignupPage;
