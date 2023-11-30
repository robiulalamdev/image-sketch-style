/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Grid } from "@mui/material";
import styles from "./photo.module.css";
import "./ImageEdit.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ImageEdit from "../imageEdit/ImageEdit";
import React, { useState, useEffect } from "react";
import ImageEditTabBtn from "../imageEdit/ImageEditTabBtn";
import { GrRotateLeft, GrRotateRight } from "react-icons/gr";
import DigitalImage from "../imageEditTab/DigitalImage";
import ImageOnCanvas from "../imageEditTab/ImageOnCanvas";

import watermarkLogo from "../../assets/watermark.png"

const options = [
  { value: "PNG ", label: "PNG " },
  { value: "JPEG", label: "JPEG" },
  { value: "GIF", label: "GIF" },
];

const options1 = [
  { value: "Horizontal ", label: "Horizontal" },
  { value: "Potrait", label: "Potrait" },
];

const rotateStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
};

const imageRoationCss = {
  width: "900",
  height: "700",
  overflow: "hidden",
};

const imageSizeBtn = [
  {
    size: "3'8'' X 2'2''",
    price: "$50.00",
  },
  {
    size: "1'8'' X 12''",
    price: "$25.00",
  },
  {
    size: "9’8’’ X 3’2’’",
    price: "$30.00",
  },
  {
    size: "7’8’’ X 4’2’’",
    price: "$20.00",
  },
  {
    size: "15’8’’ X 6’2’’",
    price: "$100.00",
  },
  {
    size: "5’8’’ X 3’2’’",
    price: "$11.00",
  },
  {
    size: "8’8’’ X 1’2’’",
    price: "$20.00",
  },
  {
    size: "15’8’’ X 1’2’’",
    price: "$10.00",
  },
];

type Props = {
  canvasData: { canvasA: number; canvasB: number };
  handleBack: any;
};

const PhotoDisplay = ({ canvasData, handleBack }: Props) => {
  const [withWatermark, setWithWatermark] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [imageURL, setImageURL] = useState("");

  const generateWatermarkedDataURL = async (imageCanvas: HTMLCanvasElement, watermarkLogo: string, downloadFormat: boolean): Promise<string> => {
    const imageCanvasCtx = imageCanvas.getContext("2d");
    const downloadImgData = imageCanvasCtx?.getImageData(
      0,
      0,
      imageCanvas.width,
      imageCanvas.height
    );
  
    if (downloadImgData) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = imageCanvas.width;
      tempCanvas.height = imageCanvas.height;
      const tempCtx = tempCanvas.getContext('2d');
  
      // Draw the original image onto the temporary canvas
      tempCtx && tempCtx.putImageData(downloadImgData, 0, 0);
  
      if (downloadFormat) {
        // Add a watermark to the center of the temporary canvas
        const watermark = new Image();
        watermark.src = watermarkLogo;
  
        await new Promise(resolve => {
          watermark.onload = resolve;
        });
  
        // Adjust the size and opacity of the watermark as needed
        const maxWatermarkSize = Math.min(imageCanvas.width, imageCanvas.height) * 0.8;
        const aspectRatio = watermark.width / watermark.height;
        const newWatermarkWidth = Math.min(maxWatermarkSize, watermark.width);
        const newWatermarkHeight = newWatermarkWidth / aspectRatio;
  
        // Position the resized watermark at the center
        const watermarkX = (tempCanvas.width - newWatermarkWidth) / 2;
        const watermarkY = (tempCanvas.height - newWatermarkHeight) / 2;
  
        // Set the opacity of the watermark
        tempCtx && (tempCtx.globalAlpha = 0.4);
  
        // Draw the watermark
        tempCtx && tempCtx.drawImage(watermark, watermarkX, watermarkY, newWatermarkWidth, newWatermarkHeight);
  
        // Reset the global alpha to 1 for other drawings
        tempCtx && (tempCtx.globalAlpha = 1);
      }
  
      return tempCanvas.toDataURL("image/png");
    }
  
    return '';
  };
  

  useEffect(() => {
    const fetchData = async () => {
      if (canvasData?.canvasA > 0) {
        let imageCanvas = document.querySelector(
          `#canvasContainer${canvasData.canvasB}`
        ) as HTMLCanvasElement;
  
        const dataURL = await generateWatermarkedDataURL(imageCanvas, watermarkLogo, withWatermark);
        if (dataURL) {
          setImageURL(dataURL);
        }
      }
    };
  
    fetchData();
  }, [canvasData, withWatermark]);

  const handleDownloadImage =async () => {
    let imageCanvas = document.querySelector(
      `#canvasContainer${canvasData.canvasB}`
    ) as HTMLCanvasElement;
    const dataURL = await generateWatermarkedDataURL(imageCanvas, watermarkLogo,withWatermark);
    if(dataURL){
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "image.png";
      a.click();
    }else{
      alert("Something went wrong")
    }
    
  };


  // const editToUpdate = async () => {
  //   if (canvasData?.canvasA > 0) {
  //     let imageCanvas = document.querySelector(
  //       `#canvasContainer${canvasData.canvasB}`
  //     ) as HTMLCanvasElement;

  //     const dataURL = await generateWatermarkedDataURL(imageCanvas, watermarkLogo, withWatermark);
  //     if (dataURL) {
  //       setImageURL(dataURL);
  //     }
  //   }
  // };

  const rotateLeft = () => {
    setRotation((prevRotation) => prevRotation - 90);
  };

  const rotateRight = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };
  return (
    <>
      <section id="image_edit" className="text-left font-theme">
        <div className="container">
          <div className="wrapper_container bg-white">
            <div className="pb-4">
              <button
                onClick={() => {
                  handleBack();
                }}
                className="border-0 bg-transparent d-flex align-items-center gap-2 fs-18 fw-medium text-black"
              >
                <span>
                  <IoIosArrowBack />
                </span>
                Back
              </button>
            </div>

            <div className="row">
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div className={activeTab === 1 ? "border-end pe-lg-4" : ""}>
                  <div className="impression_potrait mb-5">
                    <h3 className="text-black fw-medium fs-18 mb-4">
                      impressionist portrait
                    </h3>
                    <ImageEditTabBtn
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  </div>
                  {activeTab === 0 && <DigitalImage setWithWatermark={setWithWatermark} withWatermark={withWatermark} options={options} />}
                  {activeTab === 1 && (
                    <ImageOnCanvas
                      imageSizeBtn={imageSizeBtn}
                      options1={options1}
                    />
                  )}
                </div>
              </div>

              <div className="col-lg-8">
                <div
                  className={
                    activeTab === 0
                      ? "preview_image_wrapper border-start ps-lg-4"
                      : "preview_image_wrapper ps-lg-4"
                  }
                >
                  <div
                    className="preview_image pb-4 mb-4"
                    style={imageRoationCss}
                  >
                    <div className="w-50">
                      <img
                        className={styles.card}
                        style={{
                          transform: `rotate(${rotation}deg)`,
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        src={imageURL}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="image_function_btn d-flex flex-wrap justify-content-between gap-4 gap-lg-0">
                    <div className="rotate_btn d-flex gap-4">
                      <button
                        onClick={rotateRight}
                        className="right_rotate border-0 bg-white e4 d-flex align-items-center justify-content-center"
                        style={rotateStyle}
                      >
                        <GrRotateRight />
                      </button>

                      <button
                        onClick={rotateLeft}
                        className="left_rotate border-0 bg-white e4 d-flex align-items-center justify-content-center"
                        style={rotateStyle}
                      >
                        <GrRotateLeft />
                      </button>
                    </div>

                    <div className="save_continue_btn">
                      <button
                        onClick={() => handleDownloadImage()}
                        className="save_continue_btn btn-1 border-0 text-white px-3 py-2"
                      >
                        Save & Continue <IoIosArrowForward />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PhotoDisplay;
