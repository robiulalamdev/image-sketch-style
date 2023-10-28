// import { Button, Card, Grid } from "@mui/material";
import styles from "../photoDisplay/photo.module.css";
import "../photoDisplay/ImageEdit.css";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import ImageEdit from "../imageEdit/ImageEdit";
import React, { useState } from "react";
// import ImageEditTabBtn from "../imageEdit/ImageEditTabBtn";
// import { GrRotateLeft, GrRotateRight } from "react-icons/gr";
// import DigitalImage from "../imageEditTab/DigitalImage";
// import ImageOnCanvas from "../imageEditTab/ImageOnCanvas";

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
  styleImageUrl?: string | undefined;
  imageToStyleUrl?: string;
  doStyleTransferCallback: (
    imageToStyle: ImageData,
    styleImage: HTMLImageElement,
    canvasDest: HTMLCanvasElement
  ) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

//let styleImage: HTMLImageElement;

const SinglePhotoDisplay = ({
  styleImageUrl,
  imageToStyleUrl,
  doStyleTransferCallback,
  setStep,
}: Props) => {
  const [rotation, setRotation] = useState(0);

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
      doStyleTransferCallback(imageToStyleImgData, styleImage, targetCanvas);
    }
  };

  console.log("styleImageUrl:" + resizeAndStylizeImage);

  const handleDownloadImage = () => {
    let imageCanvas = document.querySelector(
      "#canvasContainer2"
    ) as HTMLCanvasElement;

    let imageCanvasCtx = imageCanvas.getContext("2d");

    let downloadImgData = imageCanvasCtx?.getImageData(
      0,
      0,
      imageCanvas.width,
      imageCanvas.height
    );

    if (downloadImgData) {
      const dataURL = imageCanvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "image.png";
      a.click();
    }
  };

  return (
    <>
      <div className="w-50">
        <canvas id="canvasContainer1" className={styles.canvasHidden} />
        <div key="canvasContainer2">
          <div
            className={styles.card}
            style={{
              transform: `rotate(${rotation}deg)`,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          >
            <canvas id="canvasContainer2" className={styles.canvasPhoto} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePhotoDisplay;
