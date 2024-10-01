import React from 'react';

const ShoppingCardShimmer = ({ count }) => {
  // Generate an array with the desired number of shimmer cards
  const shimmerCards = Array.from({ length: count }, (_, index) => (
    <div key={index} className="w-50 h-60 bg-gradient-to-r from-pink-100 to-sky-100 p-3 flex flex-col gap-1 rounded-br-3xl animate-pulse mx-auto mx-2">
      <div className="h-48 bg-gray-400 rounded"></div>
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex flex-row justify-between">
         
          
        </div>
        <div className="h-8 w-32 bg-gray-500 rounded"></div>
      </div>
    </div>
  ));

  return (
    <div className="mx-auto mt-10 grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
      {shimmerCards}
    </div>
  );
}

export default ShoppingCardShimmer;
