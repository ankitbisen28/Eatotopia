import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export const VerifyForgetPassword = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [error, setError] = useState(false);

  const updateNewPassword = async () => {
    try {
      const user = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/verifyForgetPassword`,
        {
          token,
          newPassword,
        }
      );
      setPasswordUpdated(true);
      toast.success("Password Changed");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  });

  return (
    <div style={{ marginTop: "6rem" }} className="container">
      <div className="d-flex flex-column align-items-center">
        <h1 className="m-3">Reset Password</h1>

        <label htmlFor="newPassword"></label>
        <input
          className="p-2 border mb-4 text-black w-50"
          id="email"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter New Password"
        />

        <button
          onClick={updateNewPassword}
          className="py-2 px-4 btn btn-primary btn-sm"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};
