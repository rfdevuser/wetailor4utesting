"use client";
import { GET_BLOUSE_PRODUCT_BY_ID } from '@/utils/gql/GQL_QUERIES';
import { useQuery } from '@apollo/client';
import React from 'react';
import SingleProductDescriptionPage from '@/components/SingleProductDescriptionPage';

const Shimmer = () => {
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse max-w-xl w-full p-8 bg-white rounded-lg shadow-md">
          <div className="h-80 bg-gray-200 mb-6 rounded-md"></div>
          <div className="h-8 w-3/4 bg-gray-300 mb-4 rounded-md"></div>
          <div className="h-8 w-1/2 bg-gray-300 mb-4 rounded-md"></div>
          <div className="h-8 w-2/3 bg-gray-300 mb-4 rounded-md"></div>
          <div className="h-8 w-5/6 bg-gray-300 mb-4 rounded-md"></div>
          <div className="h-8 w-4/5 bg-gray-300 mb-4 rounded-md"></div>
        </div>
      </div>
    );
  };
  
const SingleBlouseDescriptionPage = ({ params }: { params: { id: string } }) => {
    const idParts = params.id.split('-');
    const lastPart = idParts[idParts.length - 1];
    console.log(lastPart, "LastPart");

    const { loading, error, data } = useQuery(GET_BLOUSE_PRODUCT_BY_ID, {
        variables: {
            id: lastPart // Ensure you're using the lastPart instead of hardcoded ID
        },
    });

    if (loading) return <p><Shimmer/></p>;
    if (error) return <p>Error occurred: {error.message}</p>;

    const product = data?.product;
    console.log(product);

    return (
        <SingleProductDescriptionPage products={product} />
    );
};

export default SingleBlouseDescriptionPage;
