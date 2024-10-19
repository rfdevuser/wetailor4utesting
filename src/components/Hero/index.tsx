"use client"
import React from 'react';
import './style.css'; 
import Card from '../Assests/Card';
import Image from 'next/image';
import Link from 'next/link';




 
const Hero = () => {
    
  return (
   <>
   <div className='flex justify-center mt-6'>
    <Link href='/CustomerRoom'>
<button className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-6 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg">
Your Personal Room
</button></Link>
</div>

   <div className=' relative z-10 mt-6 p-4'>
    <Image 
    src='/Backgrounds/landing.jpg'
    alt='Landing Page Poster'
    height={500}
    width={2000}
    loading='lazy'
    />
    </div></>
  );
};

export default Hero;
