import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "../Login/Login.css";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/loginuser`,
        {
          email: loginData.email,
          password: loginData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = response.data;
      // console.log("this is json after login", json);

      if (!json.success) {
        toast.error("Enter Valid Credentials");
      }

      if (json.success) {
        localStorage.setItem("authToken", json.authtoken);
        localStorage.setItem("userEmail", json.email);
        // console.log(localStorage.getItem("authToken"))
        toast.success("Logged in");
        navigate("/");
      }
      // console.log(json);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className="container" id="loginComponent">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label my-3">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={loginData.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={loginData.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Login
          </button>
          <div className="d-flex flex-row mb-3">
            <Link to="/forgetPasswordEmail" className="p-2">
              Forget Password
            </Link>
            <Link to="/signup" className="p-2">
              Create a account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
