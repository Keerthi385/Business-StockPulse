import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";


const AgentLoginPage = () => {

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });



  const handleChange = (e) => {
    const {name, value} = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/agentAuth/login",loginInfo);
      if(res.status === 200){
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message)
      } else{
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Issue");

      console.log(error);
    }
  }



  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AgentLoginPage;
