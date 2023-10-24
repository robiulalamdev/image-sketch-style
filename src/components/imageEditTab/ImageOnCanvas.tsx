import React from 'react'
import Select from 'react-select'

const ImageOnCanvas = ({ options1, imageSizeBtn }) => {
    return (
        <div className={"save_continue_function pe-lg-4"}>
            <div className='select_orientation mb-5'>
                <h3 className='text-black fw-medium fs-18 mb-4'>
                    Select Orientation
                </h3>
                <div className="image_format_option">
                    <Select options={options1}
                        placeholder={"Select Format"}
                        styles={{
                            placeholder: (baseStyles, state) => ({
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
                                backgroundColor: "white"
                            }),

                            ValueContainer: (baseStyles) => ({
                                ...baseStyles,
                                fontSize: "10px"
                            })
                        }}
                    />
                </div>
            </div>
            <div className="select_canvas">
                <h3 className='text-black fw-medium fs-18 mb-4'>
                    Select Canvas Size
                </h3>

                <div className="canvas_size d-flex flex-wrap gap-2 gap-lg-5">
                    {
                        imageSizeBtn.map((sizeBtn, index) => (
                            <button className='text-center' key={index} style={{ maxWidth: '145px', width: '100%', height: '90px' }}>
                                <p className='fs-15 fw-medium text-black31'>
                                    {sizeBtn.size}
                                </p>
                                <p className='text-gray7b'>
                                    {sizeBtn.price}
                                </p>
                            </button>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default ImageOnCanvas