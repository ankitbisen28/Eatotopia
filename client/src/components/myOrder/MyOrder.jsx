import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const MyOrder = () => {
  const [orderData, setorderData] = useState({});
  console.log(orderData);

  const fetchMyOrder = async () => {
    // console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:5000/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        setorderData(response);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      {" "}
      <div className="container">
        <div>
          {orderData?.oData?.length > 0 &&
            orderData.oData
              .slice(0)
              .reverse()
              .map((item) => {
                return item.map((arrayData, index) => {
                  return (
                    <div key={index}>
                      {arrayData.Order_date ? (
                        <div className="m-auto mt-5 row">
                          {arrayData.Order_date}
                          <hr />
                        </div>
                      ) : (
                        <div className="col-10 col-md-6 col-lg-3">
                          <div
                            className="card mt-3"
                            style={{
                              width: "16rem",
                              maxHeight: "360px",
                            }}
                          >
                            <div className="card-body">
                              <h5 className="card-title">{arrayData.name}</h5>
                              <div
                                className="container w-100 p-0"
                                style={{ height: "38px" }}
                              >
                                <span className="m-1">{arrayData.qty}</span>
                                <span className="m-1">{arrayData.size}</span>
                                <span className="m-1"></span>
                                <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                  ₹{arrayData.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                });
              })}
        </div>
      </div>
    </>
  );
};
