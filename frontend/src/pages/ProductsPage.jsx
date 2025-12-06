import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import UpdatePage from "./UpdatePage";
import { Link } from "react-router";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setProducts(res.data);
          toast.success("Products loaded");
          console.log(res.data);
        } else {
          toast.error("Failed to load!");
        }
      } catch (error) {
        toast.error("server issue");
      }
    };

    fetchProducts();
  }, []);
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:8000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedProducts = products.filter((product) => product._id != id);
      setProducts(updatedProducts);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Issue");
    }
  };

  return (
    <div>
      <h1>List of Products</h1>
      <Link className="mr-4" to={"/create"}>
        Create Product
      </Link>

      {products.map((product) => (
        <div>
          <p>{product.productName}</p>
          <p>{product.price}</p>
          <p>{product.quantity}</p>
          <p>{product.supplier}</p>
          <Link className="mr-4" to={`/products/${product._id}`}>
            Edit
          </Link>
          <button onClick={() => handleDelete(product._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
