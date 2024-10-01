"use client"
import React from 'react';
import './style.css'; 
import Card from '../Assests/Card';
import Image from 'next/image';



const cardData = [
  {
    title: 'Beauty and Spa',
    image: '/landingPageB2B/beautyandspablue.jpg',
    subcategories: [
      { name: 'Spa Treatments', link: '/spa-treatments' },
      { name: 'Massage Therapy', link: '/massage-therapy' },
      { name: 'Facial Services', link: '/facial-services' }
    ],
  },
  {
    title: 'Hospital',
    image: '/landingPageB2B/hospitalblue.jpg',
    subcategories: [
      { name: 'Emergency Services', link: '/emergency-services' },
      { name: 'Outpatient Care', link: '/outpatient-care' },
      { name: 'Outpatient Care', link: '/outpatient-care' },
      { name: 'Outpatient Care', link: '/outpatient-care' },
      { name: 'Outpatient Care', link: '/outpatient-care' },
      { name: 'Outpatient Care', link: '/outpatient-care' },
      { name: 'Outpatient Care', link: '/outpatient-care' },
      { name: 'Outpatient Care', link: '/outpatient-care' },
      { name: 'Outpatient Care', link: '/outpatient-care' },
      { name: 'Outpatient Care', link: '/outpatient-care' },
      { name: 'Outpatient Care', link: '/outpatient-care' },
      
      { name: 'Inpatient Services', link: '/inpatient-services' }
    ],
  },
  {
    title: 'Hotel',
    image: '/landingPageB2B/hotelblue.jpg',
    subcategories: [
      { name: 'Luxury Suites', link: '/luxury-suites' },
      { name: 'Standard Rooms', link: '/standard-rooms' },
      { name: 'Conference Rooms', link: '/conference-rooms' }
    ],
  },
  {
    title: 'Nursing Facility',
    image: '/landingPageB2B/nursingblue.jpg',
    subcategories: [
      { name: 'Long-term Care', link: '/long-term-care' },
      { name: 'Rehabilitation Services', link: '/rehabilitation-services' },
      { name: 'Respite Care', link: '/respite-care' }
    ],
  },
  {
    title: 'Restaurant',
    image: '/landingPageB2B/resturantblue.jpg',
    subcategories: [
      { name: 'Fine Dining', link: '/fine-dining' },
      { name: 'Casual Dining', link: '/casual-dining' },
      { name: 'Fast Food', link: '/fast-food' }
    ],
  },
  {
    title: 'Corporate Office',
    image: '/landingPageB2B/corporateblue.jpg',
    subcategories: [
      { name: 'Executive Offices', link: '/executive-offices' },
      { name: 'Open Workspace', link: '/open-workspace' },
      { name: 'Meeting Rooms', link: '/meeting-rooms' }
    ],
  },
  {
    title: 'School',
    image: '/landingPageB2B/schoolblue.jpg',
    subcategories: [
      { name: 'Elementary', link: '/elementary' },
      { name: 'Middle School', link: '/middle-school' },
      { name: 'High School', link: '/high-school' }
    ],
  },
  {
    title: 'College Campus',
    image: '/landingPageB2B/schoolblue.jpg',
    subcategories: [
      { name: 'Undergraduate Programs', link: '/undergraduate-programs' },
      { name: 'Graduate Programs', link: '/graduate-programs' },
      { name: 'Campus Facilities', link: '/campus-facilities' }
    ],
  },
];

 
const Hero = () => {
    
  return (
   <>
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
