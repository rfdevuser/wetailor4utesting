"use client"
import { GET_PRODUCTS } from '@/utils/gql/GQL_QUERIES';
import { useQuery } from '@apollo/client';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'






// Ensure width and height classes are valid Tailwind classes
const Card = ({image , id}) => {

  return (
    // <div className='w-60 h-60 bg-red-200 border-2 border-black mt-8'>
    <Link
    key={id}
    href={`/WeddingCategoryPage?id=${id}`}
    as={`/WeddingCategoryPage/${id}`}
  >
     <Image
     src={image}
     alt='Loading image'
     height={250}
     width={250}
     loading='lazy'
            className='object-cover '
     />
   </Link>
  )
}

const CelebrationLandingPage = () => {
  
  return (
    <>
    <div className='bg-gray-50 shadow-md'>
      <div className='text-md lg:text-2xl text-center mb-2 mt-4 p-2'>Making Every Celebration a Little Extra Special!</div>
      <div className='flex flex-col lg:flex-row'>
      <div className=' w-full lg:w-2/4 flex justify-center p-3'>
          <Image
            src='/Backgrounds/celebration/celebration1.png'
            alt='celebration poster'
            height={700}
            width={800}
            loading='lazy'
            className='object-cover rounded-xl ' // Ensures the image covers its container properly
          />
        </div>
        <div className='w-full lg:w-2/4 flex items-center justify-center'>
        <div className="grid grid-cols-2 gap-4">
  <Card image="/Backgrounds/celebration/birthday.png" id='haldi'/>
  <Card image="/Backgrounds/celebration/mundan.png" id='mehendi'/>
  <Card image="/Backgrounds/celebration/namkaran.png" id='reception'/>
  <Card image="/Backgrounds/celebration/thread ceremony.png" id='sangeet'/>


</div>

        </div>
       

      </div>
 
      </div>
    </>
  )
}

export default CelebrationLandingPage
