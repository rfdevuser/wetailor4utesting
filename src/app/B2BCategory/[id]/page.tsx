import React from 'react'
import {B2BcatgoryImage} from '@/Data/B2BcategoryImage'
import Link from 'next/link';
const B2BCategory = ({ params }: { params: { id: string } }) => {
  // Find the category that matches the given id
  const category = B2BcatgoryImage.find(item => item.id === params.id);

  if (!category) {
    return <div className="text-center text-red-500">Category not found</div>;
  }

  return (
    <>
    <div className='flex'>
    <div className="w-full mx-auto p-6">
      <h1 className="text-xl lg:text-3xl  font-bold mb-4 flex justify-center">{category.title}</h1>
      <p className="text-md lg:text-xl mb-6">{category.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {category.image.map((imgSrc, index) => (
  <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
    <img 
      src={imgSrc} 
      alt={`${category.title} ${index + 1}`} 
      className="w-full h-68 object-cover transition-transform duration-300 hover:scale-105 border-2 border-[#1e3a8a]" 
    />
    <span className="absolute top-1 right-1 bg-white bg-opacity-75 text-black p-1 text-sm md:text-base lg:text-lg rounded">
      SAMPLE 
    </span>
  </div>
))}

      </div>
    </div>
    </div>
    <div className='flex justify-center mt-8'>
      <Link href='/chatLanguageSelectionPage'>
      <button className='bg-[#1e293b] text-white p-2 rounded-md mb-8 mx-auto'>Get more Information (Chat with us / Schedule an Appoinment)</button>
      </Link>
    </div>
    </>
  );
};

export default B2BCategory;