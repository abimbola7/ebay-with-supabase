"use client"

import React from 'react';
import  { Carousel, CarouselProps } from "react-responsive-carousel"
import 'react-responsive-carousel/lib/styles/carousel.min.css';




const MyCarousel:React.FC = () => {
    return (
        <div className=''>
            <Carousel 
            showArrows={true}
            autoPlay={true} 
            interval={3000} 
            infiniteLoop={true}
            showThumbs={false}
            >  
                {[
                    <div key="1">
                        <img src="/images/banner/1.png" alt="Image 1" />
                    </div>,
                    <div key="2">
                        <img src="/images/banner/2.png"alt="Image 2" />
                    </div>,
                    <div key="3">
                        <img src="/images/banner/3.png" alt="Image 3" />
                    </div>
                ]}
            </Carousel>
        </div>
    );
};

export default MyCarousel;