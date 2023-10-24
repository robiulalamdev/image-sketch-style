import FastStyleTransferModel from "../components/fastStyleTransferModel/FastStyleTransferModel";
import { useState } from "react";
import PhotoDisplay from "../components/photoDisplay/PhotoDisplay";
import styles from "./home.module.css";
import { loadImage } from "../modules/utils";
import UploadImage from "../components/home-ui/UploadImage";

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

const predefinedStylesList = [
  {
    url: "/images/The_Great_Wave_off_Kanagawa.jpg",
    name: "kanagawa_great_wave",
  },
  {
    url: "/images/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg",
    name: "hubble_pillars_of_creation",
  },
  {
    url: "/images/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    name: "van_gogh_starry_night",
  },
  {
    url: "/images/JMW_Turner_-_Nantes_from_the_Ile_Feydeau.jpg",
    name: "turner_nantes",
  },
  {
    url: "/images/Les_Demoiselles_d%27Avignon.jpg",
    name: "picasso_demoiselles_avignon",
  },
  { url: "/images/Large_bonfire.jpg", name: "fire" },
  {
    url: "/images/Derkovits_Gyula_Woman_head_1922.jpg",
    name: "derkovits_woman_head",
  },
  {
    url: "/images/Untitled_%28Still_life%29_%281913%29_-_Amadeo_Souza-Cardoso_%281887-1918%29_%2817385824283%29.jpg",
    name: "amadeo_style_life",
  },
  {
    url: "/images/Derkovits_Gyula_Talig%C3%A1s_1920.jpg",
    name: "derkovtis_talig",
  },
  {
    url: selectStyleImg1,
    name: "test name",
  },
  {
    url: selectStyleImg2,
    name: "test name",
  },
  {
    url: selectStyleImg3,
    name: "test name",
  },
  {
    url: selectStyleImg4,
    name: "test name",
  },
  {
    url: selectStyleImg5,
    name: "test name",
  },
  {
    url: selectStyleImg6,
    name: "test name",
  },
  {
    url: selectStyleImg7,
    name: "test name",
  },
  {
    url: selectStyleImg8,
    name: "test name",
  },
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
  const [step, setStep] = useState(1);

  const updateStyleImageCallback = (styleImageUrl: string) => {
    setState({
      ...state,
      styleImage: styleImageUrl,
    });
  };

  const updateImageToStyleCallback = (imageToStyle: string) => {
    setState({
      ...state,
      imageToStyle: imageToStyle,
    });
  };

  console.log(state.imageToStyle, state.styleImage);

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
                setLoading(false);
                setStep(2);
              }
            };

            var stylizeImage = async () => {
              setLoading(true);
              let canvas1 = document.querySelector(
                "#canvasContainer1"
              ) as HTMLCanvasElement;
              let canvas2 = document.querySelector(
                "#canvasContainer2"
              ) as HTMLCanvasElement;

              let styleImageP = loadImage(state.styleImage);
              let imageToStyleP = loadImage(state.imageToStyle);

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
                  setLoading(false);
                  console.error(err);
                });
            };
          }
          return (
            <div className="home_container mx-auto font-theme">
              {step === 1 && (
                <>
                  <UploadImage
                    isLoading={loading}
                    image={state.imageToStyle}
                    predefinedStylesList={predefinedStylesList}
                    setStateCallback={updateImageToStyleCallback}
                    setStyleImageCallback={updateStyleImageCallback}
                  />
                  <Button onClick={() => stylizeImage()}>GENERATE</Button>
                </>
              )}

              <section
                className={`bg-white font-theme ${
                  step === 2 ? "block" : "hidden"
                }`}
              >
                {state.mode == "photo" && (
                  <PhotoDisplay
                    styleImageUrl={state.styleImage}
                    imageToStyleUrl={state.imageToStyle}
                    doStyleTransferCallback={doStyleTransfer}
                    setStep={setStep}
                  />
                )}
              </section>
            </div>
          );
        }}
      </FastStyleTransferModel>
    </>
  );
};

export default HomePage;
