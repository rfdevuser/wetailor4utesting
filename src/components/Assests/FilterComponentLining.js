"use client"
import { GET_FABRIC_PRODUCTS } from '@/utils/gql/GQL_QUERIES';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';

const FilterComponent = ({setFilterValue}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleFilterChange = (word) => {
    const filtered = data.products.edges.filter((edge) =>
      edge.node.name.startsWith(word)
   
    );
    setFilteredProducts(filtered);
    console.log(word);
    setFilterValue(word);
    setSelectedOption(word);  // Update filter value in parent component
  };
  const { loading, error, data } = useQuery(GET_FABRIC_PRODUCTS, {
    variables: {
      firstt:100,
      cat: "Lining Fabric",
      mafter: null,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const uniqueFirstWords = new Set();

  // Extract unique first words
  data.products.edges.forEach(edge => {
    const firstWord = edge.node.name.split(' ')[0];
    uniqueFirstWords.add(firstWord);
  });

  return (
    <div className='container'>
      <div className='bg-white shadow-xl width-150 mt-2 flex justify-items-center  flex-wrap  gap-20   p-10 mx-auto border-2 border-black text-bold' style={{ maxHeight: '500px', maxWidth:'250px', overflowY: 'auto' }}>
        <div key="noFilter" className='bg-red'>
          <input type="radio" id={`noFilter`} name="fabricType" value={null} onChange={() => handleFilterChange(null)}/>
          <label htmlFor={`noFilter`}><strong>NO FILTER</strong></label> {/* Option for no filter */}
        </div>
        
        {[...uniqueFirstWords].map((word, index) => (
          <div key={index}>
            <input type="radio" id={`fabricType${index}`} name="fabricType" value={word} checked={selectedOption === word} onChange={() => handleFilterChange(word)}/>
            <label htmlFor={`fabricType${index}`}><strong>{word}</strong></label> {/* Each unique first word */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
