"use client"
import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { GET_PRODUCT_BY_ID } from '@/utils/gql/GQL_QUERIES';
import Image from 'next/image';
// import { useDispatch } from 'react-redux';
import { addFabric, addLiningFabric } from '@/redux/reducers/fabricSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setProductID } from '@/redux/reducers/productSlice';
import { AppDispatch, RootState } from '@/redux/store';
const SingleFabricDescriptionPage = ({ params }: { params: { id: string } }) => {
  const isLiningFabric = /LF|lf/.test(params.id);
  console.log(isLiningFabric)
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const reduxProductID = useSelector((state: RootState) => state.productID);
  const { productID } = reduxProductID

  console.log(productID, "reduxProductID");
  console.log(params.id)
  // Fetching data based on the slug using useQuery hook
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      id: params.id  // Assuming id is what your GraphQL query expects for product identification
    },
  });

  const shimmer = (
    <div className="animate-pulse bg-gray-200 rounded-lg">
      <div className="aspect-w-4 aspect-h-4"></div>
    </div>
  );
  if (loading) {
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
  if (error) return <div>Error: {error.message}</div>;
  console.log(data)
  // Assuming your data structure, you can access the product details from data.product
  const product = data?.product; // Adjust according to your actual data structure
  const handleAddFabric = () => {
    if (product) {
      const fabricToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image.sourceUrl,
      };

      // Store the fabric with a key that includes the product ID
      const fabricKey = `fabric_${productID}`;
      localStorage.setItem(fabricKey, JSON.stringify(fabricToAdd));

      router.back();
    }
  };
  const handleAddLiningFabric = () => {
    if (product) {
      const liningFabricToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image.sourceUrl,
      };



      const fabricKey = `Liningfabric_${productID}`;
      localStorage.setItem(fabricKey, JSON.stringify(liningFabricToAdd));

      // Navigate back to the previous page
      router.back();
    }
  };
  return (
    <div>

      <div className='flex  mt-6'>

        <div className=' '>
          <div className='flex justify-center '>
            <Image
              alt='product image'
              src={product.image.sourceUrl} // Accessing image sourceUrl from product data
              width={400}
              height={400}
              loading='lazy'
              className='border-double border-8 border-[#facc15] rounded-md '
            />

          </div>
          <h1 className='text-md lg:text-4xl mx-auto text-center mt-4  bg-clip-text text-transparent bg-gradient-to-t from-[#2e1065] to-[#db2777]'><b>{product.name}</b></h1>
          <h2 className='flex justify-center text-2xl mt-4  bg-clip-text text-transparent bg-gradient-to-t from-[#2e1065] to-[#db2777]'><b>Get at :-  {product.price} per meter </b></h2>
          <div className='flex justify-center mt-10 mb-10 mx-2'>

            <div className="border-double border-2 border-[#e2e8f0] p-2 rounded-xl bg-gradient-to-r from-[#fff1f2] to-[#fefce8]" dangerouslySetInnerHTML={{ __html: product.shortDescription }} />

            {/* Render other product details as needed */}
          </div>
          {!isLiningFabric && (<div className='flex justify-center mb-8'>
            <button
              onClick={handleAddFabric}
              className="cursor-pointer text-white font-bold shadow-md hover:scale-[1.2] shadow-purple-400 rounded-full px-5 py-2 bg-gradient-to-bl from-[#F97794] to-[#623AA2]"
            >
              Add as Main Fabric
            </button>
          </div>)}
          {isLiningFabric && (<div className='flex justify-center mb-8'>
            <button
              onClick={handleAddLiningFabric}
              className="cursor-pointer text-white font-bold shadow-md hover:scale-[1.2] shadow-purple-400 rounded-full px-5 py-2 bg-gradient-to-bl from-[#F97794] to-[#623AA2]"
            >
              Add as Lining Fabric
            </button>
          </div>)
          }
        </div>
      </div>
      {/* Render other product details as needed */}
    </div>

  );
};

export default SingleFabricDescriptionPage;
