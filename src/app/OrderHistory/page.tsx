"use client";
import { GET_CUSTOMER_CUSTOM_PRODUCT_DETAILS_BY_CONTACT_FOR_PAID, GET_ORDER_HISTORY_DETAILS_BY_USER_ID } from '@/utils/gql/GQL_QUERIES';
// import {GET_ORDER_HISTORY_DETAILS_BY_USER_ID } from '@/utils/gql/GQL_QUERIES'; // Assume this exists
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';

const Shimmer = () => {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-6 bg-gray-200 rounded mb-2"></div>
    </div>
  );
};

interface Product {
  id: string;
  name: string;
  description: string;
  payment_type: string;
  price: string;
  quantity: string;
  size: string;
  RegPrice: string;
  image_link: string;
  pid: string;
  token: boolean;
}

interface QueryData {
  getPaidDataByContact?: Product[];
  getBespokeDataByContact?: Product[]; // Assuming similar structure
}

interface QueryVars {
  contact_no: string;
  
}

interface OrderHistoryItem {
  __typename: string;
  idPrimary: string | null;
  userID: string;
  orderID: string;
  date_of_entry: string;
}

interface OrderHistoryData {
  getOrderHistoryByUserID: OrderHistoryItem[];
}
const OrderHistory = () => {
  const [contactNo, setContactNo] = useState('');
const [userID , setUserId] = useState('');
  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber') || '';
    setContactNo(storedPhoneNumber);
    const id = localStorage.getItem('userId');
        if (id) setUserId(id);
  }, []);

  const { loading: loadingPaid, error: errorPaid, data: dataPaid } = useQuery<QueryData, QueryVars>(
    GET_CUSTOMER_CUSTOM_PRODUCT_DETAILS_BY_CONTACT_FOR_PAID,
    {
      variables: { contact_no: contactNo },
      skip: !contactNo,
    }
  );
  

  // const { loading: loadingBespoke, error: errorBespoke, data: dataBespoke } = useQuery<QueryData, QueryVars>(
  //   GET_ORDER_HISTORY_DETAILS_BY_USER_ID,
  //   {
  //     variables: { userID:userID },
  //     skip: !userID,
  //   }
  // );

  const { loading: loadingBespoke, error: errorBespoke, data  } = useQuery( GET_ORDER_HISTORY_DETAILS_BY_USER_ID, {
    variables: {
      userID:userID // Ensure you're using the lastPart instead of hardcoded ID
    },
});
console.log(errorBespoke,"errobsos")
// console.log(dataBespoke,"dar")
  if (loadingPaid || loadingBespoke) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Order History</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <Shimmer key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className='text-md lg:text-3xl font-bold  mt-4 text-[#334155] text-center'>
        Your order made our day! Thank you for being a valued customer.
      </h1>
      <div className="max-w-6xl mx-auto px-4 py-8">
   {/* Bespoke Orders */}
   <h1 className="text-3xl font-bold mb-6 text-center mt-10">
          <i className='text-blue-800'> Order History</i>
        </h1>

        {data?.getOrderHistoryByUserID && data.getOrderHistoryByUserID.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.getOrderHistoryByUserID.map((order:any) => (
          <div key={order.orderID} className="border rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold">Order ID: {order.orderID}</h2>
            <p>Date of Order:  {new Date(order.date_of_entry).toLocaleDateString()}</p>
          
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-10">No orders found.</div>
    )}
        {/* Custom Wear Orders */}
        <h1 className="text-3xl font-bold mb-6 text-center mt-6">
          <i className='text-red-800'>Custom Wear</i> Order History
        </h1>

        {dataPaid?.getPaidDataByContact && dataPaid.getPaidDataByContact.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dataPaid.getPaidDataByContact.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105"
              >
                <img
                  src={product.image_link}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-white">
                  <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-lg font-bold text-green-600">Price: ₹{product.price}</p>
                  <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                  <p className="text-sm text-gray-500">Size: {product.size}</p>
                  <p className={`mt-2 text-sm `}>
                    <b>Thank You for Shopping with us ❤️</b>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">No Custom Wear orders found.</div>
        )}

     
      </div>
    </>
  );
};

export default OrderHistory;
