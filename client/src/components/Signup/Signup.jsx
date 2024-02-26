import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Signup/Signup.css";
import { toast } from "react-toastify";
import axios from "axios";

export const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/createuser`,
        {
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
          location: signupData.geolocation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        toast.error("Enter Valid Credentials");
      } else {
        navigate("/VerifyEmail");
      }
      console.log(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onChange = (event) => {
    setSignupData({ ...signupData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container my-5" id="SignupComponent">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={signupData.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={signupData.email}
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
              value={signupData.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={signupData.geolocation}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Signup
          </button>
          <Link to="/login" className="btn btn-danger mx-3">
            Already a account
          </Link>
        </form>
      </div>
    </>
  );
};
