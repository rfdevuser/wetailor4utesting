"use client"
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

interface ShoppingCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
}

const ShoppingCard: React.FC<ShoppingCardProps> = ({ name, price, image }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const displayName = name.split('-')[0];

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
    <Link href={`/SingleBlouseDescriptionPage?id=${name}`} as={`/SingleBlouseDescriptionPage/${name}`}>
      <div
        ref={cardRef}
        className={`relative w-full h-auto max-w-xs rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 ${isVisible ? 'card-visible' : 'card-hidden'}`}
      >
        <div className="relative w-full h-full bg-white p-2 flex flex-col gap-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[#fff1f2]">
          <div
            className="relative bg-cover bg-center bg-no-repeat rounded-lg transition-transform duration-300 hover:scale-105"
            style={{ 
              backgroundImage: `url('${image}')`,
              height: '0',
              paddingBottom: '100%', // Makes the image container a square
            }}
          />
          <div className="flex flex-col gap-3 ">
            <span className="text-sm sm:text-sm md:text-xl text-gray-900 font-extrabold text-center">{displayName}</span>
            <div className="flex flex-col sm:flex-row  items-center gap-2">
              {/* <span className="text-sm sm:text-sm font-bold text-green-600">Price:</span> */}
              <span className="text-sm sm:text-lg font-semibold text-gray-800">{price}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ShoppingCard;
