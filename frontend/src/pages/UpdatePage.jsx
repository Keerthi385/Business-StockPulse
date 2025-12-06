import axios from "axios";
import React, { useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import toast from "react-hot-toast"

const UpdatePage = () => {
  const [product, setProduct] = useState({
    productName: "",
    quantity: 0,
    price: 0,
    supplier: "",
  });

  const navigate = useNavigate();

  const {id} = useParams();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  
  const token = localStorage.getItem("token");

  const handleUpdate = async() => {
    try {
      
      const res = await axios.put(`http://localhost:8000/products/${id}`,product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      toast.success(res.data.message);
      navigate("/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Issue");

    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/products/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Server Issue");
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      <h1>Update Product</h1>
      <form>
        Product Name:{" "}
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={product.productName}
          onChange = {handleChange}
          />{" "}
        <br />
        Quantity:{" "}
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange = {handleChange}
        />{" "}
        <br />
        Price:{" "}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange = {handleChange}
        />{" "}
        <br />
        Supplier:{" "}
        <input
          type="text"
          name="supplier"
          placeholder="Supplier"
          value={product.supplier}
          onChange = {handleChange}
        />{" "}
        <br />
        <input type="button" value="Update" onClick={handleUpdate} />
      </form>
    </div>
  );
};

export default UpdatePage;
