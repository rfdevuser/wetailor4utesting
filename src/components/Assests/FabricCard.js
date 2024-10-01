"use client"
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const FabricCard = ({ image, name, slug , price ,setSingleProduct
}) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const displayName = name.split('-')[0];
  const handleOnClick=()=>{
   
    setSingleProduct(slug)
  }
  
  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Stop observing after visibility is detected
      }
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  if (cardRef.current) {
    observer.observe(cardRef.current);
  }

  return () => {
    if (cardRef.current) {
      observer.unobserve(cardRef.current);
    }
  };
}, []);
  return (
    <Link href={`/SingleFabricDescriptionPage?id=${slug}`} as={`/SingleFabricDescriptionPage/${slug}`}>
    <div
      ref={cardRef}
      className={`relative w-full h-auto max-w-xs rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 ${isVisible ? 'card-visible' : 'card-hidden'}`}
      onClick={handleOnClick}
    >
      <div className="relative group cursor-pointer overflow-hidden duration-500 bg-white text-gray-50 p-4 mt-4 transform hover:scale-105 hover:shadow-lg transition-transform">
        <div
          className="relative w-full bg-cover bg-center bg-no-repeat rounded-lg transition-transform duration-300 group-hover:scale-110 sm:group-hover:scale-105 md:group-hover:scale-110 lg:group-hover:scale-110"
          style={{
            backgroundImage: `url('${image}')`,
            paddingBottom: '100%', // Makes the image container square
          }}
        />
        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-t from-[#000000] to-[#ec4899] text-center flex justify-center mt-3">
          {displayName}
        </span>
        <p className="absolute top-2 left-2 bg-[#831843] text-white px-2 py-1 text-xs rounded-lg z-20 font-medium">
          {price} Per Meter
        </p>
        <div className="absolute w-full left-0 p-4 -bottom-12 duration-500 group-hover:-translate-y-12 transition-transform">
          <div className="absolute -z-10 left-0 w-full h-full opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-white rounded-lg transition-opacity"></div>
        </div>
      </div>
    </div>
  </Link>

  );
};

export default FabricCard;
