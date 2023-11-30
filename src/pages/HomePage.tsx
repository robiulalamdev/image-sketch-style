/* eslint-disable no-var */
/* eslint-disable prefer-const */
import FastStyleTransferModel from "../components/fastStyleTransferModel/FastStyleTransferModel";
import { useState } from "react";
import PhotoDisplay from "../components/photoDisplay/PhotoDisplay";
import "../components/home-ui/GeneratedImages/generatedImages.css";
import stylesPhoto from "../components/photoDisplay/photo.module.css";
import { loadImage } from "../modules/utils";
import UploadImage from "../components/home-ui/UploadImage";
import Loader from "../assets/images/loader.gif";

import { Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import NextArrow from "../components/nextArrow/NextArrow";
import PrevArrow from "../components/prevArrow/PrevArrow";
import { IoIosArrowBack } from "react-icons/io";
import { styleImages } from "../utiles/images";

export enum CameraState {
  start,
  started,
  stop,
  stopped,
}

const HomePage = () => {
  const [state, setState] = useState<{
    camera: CameraState;
    mode: string;
    styleImage: string;
    imageToStyle: string;
  }>({
    camera: CameraState.stopped,
    mode: "photo",
    styleImage: "",
    imageToStyle: "",
  });

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(1);
  const [canvas, setCanvas] = useState<{ canvasA: number; canvasB: number }>({
    canvasA: 0,
    canvasB: 0,
  });

  const handleBack = () => {
    setCanvas({ canvasA: 0, canvasB: 0 });
    setStep(2);
  };

  const updateImageToStyleCallback = (imageToStyle: string) => {
    setState({
      ...state,
      imageToStyle: imageToStyle,
    });
  };

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
        breakpoint: 330,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          slidesPerRow: 1,
        },
      },
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

  return (
    <>
      <FastStyleTransferModel>
        {(doStyleTransfer) => {
          {
            const resizeAndStylizeImage = (
              imageToStyle: HTMLImageElement,
              styleImage: HTMLImageElement,
              imageCanvas: HTMLCanvasElement,
              targetCanvas: HTMLCanvasElement
            ) => {
              let imageCanvasCtx = imageCanvas.getContext("2d");

              let imageAspectRatio = imageToStyle.height / imageToStyle.width;
              imageCanvas.height = imageCanvas.width * imageAspectRatio;
              if (imageCanvasCtx != null) {
                imageCanvasCtx.drawImage(
                  imageToStyle,
                  0,
                  0,
                  imageToStyle.width,
                  imageToStyle.height,
                  0,
                  0,
                  imageCanvas.width,
                  imageCanvas.height
                );
                let imageToStyleImgData = imageCanvasCtx.getImageData(
                  0,
                  0,
                  imageCanvas.width,
                  imageCanvas.height
                );

                doStyleTransfer(imageToStyleImgData, styleImage, targetCanvas);
              }
            };

            var stylizeImage = async () => {
              setLoading(true);
              for (let i = 0; i < styleImages.length; i++) {
                let canvas1 = document.querySelector(
                  `#canvasContainer${styleImages[i].idA}`
                ) as HTMLCanvasElement;
                let canvas2 = document.querySelector(
                  `#canvasContainer${styleImages[i].idB}`
                ) as HTMLCanvasElement;

                let styleImageP = await loadImage(styleImages[i].url);
                let imageToStyleP = await loadImage(state.imageToStyle);

                Promise.all([styleImageP, imageToStyleP])
                  .then((sImages) => {
                    let styleImage = sImages[0];
                    let imageToStyle = sImages[1];
                    resizeAndStylizeImage(
                      imageToStyle,
                      styleImage,
                      canvas1,
                      canvas2
                    );
                  })
                  .catch((err) => {
                    console.error(err);
                    setLoading(false);
                  });
              }
              setStep(2);
              setLoading(false);
            };
          }
          return (
            <div className="home_container mx-auto font-theme">
              {loading && (
                <div className="loader text-center">
                  <img src={Loader} style={{ width: "354px" }} alt="loader" />
                  <h2 className="fs-25 fw-bold text-black mb-4">
                    Your Images are being generated!
                  </h2>
                  <p className="fs-18 fw-medium text-black6c">
                    Pls wait for a moment
                  </p>
                </div>
              )}
              {step === 1 && (
                <div className={`${loading ? "hidden" : "block"}`}>
                  <UploadImage
                    setStateCallback={updateImageToStyleCallback}
                    setFile={setFile}
                    file={file}
                  />
                  {state.imageToStyle && (
                    <Button
                      variant="outlined"
                      className="mt-4"
                      onClick={() => stylizeImage()}
                    >
                      GENERATE
                    </Button>
                  )}
                </div>
              )}

              {/* // generated style images carousel */}
              <div
                className={`imageStyles_slider pb-5 ${
                  step === 2 ? "block" : "hidden"
                }`}
              >
                <button
                  onClick={() => {
                    setStep(1);
                  }}
                  className="border-0 bg-transparent d-flex align-items-center gap-2 fs-18 fw-medium text-black mb-4"
                >
                  <span>
                    <IoIosArrowBack />
                  </span>
                  Back
                </button>
                <Slider {...settings}>
                  {styleImages?.map(
                    (
                      sliderItem: {
                        idA: number;
                        idB: number;
                        url: string;
                        name: string;
                      },
                      index: number
                    ) => (
                      <div
                        className="slider-item bg-transparent border-0 text-decoration-none"
                        key={index}
                      >
                        <div
                          onClick={() => {
                            setCanvas({
                              canvasA: sliderItem.idA,
                              canvasB: sliderItem?.idB,
                            });
                            setStep(3);
                          }}
                          className="cursor-pointer "
                        >
                          <canvas
                            id={`canvasContainer${sliderItem.idA}`}
                            className={stylesPhoto.canvasHidden}
                          />
                          <div key={`canvasContainer${sliderItem?.idB}`}>
                            <canvas
                              id={`canvasContainer${sliderItem?.idB}`}
                              className={stylesPhoto.canvasPhoto}
                              style={{
                                width: "150px",
                                height: "100px",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                          <h6 className="fs-15 font-medium text-capitalize text-black">
                            {sliderItem.name.slice(0, 16)}
                          </h6>
                        </div>
                      </div>
                    )
                  )}
                </Slider>
              </div>
              <div
                className={`${
                  step === 3 && canvas.canvasA > 0 ? "block" : "hidden"
                }`}
              >
                <PhotoDisplay canvasData={canvas} handleBack={handleBack} />
              </div>
            </div>
          );
        }}
      </FastStyleTransferModel>
    </>
  );
};

export default HomePage;
