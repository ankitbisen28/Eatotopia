import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal/Modal";
import { Cart } from "../Cart/Cart";
import { useCart } from "../../ContextReducer/ContextReducer";
import logo from "../../assets/images/fastfood.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export const Nevbar = ({ loggedOut }) => {
  const navigate = useNavigate();
  let data = useCart();

  const [cardView, setCardView] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
    toast.error("Logged out");
  };
  return (
    <div>
      <nav id="navbar-header" className="navbar navbar-expand-lg">
        <div className="container">
          <Link
            className="navbar-brand navbar-brand-center d-flex align-items-center p-0 only-mobile"
            to="/"
          >
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faNavicon} />
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav d-flex justify-content-between">
              <div className="d-flex flex-lg-row flex-column">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/about">
                    About Me
                  </Link>
                </li>
                {localStorage.getItem("authToken") ? (
                  <div className="d-flex">
                    <li className="nav-item">
                      <Link to="/myOrder" className="nav-item nav-link">
                        My Orders
                      </Link>
                    </li>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </ul>

            <Link
              className="navbar-brand navbar-brand-center d-flex align-items-center only-desktop"
              to="/"
            >
              <img src={logo} alt="" />
            </Link>
            <div className="navbar-nav d-flex justify-content-between">
              <div>
                {!localStorage.getItem("authToken") ? (
                  <div className="d-flex">
                    <li className="nav-item mr-3">
                      <Link to="/login" className="btn btn-danger">
                        login
                      </Link>
                    </li>
                    <li className="nav-item mr-3">
                      <Link to="/signup" className="btn btn-warning">
                        Signup
                      </Link>
                    </li>
                  </div>
                ) : (
                  <div className="d-flex">
                    <div
                      className="btn btn-success mr-3"
                      onClick={() => setCardView(true)}
                    >
                      My Cart{" "}
                      <Badge bg="danger">
                        {data.length !== 0 ? data.length : ""}
                      </Badge>
                    </div>
                    {cardView ? (
                      <Modal
                        onClose={(e) => {
                          setCardView(false);
                          e.stopPropagation();
                        }}
                      >
                        <Cart />
                      </Modal>
                    ) : (
                      ""
                    )}

                    <li className="nav-item">
                      <button className="btn btn-danger" onClick={handleLogOut}>
                        login out
                      </button>
                    </li>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
