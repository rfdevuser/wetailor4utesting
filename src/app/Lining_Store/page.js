"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FABRIC_PRODUCTS } from '@/utils/gql/GQL_QUERIES';
import FabricCardShimmer from '@/components/Assests/SimmerFabricCard';
import FabricCard from '@/components/Assests/FabricCard';
import FilterComponent from '@/components/Assests/FilterComponent';
import ColourDropdownBox from '@/components/Assests/ColourDropdownBox';

const Fabric_Stores = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [loadingBelow, setLoadingBelow] = useState(false);
  const [filterValue, setFilterValue] = useState(null);
  const [singleProduct, setSingleProduct] = useState(null); // Define setSingleProduct state
  const containerRef = useRef(null); // Reference for the scrollable container

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

  // Function to load more data
  const loadMore = () => {
    if (loading || loadingBelow) return; // Prevent multiple fetch calls

    setLoadingBelow(true);
    fetchMore({
      variables: {
        mafter: data?.products?.pageInfo?.endCursor,
      },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.products.edges;
        const pageInfo = fetchMoreResult.products.pageInfo;

        return newEdges.length
          ? {
              ...previousQueryResult,
              products: {
                ...previousQueryResult.products,
                edges: [...previousQueryResult.products.edges, ...newEdges],
                pageInfo,
              },
            }
          : previousQueryResult; // Return previous if no new edges
      },
    }).finally(() => setLoadingBelow(false)); // Reset loading state
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      // Check if we've reached the bottom of the container
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        loadMore();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [loading, data]);

  const handleFilterChange = (word) => {
    setFilterValue(word);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const closeFilter = () => {
    setShowFilter(false);
  };

  return (
    <>
      <div className='mx-10 lg:mx-50 mt-10 flex lg:flex-row md:flex-col sm:flex-col pb-6'>
        <div className='flex lg:flex-row flex-col w-full justify-between'>
          <div>
            <button 
              id="filterButton" 
              className="smky-btn3 border-2 border-black relative hover:text-white py-2 px-6"
              onClick={toggleFilter}
            >
              FILTER BY FABRIC TYPES
            </button>
          </div>
          <div id="colorBoxContainer" className="lg:w-auto w-full">
            <div className='mt-2'>
              <ColourDropdownBox setFilterValue={handleFilterChange} />
            </div>
          </div>
        </div>
      </div>
      
      <div className='mt-10 relative' ref={containerRef} style={{ height: '80vh', overflowY: 'auto' }}>
        {loading && <FabricCardShimmer count={20} />}
        {error && <p>Error: {error.message}</p>}
        
        {!loading && !error && data && (
          <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 bg-white">
            {data.products.edges.map(edge => (
              <FabricCard
                key={edge.node.id} 
                name={edge.node.name}
                image={edge.node.image.sourceUrl}
                slug={edge.node.slug}
                price={edge.node.price}
                setSingleProduct={setSingleProduct} // Pass down the setSingleProduct function
              />
            ))}
            {showFilter && <FilterComponent setFilterValue={handleFilterChange} onClose={closeFilter} />}
          </div>
        )}
        
        {loadingBelow && <p className="text-center py-4">Loading more...</p>}
      </div>
    </>
  );
}

export default Fabric_Stores;
