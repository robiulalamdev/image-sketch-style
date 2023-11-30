/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";

const DigitalImage = ({ setWithWatermark,withWatermark, options }: any) => {
  return (
    <div className="image_settings">
      {/* <div className='impression_potrait mb-5'>
                <h3 className='text-black fw-medium fs-18 mb-4'>
                    impressionist portrait
                </h3>
                <ImageEditTabBtn />
            </div> */}

      <div className="image_format mb-5">
        <h3 className="text-black fw-medium fs-18 mb-4">Image Format</h3>
        <div className="image_format_option">
          <Select
            options={options}
            placeholder={"Select Format"}
            styles={{
              placeholder: (baseStyles) => ({
                ...baseStyles,
                fontSize: "12px",
                fontWeight: "500",
                color: "#313131",
              }),
              control: (baseStyles) => ({
                ...baseStyles,
                border: "1px solid #000",
                borderRadius: "10px",
                padding: "7px 8px",
                outlineColor: "none",
              }),

              indicatorSeparator: (baseStyles) => ({
                ...baseStyles,
                border: "0",
                backgroundColor: "white",
              }),

              ValueContainer: (baseStyles: any) => ({
                ...baseStyles,
                fontSize: "10px",
              }),
            }}
          />
        </div>
      </div>

      <div className="download_format mb-5">
        <h3 className="text-black fw-medium fs-18 mb-4">Download Format</h3>

        <div className="radio_group">
            <p onClick={()=>setWithWatermark(true)} className="mb-3">
              <input
                type="radio"
                id="withWaterMark"
                name="radio-group"
                checked={withWatermark}
              />
              <label htmlFor="withWaterMark">With watermark (free)</label>
            </p>
            <p onClick={()=>setWithWatermark(false)}>
              <input type="radio" id="withOutWaterMark" name="radio-group" checked={!withWatermark} />
              <label htmlFor="withOutWaterMark">
                Without watermark ($3.00){" "}
              </label>
            </p>
        </div>
      </div>
    </div>
  );
};

export default DigitalImage;
