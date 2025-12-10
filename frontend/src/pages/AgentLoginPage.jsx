import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import socket from "../socket.js"; 
import { useNavigate } from "react-router";

const AgentLoginPage = () => {

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

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
        localStorage.setItem("agentToken", res.data.token);

        socket.emit("join_agent", res.data.agent._id);

        toast.success(res.data.message);
        navigate("/agent-orders");
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
