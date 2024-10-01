"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_FABRIC_PRODUCTS } from '@/utils/gql/GQL_QUERIES';
import FabricCardShimmer from '@/components/Assests/SimmerFabricCard';
import FabricCard from '@/components/Assests/FabricCard';
import FilterComponent from '@/components/Assests/FilterComponent';
import button1 from '@/components/Assests/Button'
import { userAgentFromString } from 'next/server';
import Link from 'next/link';
import ColourDropdownBox, { DropdownComponet } from '@/components/Assests/ColourDropdownBox'


// const LoadingIndicator = () => (
//   <div className="text-center mt-4 mb-4">
//     <Spinner animation="border" role="status">
//       <span className="visually-hidden">Loading...</span>
//     </Spinner>
//     <p className='text-xl'><b>Loading more Product...</b></p>
//   </div>
// );
const Fabric_Stores = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [offset, setOffset] = useState(0);
  const [endCursor, setEndCursor] = useState(null);
  const [loadingbelow, setloadingbelow] = useState(false);
  const [filterValue, setFilterValue] = useState(null);
  const [SingleProduct, setSingleProduct] = useState(null);
  const [showShimmer, setShowShimmer] = useState(false);
  
  // console.log(filterValue)
  // const filterValue = null;

  const queryVariables = {
    firstt: 20,
    cat: "Lining Fabric",
    mafter: null,
  };

  if (filterValue !== null) {
    queryVariables.filter = filterValue;
  }
  const { loading, error, data, fetchMore } = useQuery(GET_FABRIC_PRODUCTS, {
    variables: queryVariables,
  });
  console.log(data)
  // const hasNextPage = data?.products?.pageInfo?.hasNextPage;
  // console.log("hasnextpage",hasNextPage)
  // Function to load more data
  const loadMore = () => {
    // console.log("i am in");
    setloadingbelow(true)
    setShowShimmer(true);
    fetchMore({

      
      variables: {

        mafter: data?.products?.pageInfo?.endCursor,
      },

     
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.products.edges;
        const pageInfo = fetchMoreResult.products.pageInfo;

        return newEdges.length
          ? 
          {
            ...previousQueryResult,

            products: {
              ...previousQueryResult.products,

              edges: [...previousQueryResult.products.edges, ...newEdges],

              pageInfo,
            },
          }
          : // else, return the previous result
          previousQueryResult;
      },
    });

  };

  // const handleOnClick=()=>{
  //   loadMore();
  // }
  // Attach scroll event listener to load more data when user scrolls to bottom
  useEffect(() => {
    const handleScroll = () => {
      // console.log("i am und/er handleScroll")
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
 
      if (scrollTop + clientHeight + 1 >= scrollHeight && !loading) {
        <p>loading...</p>
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, data, fetchMore]);
  const handleFilterChange = (word) => {
    setFilterValue(word);
  };
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  const handleClickOfSingleFabric =()=>{
    console.log(SingleProduct)
 
  }

  const closeFilter = () => {
    setShowFilter(false);
  };
  return (
    <>
      <div className=' mx-10 lg:mx-50  mt-10 flex lg:flex-row md:flex-col sm:flex-col pb-6'>
        <div className='flex lg:flex-row flex-col w-full justify-between'>
          <div>
            <button id="filterButton" className="smky-btn3 border-2 border-black relative hover:text-white py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-gradient-to-br from-purple-500 to-pink-500 after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-gray-800 lg:order-1 sm:order-2 md:order-2 sm:order-2 md:order-2" onClick={toggleFilter}>FILTER BY FABRIC TYPES</button>
          </div>
          <div id="colorBoxContainer" className="lg:w-auto w-full lg:order-2 sm:order-1 md:order-1 sm:order-1 md:order-1">
            <div className='mt-2'><ColourDropdownBox setFilterValue={handleFilterChange} /></div>
          </div>
        </div>

      </div>
      <div className='mt-10 relative'>
        <div className='container mx-auto '>
          {loadingbelow && <p className="text-center py-4 bottom-0">{setloadingbelow(false)}{console.log("loading")}</p>}
        </div>

        {loading ? (
          <FabricCardShimmer count={data ? data.products.edges.length : 20} />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 bg-white">
           

            {data && data.products && data.products.edges.map((edge, index) => (
              
            
              <FabricCard
              key={edge.node.id} 
                name={edge.node.name}
                image={edge.node.image.sourceUrl}
                slug={edge.node.slug}
                price={edge.node.price}
                setSingleProduct={setSingleProduct}
              />

            
            ))}
             {showFilter && <FilterComponent setFilterValue={handleFilterChange}  onClose={closeFilter} />}
          </div>
          </div>
        )}
     
    
      </div>
   
    </>
  );
}

export default Fabric_Stores;
