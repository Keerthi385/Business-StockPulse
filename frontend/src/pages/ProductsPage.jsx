import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState({});
  const [orderQuantity, setOrderQuantity] = useState({});
  const [sellQty, setSellQty] = useState({});

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
      const token = localStorage.getItem("vendorToken");
      const res = await axios.get(`http://localhost:8000/orders/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(res.status === 400) {
        toast.error(res.data.message);
        return;
      }
      await axios.delete(`http://localhost:8000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(products.filter((product) => product._id !== id));
      toast.success("Product Deleted!");
    } catch (error) {
      toast.error("Cannot delete product!");
    }
  };

  const updateQuantities = (id, incDec) => {
    setOrderQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 10) + incDec,
    }));
  };

  const handleSell = async (
    productId,
    productName,
    currentQty,
    price,
    supplier
  ) => {
    const qtyToSell = sellQty[productId] || 1;

    if (qtyToSell > currentQty) {
      toast.error("Not enough stock!");
      return;
    }

    try {
      const token = localStorage.getItem("vendorToken");

      const updatedQty = currentQty - qtyToSell;

      const res = await axios.put(
        `http://localhost:8000/products/${productId}`,
        {
          productName,
          quantity: updatedQty,
          price,
          supplier,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedProduct = res.data.product;

        setProducts((prev) =>
          prev.map((p) => (p._id === productId ? updatedProduct : p))
        );


      toast.success(`Sold ${qtyToSell} item(s)!`);
    } catch (error) {
      console.error("Sell error:", error);
      toast.error("Error selling product");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-purple-600 to-purple-900 flex flex-col items-center">
      {/* HEADER */}
      <div className="flex flex-col items-center mb-6 gap-4 w-full max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Products</h1>

        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            to="/vendor/create"
            className="bg-white/90 hover:bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg shadow-md transition"
          >
            Create Product
          </Link>

          <Link
            to="/vendor/vendor-orders"
            className="bg-white/90 hover:bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg shadow-md transition"
          >
            Orders
          </Link>

          <Link
            to="/vendor/find-connections"
            className="bg-white/90 hover:bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg shadow-md transition"
          >
            Find Connections
          </Link>
          <Link
            to="/vendor/chatbot"
            className="bg-white/90 hover:bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg shadow-md transition"
          >
            Chatbot
          </Link>
          <Link
            to="/vendor/analysis"
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
                to={`/vendor/products/${product._id}`}
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

            <div className="mt-4 flex flex-col items-center gap-2 p-3 bg-purple-100 rounded-xl">
              <div className="flex gap-3 items-center">
                <div className="mt-4 flex flex-col items-center gap-2 p-3 bg-purple-100 rounded-xl">
                  <div className="flex gap-3 items-center">
                    {/* Quantity Dropdown */}
                    <select
                      value={sellQty[product._id] || 1}
                      onChange={(e) =>
                        setSellQty((prev) => ({
                          ...prev,
                          [product._id]: Number(e.target.value),
                        }))
                      }
                      className="px-3 py-2 rounded-lg border border-purple-300 focus:outline-none"
                    >
                      {Array.from(
                        { length: product.quantity },
                        (_, i) => i + 1
                      ).map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>

                    {/* Sell Button */}
                    <button
                      onClick={() =>
                        handleSell(
                          product._id,
                          product.productName,
                          product.quantity,
                          product.price,
                          product.supplier
                        )
                      }
                      disabled={product.quantity === 0}
                      className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition"
                    >
                      Sell
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ORDER SECTION */}

            {product.quantity < 10 && !orderPlaced[product._id] && (
              <div className="mt-4 flex flex-col items-center gap-2 p-3 bg-purple-100 rounded-xl">
                <div className="flex gap-3 items-center">
                  <Link
                    to={`/vendor/orderForm/${product._id}/${product.productName}`}
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
