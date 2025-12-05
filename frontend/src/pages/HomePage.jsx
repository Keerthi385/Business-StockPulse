import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/products/");
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.log("Error fetching products!");
        toast.error("Failed to load data!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div >
      <Navbar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        active={active}
        setActive={setActive}
      />
      <div className="h-screen w-screen flex">
        <div className="flex-1 flex flex-col shadow p-4">
          <div className="flex items-center gap-2 ">
            <ChevronRight className="size-5" />
            <h1 className="text-xl font-bold">{`${active}`}</h1>
          </div>
          {true && <p className="">Loading data...</p>}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
