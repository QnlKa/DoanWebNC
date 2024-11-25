import React from "react";
import "./Offer.css";
import data_product from "../../assets/data";
import Item from "../Item/Item";

const Offer = () => {
  return (
    <div className="offer">
      <h1>ĐỀ XUẤT CHO BẠN</h1>
      <hr />
      <div className="offer-item">
        {data_product.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Offer;
