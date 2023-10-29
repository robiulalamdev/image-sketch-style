/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { GrFormNext } from "react-icons/gr";

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button className="nextBtn" onClick={onClick}>
      <GrFormNext />
    </button>
  );
};

export default NextArrow;
