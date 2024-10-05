"use client"
import React, { useEffect, useState } from 'react';
import { B2BcardData } from '@/Data/B2Bdata';
import Link from 'next/link';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[]; // Specify that images is an array of strings
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  
  useEffect
  (() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    },3000); // Change image every 1000 ms (1 second)

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [images.length]);

  return (
    <div className='flex justify-center rounded-sm'>
      <Image
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
        width={200} // Adjust as needed
        height={200} // Adjust as needed
      />
    </div>
  );
};
const B2BsubCategoryPage = ({ params }: { params: { id: string } }) => {
  // Find the category with the matching id
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const category = B2BcardData.find(cat => cat.id.toString() === params.id);
  
  // Get subcategories if category is found
  const subcategories = category ? category.subcategories : [];
  const handleCategoryClick = (id:any) => {
    setSelectedCategoryId(id);
    
  };
  return (
    <div className="flex flex-col lg:flex-row bg-white h-full">
      {/* Sidebar for category list */}
      <div className="w-full lg:w-1/3 p-4 bg-gradient-to-br from-[#ffffff] to-[#d4dfed] border-b lg:border-b-0 lg:border-r border-gray-300">
      <h2 className="text-xl font-semibold mb-4 text-black flex justify-center">Categories</h2>
      <ul className="space-y-2">
        {B2BcardData.map(cat => (
          <li key={cat.id} className={`p-2 rounded ${selectedCategoryId === cat.id ? 'bg-[#d4d4d4]' : 'hover:bg-[#d4d4d4]'}`}>
            <Link href={`/B2BsubCategoryPage?id=${cat.id}`} as={`/B2BsubCategoryPage/${cat.id}`}>
              <div 
                className="text-black hover:underline cursor-pointer"
                onClick={() => handleCategoryClick(cat.id)} // Set the selected category on click
              >
                {cat.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>

      {/* Main content for subcategories */}
      <div className="w-full lg:w-2/3 p-4 mt-6 mb-3 ">
        {category ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-gray-900 flex justify-center">{category.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {subcategories.map(sub => (
                <div key={sub.slug} className="bg-gradient-to-br from-[#ffffff] to-[#d4dfed] border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow ">
                  <h3 className="text-lg text-gray-700 font-semibold mb-2 flex justify-center">{sub.name}</h3>
                  <Link href={`/B2BCategory?id=${sub.slug}`} as={`/B2BCategory/${sub.slug}`}>
                  <ImageCarousel images={Array.isArray(sub.image) ? sub.image : [sub.image]} />
                  </Link>
                  <Link href={`/B2BCategory?id=${sub.slug}`} as={`/B2BCategory/${sub.slug}`}>
                    <span className="text-blue-600 hover:underline flex justify-center">View Details</span>
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-600">No category found.</p>
        )}
      </div>
    </div>
  );
};



export default B2BsubCategoryPage