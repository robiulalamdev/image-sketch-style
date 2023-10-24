import React from "react";
import { GrFormNext } from "react-icons/gr";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="nextBtn" onClick={onClick}>
      <GrFormNext />
    </button>
  );
};

export default NextArrow;
