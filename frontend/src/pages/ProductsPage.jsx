import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState({});
  const [orderQuantities, setOrderQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("vendorToken");
        const res = await axios.get("http://localhost:8000/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setProducts(res.data);
          const ordersRes = await axios.get(
            "http://localhost:8000/orders/vendorOrders",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("VENDOR ORDERS RESPONSE:", ordersRes.data);

          const placed = {};

          ordersRes.data.forEach((order) => {
            if (!order.productId || !order.productId._id) return;

            const pid = order.productId._id;

            placed[pid] = true;
          });

          setOrderPlaced(placed);

          toast.success("Products loaded");
          console.log(res.data);
        } else {
          toast.error("Failed to load!");
        }
      } catch (error) {
        toast.error("server issue", error);
      }
    };

    fetchProducts();
  }, []);

  const token = localStorage.getItem("vendorToken");
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedProducts = products.filter((product) => product._id != id);
      setProducts(updatedProducts);
      toast.success("Product Deleted!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Issue");
    }
  };

  const updateQuantities = (id, incDec) => {
    setOrderQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 10) + incDec,
    }));
  };

  const handleOrder = async (id, orderQuantity) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/orders/",
        { productId: id, orderQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 201) {
        setOrderPlaced((prev) => ({
          ...prev,
          [id]: true,
        }));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Issue");
    }
  };

  return (
    <div>
      <Link to={"/vendor-orders"}>Orders</Link>
      <hr className="h-4" />
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
          {product.quantity < 10 && !orderPlaced[product._id] && (
            <div>
              <button
                onClick={() =>
                  handleOrder(product._id, orderQuantities[product._id] || 10)
                }
              >
                Order
              </button>
              <button onClick={() => updateQuantities(product._id, 1)}>
                +
              </button>
              {orderQuantities[product._id] || 10}
              <button onClick={() => updateQuantities(product._id, -1)}>
                -
              </button>
            </div>
          )}
          {orderPlaced[product._id] && <p>Order Placed</p>}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
