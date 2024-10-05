"use client";
import Image from 'next/image';
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Array of image data
const imageData = [
  {
    src: '/Backgrounds/Festival/festivefamily.png',
    alt: 'Festive Family',
  },
  {
    src: '/Backgrounds/Festival/festivemen.png',
    alt: 'Festive Men',
  },
  {
    src: '/Backgrounds/Festival/festivewomen.png',
    alt: 'Festive Women',
  },
  {
    src: '/Backgrounds/Festival/festivetoddler.png',
    alt: 'Festive Toddler',
  },
  {
    src: '/Backgrounds/Festival/festivekids.png',
    alt: 'Festive Kids',
  },
];

const FestivalLandingPage = () => {
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default to 1 for mobile
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <> 
    <div className=' relative mt-6 p-4 bg-[#f1f5f9]'>
    <Image 
    src='/Backgrounds/Festival/Festivalposter.jpg'
    alt='Landing Page Poster'
    height={500}
    width={2000}
    loading='lazy'
    />
    </div>
    <div className='text-md lg:text-2xl text-left p-4 mt-8'>Sparkle and Shine: Find Your Perfect Festival Look!</div>
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-4">
      {/* Container for the festival corner image */}
      <div className="w-full lg:w-1/3 flex justify-center lg:mb-0 mb-4 lg:mb-0">
        <Image 
          src='/Backgrounds/Festival/festivalCorner.png'
          alt='Festival Corner'
          height={700}
          width={700}
          loading='lazy'
          className="object-contain"
        />
      </div>
      {/* Carousel for the images */}
      <div className="w-full lg:w-2/3 flex justify-center">
        <div className="w-full max-w-4xl">
          <Slider {...settings}>
            {imageData.map((image, index) => (
              <div key={index} className="flex justify-center items-center p-2">
                <Image 
                  src={image.src}
                  alt={image.alt}
                  height={250}
                  width={250}
                  loading='lazy'
                  className="object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
    </>
  );
};

export default FestivalLandingPage;
