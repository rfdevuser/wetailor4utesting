"use client"
import { GET_FABRIC_PRODUCTS } from '@/utils/gql/GQL_QUERIES';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';

const FilterComponent = ({setFilterValue , onClose}) => {
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
    onClose()
  };
  const { loading, error, data } = useQuery(GET_FABRIC_PRODUCTS, {
    variables: {
      firstt:100,
      cat: "fabric_swatch",
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
    <div className='relative min-h-screen '>
  <div className='content'>
    {/* Your main content here */}
  </div>

  <div className='fixed bottom-0 left-0 right-0 bg-gradient-to-br from-[#ffffff] to-[#d4dfed] shadow-xl border-t-2 border-black text-bold p-4' style={{ maxHeight: '500px', overflowY: 'auto' }}>
    <div className='flex flex-wrap justify-around gap-2'>
      <div key="noFilter" className='bg-red-500 p-2 rounded mx-8'>
        <input type="radio" id={`noFilter`} name="fabricType" value={null} onChange={() => handleFilterChange(null)} />
        <label htmlFor={`noFilter`}><strong>NO FILTER</strong></label> {/* Option for no filter */}
      </div>

      {[...uniqueFirstWords].map((word, index) => (
  <div key={index} className='flex flex-col bg-white p-2 rounded mx-4 cursor-pointer'>
    <div className='flex items-center mx-auto justify-center'>
      <input 
        type="radio" 
        id={`fabricType${index}`} 
        name="fabricType" 
        value={word} 
        checked={selectedOption === word} 
        onChange={() => handleFilterChange(word)} 
        className="mr-2 " // Space between radio and label
      />
      <label htmlFor={`fabricType${index}`} className="text-sm"><strong>{word}</strong></label> {/* Each unique first word */}
    </div>
  </div>
))}

    </div>
  </div>
</div>

  );
};

export default FilterComponent;
