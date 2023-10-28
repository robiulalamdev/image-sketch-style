import React, { useState } from "react";
import "./ImageStyles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import NextArrow from "../nextArrow/NextArrow";
import PrevArrow from "../prevArrow/PrevArrow";

const ImageStyles = ({ images }: { images: string[] }) => {
  const [changeScreen, setChangeScreen] = useState(false);
  const [changeTitle, setChangeTitle] = useState(null);

  const settings = {
    infinite: false,
    slidesToShow: 3,
    rows: 2,
    slidesPerRow: 2,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const imageHandler = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    // const url = e.currentTarget.getAttribute("src") as string;
    // if (image) {
    //   setStyleImageCallback(url);
    //   setChangeScreen(true);
    //   setChangeTitle("Select Styles");
    //   setTimeout(() => {}, 1000);
    // } else {
    //   alert("Please upload an image");
    // }
  };

  return (
    <>
      <div className="section_heading border-top-style mt-4">
        <h6 className="fs-15 fw-medium text-capitalize text-black image-styles-title text-center py-3 font-theme">
          {changeTitle ? changeTitle : "Image Styles"}
        </h6>
      </div>

      <div className="imageStyles_slider pb-5">
        <div>
          <Slider {...settings}>
            {images?.map((sliderItem: string, index: number) => (
              <div
                className="slider-item bg-transparent border-0 text-decoration-none"
                key={index}
              >
                <img
                  className=" cursor-pointer"
                  src={sliderItem}
                  onClick={imageHandler}
                  style={{
                    width: "150px",
                    maxHeight: "100px",
                    borderRadius: "10px",
                  }}
                  alt="slider-img"
                />

                {/* <h6 className="fs-15 font-medium text-capitalize text-black">
                  {sliderItem.name.slice(0, 16)}
                </h6> */}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default ImageStyles;
