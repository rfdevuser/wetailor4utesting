import React from 'react';
import { B2BcardData } from '@/Data/B2Bdata';
import Link from 'next/link';

const B2BsubCategoryPage = ({ params }: { params: { id: string } }) => {
  // Find the category with the matching id
  const category = B2BcardData.find(cat => cat.id.toString() === params.id);
  
  // Get subcategories if category is found
  const subcategories = category ? category.subcategories : [];

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar for category list */}
      <div className="w-full lg:w-1/3 p-4 bg-[#fffbeb] border-b lg:border-b-0 lg:border-r border-gray-300">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          {B2BcardData.map(cat => (
            <li key={cat.id} className="hover:bg-[#fecdd3] p-2 rounded">
              <Link href={`/B2BsubCategoryPage?id=${cat.id}`} as={`/B2BsubCategoryPage/${cat.id}`}>
                <div className="text-blue-600 hover:underline">
                  {cat.title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content for subcategories */}
      <div className="w-full lg:w-2/3 p-4">
        {category ? (
          <>
            <h1 className="text-2xl font-bold mb-4">{category.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subcategories.map(sub => (
                <div key={sub.name} className="bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold mb-2">{sub.name}</h3>
                  <a href={sub.link} className="text-blue-600 hover:underline">
                    View Details
                  </a>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-600">No category found.</p>
        )}
      </div>
    </div>
  );
}

export default B2BsubCategoryPage;
