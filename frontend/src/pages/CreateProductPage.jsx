import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const CreateProductPage = () => {
  const [product, setProduct] = useState({
    productName: "",
    quantity: 0,
    price: 0,
    supplier: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const token = localStorage.getItem("token");

  const handleCreate = async () => {
    try {
      const res = await axios.post("http://localhost:8000/products", product,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      navigate("/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Issue");
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <form>
        Product Name:{" "}
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          onChange={handleChange}
        />{" "}
        <br />
        Price:{" "}
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />{" "}
        <br />
        Supplier:{" "}
        <input
          type="text"
          name="supplier"
          placeholder="Supplier"
          onChange={handleChange}
        />{" "}
        <br />
        <input type="button" value="Create Product" onClick={handleCreate} />
      </form>
    </div>
  );
};

export default CreateProductPage;
