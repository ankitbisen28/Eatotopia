import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const ForgetPasswordEmail = () => {
  const [user, setUser] = useState({ email: "" });
  const [forgotPasswordStatus, setForgotPasswordStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const forgotPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/forgetPasswordMail",
        user
      );
      console.log("Forgot password - Email sent", response.data);
      toast.success("Forgot password - Email sent");
      setForgotPasswordStatus(true);
      setUser({ email: "" });
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h3 className="p-3"> Enter Email for Forget Password</h3>
      <div className="d-flex flex-column mb-3 justify-content-center align-items-center">
        <label htmlFor="email" className="text-dark h3">
          {loading ? "Processing" : "Forgot Password"}
        </label>
        <input
          className="p-2 w-50 "
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <button onClick={forgotPassword} className=" m-3 w-25 btn btn-primary">
          Send Mail
        </button>
      </div>
    </div>
  );
};
