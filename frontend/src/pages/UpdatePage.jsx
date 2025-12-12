import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

const UpdatePage = () => {
  const [product, setProduct] = useState({
    productName: "",
    quantity: 0,
    price: 0,
    supplier: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("vendorToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/products/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      navigate("/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Issue");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Server Issue");
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-900 via-purple-600 to-purple-900 p-6">
      
      {/* Header */}
      <div className="text-center mb-10">
        <FaEdit className="text-white text-6xl mx-auto mb-3" />
        <h1 className="text-4xl font-bold text-white">Update Product</h1>
        <p className="text-white/80 mt-2">Modify your product details</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">
        <form className="space-y-5">
          <InputField
            label="Product Name"
            name="productName"
            type="text"
            value={product.productName}
            handleChange={handleChange}
          />

          <InputField
            label="Quantity"
            name="quantity"
            type="number"
            value={product.quantity}
            handleChange={handleChange}
          />

          <InputField
            label="Price"
            name="price"
            type="number"
            value={product.price}
            handleChange={handleChange}
          />

          <InputField
            label="Supplier"
            name="supplier"
            type="text"
            value={product.supplier}
            handleChange={handleChange}
          />

          <button
            type="button"
            onClick={handleUpdate}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-xl transition duration-300 shadow-lg hover:shadow-purple-400/40"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type, value, handleChange }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      required
    />
  </div>
);

export default UpdatePage;
