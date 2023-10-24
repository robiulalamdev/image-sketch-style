import React, { useState } from 'react';
import './ImageStyles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import sliderImg1 from '../../assets/images/slider1.svg';
import sliderImg2 from '../../assets/images/slider2.svg';
import sliderImg3 from '../../assets/images/slider3.svg';
import sliderImg4 from '../../assets/images/slider4.svg';
import sliderImg5 from '../../assets/images/slider5.svg';
import sliderImg6 from '../../assets/images/slider6.svg';
import sliderImg7 from '../../assets/images/slider7.svg';
import sliderImg8 from '../../assets/images/slider8.svg';
import sliderImg9 from '../../assets/images/slider9.svg';
import sliderImg10 from '../../assets/images/slider10.svg';
import sliderImg11 from '../../assets/images/slider11.svg';
import sliderImg12 from '../../assets/images/slider12.svg';
import selectStyleImg1 from '../../assets/images/selectstyle1.svg';
import selectStyleImg2 from '../../assets/images/selectstyle2.svg';
import selectStyleImg3 from '../../assets/images/selectstyle3.svg';
import selectStyleImg4 from '../../assets/images/selectstyle4.svg';
import selectStyleImg5 from '../../assets/images/selectstyle5.svg';
import selectStyleImg6 from '../../assets/images/selectstyle6.svg';
import selectStyleImg7 from '../../assets/images/selectstyle7.svg';
import selectStyleImg8 from '../../assets/images/selectstyle8.svg';
import selectStyleImg9 from '../../assets/images/selectstyle9.svg';
import selectStyleImg10 from '../../assets/images/selectstyle10.svg';
import selectStyleImg11 from '../../assets/images/selectstyle11.svg';
import Loader from '../../assets/images/loader.gif'
import { Link } from 'react-router-dom';
import NextArrow from '../nextArrow/NextArrow';
import PrevArrow from '../prevArrow/PrevArrow';
import { useNavigate } from "react-router-dom";

const SliderInfo = [
    {
        sliderImg: sliderImg1,
        sliderName: 'Gothic',
        slidername2: 'Architecture'
    },
    {
        sliderImg: sliderImg2,
        sliderName: 'Pop',
        slidername2: 'Cubism'
    },
    {
        sliderImg: sliderImg3,
        sliderName: 'Impressionist',
        slidername2: 'Beach'
    },
    {
        sliderImg: sliderImg4,
        sliderName: 'neoclassic',
        slidername2: 'fountain'
    },
    {
        sliderImg: sliderImg5,
        sliderName: 'post-impressionist',
        slidername2: 'haystacks'
    },
    {
        sliderImg: sliderImg6,
        sliderName: 'realist',
        slidername2: 'pears'
    },
    {
        sliderImg: sliderImg7,
        sliderName: 'renaissance',
        slidername2: 'monks'
    },
    {
        sliderImg: sliderImg8,
        sliderName: 'surrealist',
        slidername2: 'astrology'
    },
    {
        sliderImg: sliderImg9,
        sliderName: 'surrealist',
        slidername2: 'forest'
    },
    {
        sliderImg: sliderImg10,
        sliderName: 'abstract',
        slidername2: 'expressionist'
    },
    {
        sliderImg: sliderImg11,
        sliderName: 'baroque',
        slidername2: 'marketplace'
    },
    {
        sliderImg: sliderImg12,
        sliderName: 'romantic',
        slidername2: 'pasture'
    },
    {
        sliderImg: sliderImg1,
        sliderName: 'Gothic',
        slidername2: 'Architecture'
    },
    {
        sliderImg: sliderImg2,
        sliderName: 'Pop',
        slidername2: 'Cubism'
    },
    {
        sliderImg: sliderImg3,
        sliderName: 'Impressionist',
        slidername2: 'Beach'
    },
    {
        sliderImg: sliderImg4,
        sliderName: 'neoclassic',
        slidername2: 'fountain'
    }
]

const SliderInfo1 = [
    {
        sliderImg: selectStyleImg1,
        sliderName: 'abstract',
        slidername2: 'lines',
    },

    {
        sliderImg: selectStyleImg2,
        sliderName: 'baroque',
        slidername2: 'river',
    },

    {
        sliderImg: selectStyleImg3,
        sliderName: 'expressionist',
        slidername2: 'tree',

    },
    {
        sliderImg: selectStyleImg4,
        sliderName: 'impressionist',
        slidername2: 'park',
    },

    {
        sliderImg: selectStyleImg5,
        sliderName: 'expressionist',
        slidername2: 'tree',
    },
    {
        sliderImg: selectStyleImg6,
        sliderName: 'expressionist',
        slidername2: 'windmill',
    },
    {
        sliderImg: selectStyleImg7,
        sliderName: 'impressionist',
        slidername2: 'lighthouse',
    },
    {
        sliderImg: selectStyleImg8,
        sliderName: 'neoclassic',
        slidername2: 'waterfalls',
    },
    {
        sliderImg: selectStyleImg9,
        sliderName: 'realist',
        slidername2: 'pears',
    },
    {
        sliderImg: selectStyleImg10,
        sliderName: 'impressionist',
        slidername2: 'palms',
    },
    {
        sliderImg: selectStyleImg11,
        sliderName: 'realist',
        slidername2: 'sailboat',
    },
    {
        sliderImg: selectStyleImg1,
        sliderName: 'abstract',
        slidername2: 'lines',
    },
    {
        sliderImg: selectStyleImg9,
        sliderName: 'realist',
        slidername2: 'pears',
    },

]

const ImageStyles = ({ files }) => {
    const [changeScreen, setChangeScreen] = useState(false)
    const [changeTitle, setChangeTitle] = useState(null)
    const [imageSlider, setImageSlider] = useState(SliderInfo)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const settings = {
        // className: "center",
        infinite: true,
        slidesToShow: 3,
        // speed: 500,
        // autoplay: true,
        // speed: 2000,
        // autoplaySpeed: 2000,
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
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
    };

    const clickhandler = () => {


        files.length > 0
            ? (
                setChangeScreen(true),
                setIsLoading(true),
                setImageSlider(SliderInfo1),
                setChangeTitle('Select Styles'),
                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/image-edit");

                }, 2000)
            )
            : alert('Please upload an image');

    }



    return (
        <>
            <div className='section_heading border-top py-4'>
                <h2 className='text-black fw-medium fs-18 text-center'>
                    {changeTitle ? changeTitle : 'Image Styles'}
                </h2>
            </div>

            <div className='imageStyles_slider pb-5'>
                <div>

                    {isLoading ? (
                        <div className="loader text-center">
                            <img src={Loader} style={{ width: '374px' }} alt="loader" />
                            <h2 className='fs-25 fw-bold text-black mb-4'>
                                Your Images are being generated!
                            </h2>
                            <p className='fs-18 fw-medium text-black6c'>
                                Pls wait for a moment
                            </p>
                        </div>
                    ) : (
                        <Slider {...settings}>
                            {
                                imageSlider.map((sliderItem, index) => (
                                    <div className='slider-item bg-transparent border-0 text-decoration-none' key={index} >

                                        <img className=' pointer' src={sliderItem.sliderImg}
                                            onClick={() => clickhandler()}
                                            alt="slider-img" />

                                        <h5 className='fs-15 fw-medium text-capitalize text-black'>
                                            {sliderItem.sliderName}
                                        </h5>

                                        <h5 className='fs-15 fw-medium text-capitalize text-black'>
                                            {sliderItem.slidername2}
                                        </h5>
                                    </div>
                                )
                                )
                            }
                        </Slider>
                    )}
                </div>
            </div>
        </>
    )
}

export default ImageStyles