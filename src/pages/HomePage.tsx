import FastStyleTransferModel from "../components/fastStyleTransferModel/FastStyleTransferModel";
import { useState } from "react";
import PhotoDisplay from "../components/photoDisplay/PhotoDisplay";
import styles from "./home.module.css";
import "../components/home-ui/ImageStyles.css";
import stylesPhoto from "../components/photoDisplay/photo.module.css";
import { loadImage } from "../modules/utils";
import UploadImage from "../components/home-ui/UploadImage";
import Loader from "../assets/images/loader.gif";

import selectStyleImg1 from "../assets/images/selectstyle1.svg";
import selectStyleImg2 from "../assets/images/selectstyle2.svg";
import selectStyleImg3 from "../assets/images/selectstyle3.svg";
import selectStyleImg4 from "../assets/images/selectstyle4.svg";
import selectStyleImg5 from "../assets/images/selectstyle5.svg";
import selectStyleImg6 from "../assets/images/selectstyle6.svg";
import selectStyleImg7 from "../assets/images/selectstyle7.svg";
import selectStyleImg8 from "../assets/images/selectstyle8.svg";
import selectStyleImg9 from "../assets/images/selectstyle9.svg";
import selectStyleImg10 from "../assets/images/selectstyle10.svg";
import selectStyleImg11 from "../assets/images/selectstyle11.svg";
import { Button } from "@mui/material";
import ImageEdit from "../components/imageEdit/ImageEdit";
import EditImage from "../components/home-ui/Edit-Image-ui/EditImage";
import { Header } from "../components/shared/Header";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import NextArrow from "../components/nextArrow/NextArrow";
import PrevArrow from "../components/prevArrow/PrevArrow";
import { IoIosArrowBack } from "react-icons/io";

const styleImages: { idA: number; idB: number; url: string; name: string }[] = [
  {
    idA: 1,
    idB: 2,
    url: "/images/The_Great_Wave_off_Kanagawa.jpg",
    name: "kanagawa_great_wave",
  },
  // {
  //   idA: 3,
  //   idB: 4,
  //   url: "/images/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg",
  //   name: "hubble_pillars_of_creation",
  // },
  // {
  //   url: "/images/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  //   name: "van_gogh_starry_night",
  // },
  // {
  //   url: "/images/JMW_Turner_-_Nantes_from_the_Ile_Feydeau.jpg",
  //   name: "turner_nantes",
  // },
  // {
  //   url: "/images/Les_Demoiselles_d%27Avignon.jpg",
  //   name: "picasso_demoiselles_avignon",
  // },
  // { url: "/images/Large_bonfire.jpg", name: "fire" },
  // {
  //   url: "/images/Derkovits_Gyula_Woman_head_1922.jpg",
  //   name: "derkovits_woman_head",
  // },
  // {
  //   url: "/images/Untitled_%28Still_life%29_%281913%29_-_Amadeo_Souza-Cardoso_%281887-1918%29_%2817385824283%29.jpg",
  //   name: "amadeo_style_life",
  // },
  // {
  //   url: "/images/Derkovits_Gyula_Talig%C3%A1s_1920.jpg",
  //   name: "derkovtis_talig",
  // },
  // {
  //   url: selectStyleImg1,
  //   name: "test name",
  // },
  // {
  //   url: selectStyleImg2,
  //   name: "test name",
  // },
  // {
  //   url: selectStyleImg3,
  //   name: "test name",
  // },
  // {
  //   url: selectStyleImg4,
  //   name: "test name",
  // },
  // {
  //   url: selectStyleImg5,
  //   name: "test name",
  // },
  // {
  //   url: selectStyleImg6,
  //   name: "test name",
  // },
  // {
  //   url: selectStyleImg7,
  //   name: "test name",
  // },
  // {
  //   url: selectStyleImg8,
  //   name: "test name",
  // },
];

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
              console.log("New targetCanvas.height:" + imageCanvas.height);
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
                  .then((images) => {
                    let styleImage = images[0];
                    let imageToStyle = images[1];
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
                  <img src={Loader} style={{ width: "374px" }} alt="loader" />
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
                          className="cursor-pointer"
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
