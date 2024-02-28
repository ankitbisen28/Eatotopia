import React, { useState, useEffect } from "react";
import { Card } from "../Card/Card";
import heroOne from "../../assets/images/hero-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faLeaf,
  faHandsBubbles,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";

export const Home = ({ search, setSearch }) => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  // console.log(foodCat);

  let loadData = async () => {
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/foodData`
      );
      console.log(response.data[0]);
      setFoodItem(response.data[0]);
      setFoodCat(response.data[1]);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row d-flex align-items-center">
          <div style={{marginTop:"5rem"}} className="col-lg-6 hero-left">
            <h1 className="display-4 mb-5 mt-3">
              We Love <br />
              Delicious Foods!
            </h1>
            <div className="mb-2">
              <a
                className="btn btn-primary btn-shadow btn-lg"
                href="#food-items"
                role="button"
              >
                Explore Menu
              </a>
            </div>

            <ul className="hero-info list-unstyled d-flex text-center mb-0">
              <li className="border-right">
                <FontAwesomeIcon icon={faRocket} size="2x" />
                <h5>Fast Delivery</h5>
              </li>
              <li className="border-right">
                <FontAwesomeIcon icon={faLeaf} size="2x" />
                <h5>Fresh Food</h5>
              </li>
              <li className="">
                <FontAwesomeIcon icon={faHandsBubbles} size="2x" />
                <h5>24/7 Support</h5>
              </li>
            </ul>
          </div>
          <div className="col-lg-6 hero-right">
            <div className="owl-carousel owl-theme hero-carousel">
              <div className="item">
                <img className="img-fluid" src={heroOne} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {localStorage.getItem("authToken") ? (
        <div className="container">
          <div className="container my-3">
            <div className="w-25 mx-2" role="search">
              <h4>Search Food</h4>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {foodCat != [] ? (
            foodCat.map((data) => {
              return (
                <div className=" mb-3" key={data._id} id="food-items">
                  <h2 className="my-2"> {data.CategoryName}</h2>
                  <hr />
                  <div className="row">
                    {console.log(foodItem)}
                    {foodItem != [] ? (
                      foodItem
                        .filter(
                          (item) =>
                            item.CategoryName === data.CategoryName &&
                            item.name
                              .toLowerCase()
                              .includes(search.toLocaleLowerCase())
                        )
                        .map((filterItem) => {
                          return (
                            <div
                              key={filterItem._id}
                              className="col-12 col-md-6 col-lg-3 m-3"
                            >
                              <Card
                                foodItem={filterItem}
                                itemOption={filterItem.options[0]}
                              />
                            </div>
                          );
                        })
                    ) : (
                      <div> No such data found</div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div>Nothing is present</div>
          )}
        </div>
      ) : (
        <h5 className="text-center my-3">Please Login first or Signup</h5>
      )}
    </div>
  );
};
