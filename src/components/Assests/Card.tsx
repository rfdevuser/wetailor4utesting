"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface Subcategory {
  name: string;
  link: string;
}

interface CardProps {
  title: string;
  image: string;
  subcategories: Subcategory[];
}

const Card: React.FC<CardProps> = ({ title, image, subcategories }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white mt-5 mb-10 p-5 rounded-lg shadow-lg transition-transform duration-300 z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-36 h-48 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
            loading="lazy"
          />
        </div>
        <div className="px-1 pt-2 flex flex-col items-center">
          <h2 className="font-semibold text-lg">{title}</h2>
        </div>

        <div
          className={`absolute top-full left-1/2 transform -translate-x-1/2 w-full flex justify-center items-center transition-transform duration-300 ${isHovered ? 'rotate-180' : 'rotate-0'}`}
        >
          {isHovered ? <FiChevronUp className="text-xl text-gray-600" /> : <FiChevronDown className="text-xl text-gray-600" />}
        </div>

        {isHovered && (
          <div className="submenu-container">
            <div className="submenu-content">
              {subcategories.map((subcategory, index) => (
                <a
                  key={index}
                  href={subcategory.link}
                  className="submenu-item"
                >
                  <p className="text-lg font-semibold text-gray-800">{subcategory.name}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
