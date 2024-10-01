"use client"
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ShoppingCard from '@/components/Assests/ShoppingCard';
// import ShoppingCardShimmer from '@/components/Assests/ShoppingCardShimmer';
import { GET_PRODUCTS } from '@/utils/gql/GQL_QUERIES';
import ShoppingCardShimmer from '@/components/Assests/ShimmerShoppingCard.js';
import Image from 'next/image';

const MTM_Blouses = () => {
  
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      cat: "made-to-measure-blouses",
      mafter: null,
    },
  });

  return (
    <>
  
      {loading ? (
        <ShoppingCardShimmer count={data ? data.products.edges.length : 15} />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4  bg-white">
          {data && data.products && data.products.edges.map((edge, index) => (
            <ShoppingCard
              key={index}
              id={edge.node.id}
              name={edge.node.name}
              price={edge.node.price}
              image={edge.node.image.sourceUrl}
              // variationImages={edge.node.variations ? edge.node.variations.nodes.map(variation => variation.image.sourceUrl) : []}
            />
          ))}
        </div>
        </div>
      )}
    </>
  );
}

export default MTM_Blouses;
