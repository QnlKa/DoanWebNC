import React from "react";
import "./Popular.css";
import Item from "../Item/Item";
import { useNavigate } from "react-router-dom";

const Popular = ({ data }) => {
  const navigate = useNavigate();
  const handleDetail = (id) => {
    navigate(`/productDetail/${id}`);
  };
  const formatValue = (value) => {
    return `${value?.toLocaleString("vi-VN")}`;
  };
  return (
    <div className="popular">
      <h1>SẢN PHẨM BÁN NHIỀU NHẤT</h1>
      <hr />
      <div className="popular-item">
        {data.slice(0, 5).map((item) => {
          return (
            <Item
              key={item._id}
              id={item._id}
              image={item.images}
              category={item.category}
              name={item.title}
              price={formatValue(item.price)}
              sold={item.sold}
              onClick={() => handleDetail(item._id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
