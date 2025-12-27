import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FaBoxOpen } from "react-icons/fa";

const CreateProductPage = () => {
  const [product, setProduct] = useState({
    productName: "",
    quantity: 0,
    price: 0,
    supplier: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("vendorToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:8000/products", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product Created!");
      navigate("/vendor/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Issue");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 p-6">
      
      {/* Header */}
      <div className="text-center mb-10">
        <FaBoxOpen className="text-white text-6xl mx-auto mb-3" />
        <h1 className="text-4xl font-bold text-white">Create Product</h1>
        <p className="text-white/80 mt-2">Add a new item to your inventory</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">
        <form className="space-y-5">
          <InputField
            label="Product Name"
            name="productName"
            type="text"
            handleChange={handleChange}
          />

          <InputField
            label="Quantity"
            name="quantity"
            type="number"
            handleChange={handleChange}
          />

          <InputField
            label="Price"
            name="price"
            type="number"
            handleChange={handleChange}
          />

          <InputField
            label="Supplier"
            name="supplier"
            type="text"
            handleChange={handleChange}
          />

          <button
            type="button"
            onClick={handleCreate}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-xl transition duration-300 shadow-lg hover:shadow-purple-400/40"
          >
            Create Product
          </button>
        </form>
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
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      required
    />
  </div>
);

export default CreateProductPage;
