import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
const VendorSignupPage = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    shopName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/vendorAuth/signup",
        signupInfo
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("./vendor-login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Issue");

      console.log(error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        Name:{" "}
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
        />
        <br />
        Shop Name:{" "}
        <input
          type="text"
          name="shopName"
          placeholder="Enter shop name"
          onChange={handleChange}
        />
        <br />
        Email:{" "}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border"
          onChange={handleChange}
        />{" "}
        <br />
        Password:{" "}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border"
          onChange={handleChange}
        />{" "}
        <br />
        Phone no.:{" "}
        <input
          type="text"
          name="phone"
          placeholder="Enter phone no."
          onChange={handleChange}
        />
        <br />
        Address:{" "}
        <input
          type="text"
          name="address"
          placeholder="Enter address"
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default VendorSignupPage;
