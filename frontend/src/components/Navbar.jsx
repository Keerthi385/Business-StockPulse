import {
  BotIcon,
  ChartNoAxesCombined,
  HomeIcon,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import logo from "../images/ReStockIQ-logo.png";

const Navbar = ({ isOpen, setIsOpen, active, setActive }) => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="navbar h-16 w-full shadow-lg flex justify-start p-2">
        <img src={logo} alt="Logo" className="h-12" />
      </div>
      <div className="h-full flex">
        <div
          className={`sidebar h-full ${
            isOpen ? "w-40" : "w-14"
          } flex flex-col flex-left items-start transition-all duration-4000 shadow-lg text-md`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <button
            className={`flex flex-start gap-2 w-full p-4 hover:bg-gray-100 ${
              active === "Home" ? "bg-gray-200" : ""
            }`}
            onClick={() => setActive("Home")}
          >
            <HomeIcon className="size-6" />
            {isOpen && <span>Home</span>}
          </button>
          <button
            className={`flex flex-start gap-2 w-full p-4 hover:bg-gray-100 ${
              active === "Products" ? "bg-gray-200" : ""
            }`}
            onClick={() => setActive("Products")}
          >
            <Package className="size-6" />
            {isOpen && <span>Products</span>}
          </button>
          <button
            className={`flex flex-start gap-2 w-full p-4 hover:bg-gray-100 ${
              active === "ChatBot" ? "bg-gray-200" : ""
            }`}
            onClick={() => setActive("ChatBot")}
          >
            <BotIcon className="size-6" />
            {isOpen && <span>ChatBot</span>}
          </button>
          <button
            className={`flex flex-start gap-2 w-full p-4 hover:bg-gray-100 ${
              active === "Orders" ? "bg-gray-200" : ""
            }`}
            onClick={() => setActive("Orders")}
          >
            <ShoppingBag className="size-6" />
            {isOpen && <span>Orders</span>}
          </button>
          <button
            className={`flex flex-start gap-2 w-full p-4 hover:bg-gray-100 ${
              active === "Analytics" ? "bg-gray-200" : ""
            }`}
            onClick={() => setActive("Analytics")}
          >
            <ChartNoAxesCombined className="size-6" />
            {isOpen && <span>Analytics</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
