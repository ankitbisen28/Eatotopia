import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useCart } from "../../ContextReducer/ContextReducer";

export const Card = ({ foodItem, itemOption }) => {
  let dispatch = useDispatch();
  let data = useCart();

  let priceRef = useRef();

  let option = itemOption;
  let priceOptions = Object.keys(option);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleCart = async () => {
    let food = [];

    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }

    if (food != []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      }
    }
    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  let finalPrice = qty * parseInt(option[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="container my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={foodItem.img}
            className="card-img-top"
            style={{ height: "200px", objectFit: "fill" }}
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{foodItem.name}</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="container w-100">
              <select
                className="m-2 h-100 bg-danger text-white border rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + i} value={i + 1}>
                      {" "}
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 h-100 bg-danger text-white border rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline h-100 fs-5">Rs {finalPrice}/-</div>
              <hr />
              <div className="btn btn-primary" onClick={handleCart}>
                Add To cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
