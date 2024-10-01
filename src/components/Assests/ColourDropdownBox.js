"use client"
import { GET_FABRIC_PRODUCTS } from '@/utils/gql/GQL_QUERIES';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';

const ColourDropdownBox = ({ setFilterValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { loading, error, data } = useQuery(GET_FABRIC_PRODUCTS, {
    variables: {
      firstt: 100,
      cat: "fabric_swatch",
      mafter: null,
    },
  });

  const handleFilterChange = (word) => {
    setFilterValue(word);
    setSelectedOption(word);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const uniqueSecondWords = new Set();

  // Extract unique second words
  data.products.edges.forEach(edge => {
    const firstWord = edge.node.name.split('-')[0];
    const secondWord = firstWord.split(' ')[1];

    uniqueSecondWords.add(secondWord);
  });

  const visibleOptions = [...uniqueSecondWords].slice(0, 1000); // Display only the first 10 options

  return (
    <div className="inline-flex bg-white border-2 border-black mx-4 rounded-md">
      <a
        href="#"
        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md"
      >
        FILTER BY COLOUR
      </a>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center h-full px-2 text-gray-600 border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
            <div className="p-2 max-h-80 overflow-y-auto"> {/* Limit height and enable scrolling */}
              <div key="noFilter" className='bg-red'>
                <input type="radio" id={`noFilter`} name="fabricType" value={null} onChange={() => handleFilterChange(null)} />
                <label htmlFor={`noFilter`}><strong>NO FILTER</strong></label> {/* Option for no filter */}
              </div>
              {visibleOptions.map((word, index) => (
                <div key={index}>
                  <input type="radio" id={`fabricType${index}`} name="fabricType" value={word} onChange={() => handleFilterChange(word)} />
                  <label htmlFor={`fabricType${index}`}><strong>{word}</strong></label> {/* Each unique second word */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColourDropdownBox;
