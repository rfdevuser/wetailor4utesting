"use client"
import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { B2BcardData } from '@/Data/B2Bdata';
import Link from 'next/link';
import Image from 'next/image';

const CardCarousel = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
    <div className="relative  bg-white p-4">
          <div className="hidden lg:block">
        <h2 className="text-center text-2xl font-bold mb-4">WholeSale Categories</h2>
        <div className="flex justify-center flex-wrap gap-4 mb-4">
          {B2BcardData.map((card, index) => (
              <Link
              key={card.id}
              href={`/B2BsubCategoryPage?id=${card.id}`}
              as={`/B2BsubCategoryPage/${card.id}`}
            >
   <span
              key={index}
              className="bg-white text-black px-4 py-2 rounded-lg text-lg font-medium border-2 border-gray-200 
                         transition-transform transform hover:scale-105 hover:shadow-lg hover:border-gray-300
                         ease-in-out duration-300"
            >
              {card.title}
            </span>
            </Link>
          ))}
        </div>
      </div>
      
      <Slider {...settings}>
        {B2BcardData.map((card) => (
          <Link
            key={card.id}
            href={`/B2BsubCategoryPage?id=${card.id}`}
            as={`/B2BsubCategoryPage/${card.id}`}
          >
            <div
              className="relative group cursor-pointer
                         bg-white p-4 rounded-lg shadow-lg
                         transition-transform transform hover:scale-105"
            >
              <Image
                src={card.image}
                alt={card.title}
                height={600}   // Increase height
                width={600}    // Increase width
                loading='lazy'
                className="w-full h-60 object-cover rounded-lg shadow-md"
              />
              <div className="text-center mt-3 font-semibold text-lg">{card.title}</div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default CardCarousel;
