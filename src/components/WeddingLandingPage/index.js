"use client"
import { GET_PRODUCTS } from '@/utils/gql/GQL_QUERIES';
import { useQuery } from '@apollo/client';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



const Shimmer = () => (
  <div className="flex   gap-4 p-4">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="w-full sm:w-40 md:w-44 lg:w-50 h-40 bg-gray-200 rounded-md overflow-hidden relative flex-shrink-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        <div className="w-full h-32 bg-gray-300"></div>
        <div className="p-4">
          <div className="w-3/4 h-6 bg-gray-300 mb-2"></div>
          <div className="w-1/2 h-4 bg-gray-300"></div>
        </div>
      </div>
    ))}
  </div>
);





const Shop = ({ id, name, price, image }) => (
  <Link href={`/SingleBlouseDescriptionPage?id=${name}`} as={`/SingleBlouseDescriptionPage/${name}`}>
  <div className=" ">
    <img className="card-image border-2 border-gray-200 rounded-md" src={image} alt={name} />
    <div className="card-content">
      <h2 className="text-center text-sm ">{name.split('-')[0]}</h2>
  

    </div>
  </div>
  </Link>
);
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
     height={300}
     width={300}
     loading='lazy'
            className='object-cover '
     />
   </Link>
  )
}

const WeddingLandingPage = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {

      cat: "made-to-measure-blouses",
      mafter: null,
    },
  });
  // if (loading) return <Shimmer />;
  if (error) return <p>Error: {error.message}</p>;

  // Extract the first 5 products
  const products = data?.products?.edges.slice(0, 6) || [];
  return (
    <>
      <div className='text-md lg:text-2xl mt-6 text-center mb-8 '>The Dress of Your Dreams for the Day of Your Dreams.</div>
      <div className='flex flex-col lg:flex-row'>
        <div className='w-full lg:w-2/4 flex justify-center p-3'>
          <Image
            src='/Backgrounds/wedding/WeddingDiariesNOBG.png'
            alt='wedding poster'
            height={700}
            width={1200}
            loading='lazy'
            className='object-cover ' // Ensures the image covers its container properly
          />
        </div>

        <div className='w-full lg:w-2/4 flex items-center justify-center'>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
  <Card image="/Backgrounds/wedding/haldi1.png" id='haldi'/>
  <Card image="/Backgrounds/wedding/mehendi1.png" id='mehendi'/>
  <Card image="/Backgrounds/wedding/reception1.png" id='reception'/>
  <Card image="/Backgrounds/wedding/sangeet1.png" id='sangeet'/>
  <Card image="/Backgrounds/wedding/wedding1.png" id='wedding'/>
  <Card image="/Backgrounds/wedding/engagement1.png" id='engagement'/>

</div>

        </div>
      </div>
      <div className=' bg-[#f4f4f5] mt-4'>
      <div className='text-md lg:text-2xl text-left p-4'>Timeless Fashion, Modern Comfort: Customise Your Ideal Blouse</div>
      <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6  gap-4 p-4">
        {loading ? (
          <Shimmer />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          products.map((edge) => (
            <Shop
              key={edge.node.id}
              id={edge.node.id}
              name={edge.node.name}
              price={edge.node.price}
              image={edge.node.image.sourceUrl}
            />
          ))
        )}

      </div>
      <div className='flex justify-center text-blue-800 mb-6'>
        <Link href='/MTM_Blouse'><u>View more ⬇️</u></Link>
      </div>
      </div>
    </>
  )
}

export default WeddingLandingPage
