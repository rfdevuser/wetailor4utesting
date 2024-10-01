"use client";
import { GET_FABRIC_PRODUCTS } from '@/utils/gql/GQL_QUERIES';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';

const FabricLandingPage = () => {
    const Shimmer = () => (
        <div className="flex flex-cols  gap-4 p-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-full justify-center sm:w-1/2 md:w-1/3 lg:w-full h-40 bg-gray-200 rounded-md overflow-hidden relative flex-shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
              <div className="w-full h-20 lg:h-40 bg-gray-300"></div>
              <div className="p-2">
                <div className="w-full h-6 bg-gray-300 mb-2"></div>
                <div className="w-3/4 h-4 bg-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
      );
      

  const queryVariables = {
    firstt: 6,
    cat: "Lining Fabric",
    mafter: null,
  };

  const { loading, error, data } = useQuery(GET_FABRIC_PRODUCTS, {
    variables: queryVariables,
  });

  const queryVariables1 = {
    firstt: 6,
    cat: "fabric_swatch",
    mafter: null,
  };

  const { loading: mainfabricloading, error: mainfabricerror, data: mainfabricdata } = useQuery(GET_FABRIC_PRODUCTS, {
    variables: queryVariables1,
  });

  const Shop = ({ id, name, price, image, slug }) => (
    <Link href={`/SingleFabricDescriptionPage?id=${slug}`} as={`/SingleFabricDescriptionPage/${slug}`}>
      <div className="w-full h-full rounded-md overflow-hidden">
        <img
          className="w-full h-20 lg:h-40 object-cover"
          src={image}
          alt={name}
        />
       <div className="p-2 text-center">
        <h2 className="hidden lg:block text-sm font-semibold truncate">{name.split('-')[0]}</h2>
      </div>
      </div>
    </Link>
  );

  return (
    <>
      <div className='text-md lg:text-2xl text-left p-4 mt-8'>Glimpse of our fabric store</div>
      <div className='flex flex-cols'>
        <div className='w-full md:w-1/2 p-2 bg-[#f3f4f6] mx-1 rounded-r-xl '>
          <Link href='/Lining_Store'>
            <div className='flex justify-center p-2 text-[#1e40af]'><u><b>Lining Fabric Store</b></u></div>
          </Link>
          <div className='grid grid-cols-2 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
            {loading ? (
              <Shimmer />
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              data?.products?.edges.map((edge) => (
                <Shop
                  key={edge.node.id}
                  id={edge.node.id}
                  name={edge.node.name}
                  price={edge.node.price}
                  image={edge.node.image.sourceUrl}
                  slug={edge.node.slug}
                />
              ))
            )}
          </div>
        </div>

        <div className='w-full md:w-1/2 p-2 bg-[#fafaf9] mx-1 rounded-s-lg '>
          <Link href='/Fabric_Store'>
            <div className='flex justify-center p-2 text-[#1e40af]'><u><b>Main Fabric Store</b></u></div>
          </Link>
          <div className='grid grid-cols-2 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
            {mainfabricloading ? (
              <Shimmer />
            ) : mainfabricerror ? (
              <p>Error: {mainfabricerror.message}</p>
            ) : (
              mainfabricdata?.products?.edges.map((edge) => (
                <Shop
                  key={edge.node.id}
                  id={edge.node.id}
                  name={edge.node.name}
                  price={edge.node.price}
                  image={edge.node.image.sourceUrl}
                  slug={edge.node.slug}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default FabricLandingPage;
