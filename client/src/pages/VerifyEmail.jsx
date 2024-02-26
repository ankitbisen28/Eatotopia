import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/verifyEmail`, {
        token,
      });
      setVerified(true);
    } catch (error) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <div className="container h-100 mt-5 py-3">
          {verified && (
            <div>
              <h2 style={{marginTop:'2rem'}} className="text-2xl">Email Verified</h2>
              <Link to="/login">Login</Link>
            </div>
          )}
          {error && (
            <div>
              <h2 className="text-2xl bg-red-500 text-black">
               Error
              </h2>
            </div>
          )}
        </div>
    </>
  );
}
