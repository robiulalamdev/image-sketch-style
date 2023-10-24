import React, { useState } from 'react'


const ImageEditTabBtn = ({ activeTab, setActiveTab }) => {
    return (
        <div>
            <div className="potrait_position d-flex align-items-center justify-content-between">
                <button onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'btn-1 border-0 text-white px-3 py-2' : 'bg-white border-0 px-3 py-2'}>
                    Digital Image
                </button>
                <button onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'btn-1 border-0 text-white px-3 py-2' : 'bg-white border-0 px-3 py-2'}>
                    Image On Canvas
                </button>
            </div>
        </div>
    )
}

export default ImageEditTabBtn