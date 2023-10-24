import React, { useState } from "react";
import "./UploadImage.css";
import dragIcon from "../../assets/images/drag.svg";
import { AiOutlineClose } from "react-icons/ai";
import ImageStyles from "./ImageStyles";
import Loader from "../../assets/images/loader.gif";

const imgThumbnail = {
  maxWidth: 195,
  height: 195,
};

const colseBtn = {
  top: 10,
  right: 10,
};

const UploadImage = ({
  isLoading,
  image,
  predefinedStylesList,
  setStateCallback,
  setStyleImageCallback,
}) => {
  const [file, setFile] = useState(null);

  const removeFile = () => {
    setFile(null);
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataURL = reader.result;
        setStateCallback(dataURL);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  function bytesToKB(bytes) {
    return (bytes / 1024).toFixed(2);
  }
  return (
    <section id="font-theme">
      <div className="seciton_heading mb-3">
        <h6 className="text-black fw-semibold fs-18 text-center">
          Upload Image
        </h6>
      </div>
      <div className="upload_image-container">
        <div className="drop_image relative">
          <div className="text-center">
            <img src={dragIcon} className="mb-3" alt="icon" />
            <h6 className="font-theme">Drag & Drop</h6>
            <p className="fs-12 text-black fw-normal mb-3 font-theme">or</p>
          </div>
          <div className="file-input text-center">
            <input
              type="file"
              onChange={handleImageChange}
              className="opacity-0"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: 500,
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            />
            {/* file-input__input */}
            <label
              className="file-input__label font-theme"
              htmlFor="file-input"
            >
              <span>Browse Files</span>
            </label>
          </div>
        </div>

        {/*  section image list */}
        {file && (
          <div className="image-list-container w-full">
            <div className="" style={{ display: "flex", gap: "10px" }}>
              <div style={imgThumbnail} className="relative">
                <img
                  src={file && URL.createObjectURL(file)}
                  className="img-fluid"
                  style={{ width: "200px" }}
                  alt=""
                />
                <button
                  onClick={() => removeFile()}
                  className="close-btn"
                  style={colseBtn}
                >
                  <AiOutlineClose />
                </button>
              </div>

              <div
                className="file-info text-left "
                style={{ marginLeft: "5px" }}
              >
                <div className="mb-2 font-theme text-gray">{file?.name}</div>
                <p className="mt-1 font-theme text-gray">
                  {bytesToKB(file?.size)} KB
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="loader text-center">
          <img src={Loader} style={{ width: "374px" }} alt="loader" />
          <h2 className="fs-25 fw-bold text-black mb-4">
            Your Images are being generated!
          </h2>
          <p className="fs-18 fw-medium text-black6c">Pls wait for a moment</p>
        </div>
      ) : (
        <ImageStyles
          image={image}
          predefinedStylesList={predefinedStylesList}
          setStyleImageCallback={setStyleImageCallback}
        />
      )}
    </section>
  );
};

export default UploadImage;
