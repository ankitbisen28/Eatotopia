import React from "react";
import { useCart, useDispatch } from "../../ContextReducer/ContextReducer";
import { Trash } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import axios from "axios";

export const Cart = () => {
  let data = useCart();
  let dispatch = useDispatch();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/orderData`,
        {
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        dispatch({ type: "DROP" });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div style={{ backgroundColor: "rgb(206, 203, 203)" }}>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={food.id}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Trash
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
