import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import OrderForm from "./OrderForm";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState({});
  const [orderQuantities, setOrderQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("vendorToken");
        const res = await axios.get("http://localhost:8000/products", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setProducts(res.data);

          const ordersRes = await axios.get(
            "http://localhost:8000/orders/vendorOrders",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const placed = {};
          ordersRes.data.forEach((order) => {
            if (order.productId && order.productId._id) {
              placed[order.productId._id] = true;
            }
          });

          setOrderPlaced(placed);
          toast.success("Products loaded");
        } else {
          toast.error("Failed to load!");
        }
      } catch (error) {
        toast.error("Server issue");
      }
    };

    fetchProducts();
  }, []);

  const token = localStorage.getItem("vendorToken");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(products.filter((product) => product._id !== id));
      toast.success("Product Deleted!");
    } catch (error) {
      toast.error("Server Issue");
    }
  };

  const updateQuantities = (id, incDec) => {
    setOrderQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 10) + incDec,
    }));
  };

  // const handleOrder = async (id, orderQuantity) => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:8000/orders/",
  //       { productId: id, orderQuantity },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     if (res.status === 201) {
  //       setOrderPlaced((prev) => ({ ...prev, [id]: true }));
  //       toast.success(res.data.message);
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Server Issue");
  //   }
  // };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-purple-600 to-purple-900 flex flex-col items-center">
      {/* HEADER */}
      <div className="flex flex-col items-center mb-6 gap-4 w-full max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Products</h1>

        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            to="/create"
            className="bg-white/90 hover:bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg shadow-md transition"
          >
            Create Product
          </Link>

          <Link
            to="/vendor-orders"
            className="bg-white/90 hover:bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg shadow-md transition"
          >
            Orders
          </Link>

          <Link
            to="/find-connections"
            className="bg-white/90 hover:bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg shadow-md transition"
          >
            Find Connections
          </Link>
          <Link
            to="/analysis"
            className="bg-white/90 hover:bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg shadow-md transition"
          >
            Analysis
          </Link>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white/90 p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-purple-900"
          >
            <h2 className="text-xl font-bold mb-2">{product.productName}</h2>

            <p>
              <span className="font-semibold">Price:</span> ₹{product.price}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span>{" "}
              {product.quantity}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Supplier:</span>{" "}
              {product.supplier}
            </p>

            {/* BUTTONS */}
            <div className="flex gap-2 mt-2">
              <Link
                to={`/products/${product._id}`}
                className="flex-1 bg-purple-200 hover:bg-purple-300 text-purple-900 font-semibold px-3 py-2 rounded-lg text-center transition"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-2 rounded-lg transition"
              >
                Delete
              </button>
            </div>

            {/* ORDER SECTION */}
            {product.quantity < 10 && !orderPlaced[product._id] && (
              <div className="mt-4 flex flex-col items-center gap-2 p-3 bg-purple-100 rounded-xl">
                <div className="flex gap-3 items-center">
                  <Link
                    to={`/orderForm/${product._id}/${product.productName}`}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Order
                  </Link>

                  
                </div>
              </div>
            )}

            {orderPlaced[product._id] && (
              <p className="mt-4 text-green-700 font-bold text-center">
                Order Placed
              </p>
            )}
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-white mt-10">No products available.</p>
      )}
    </div>
  );
};

export default ProductsPage;
