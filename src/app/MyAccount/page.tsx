"use client";
import { GET_CUSTOMER_DETAILS_BY_USER_ID } from '@/utils/gql/GQL_QUERIES';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const MyAccount = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    
    useEffect(() => {
        const savedPhoneNumber = localStorage.getItem('phoneNumber');
        if (savedPhoneNumber) {
            setPhoneNumber(savedPhoneNumber);
        }
    }, []);
    
    const { loading, error, data } = useQuery(GET_CUSTOMER_DETAILS_BY_USER_ID, {
        variables: { contact: `${phoneNumber}` },
    });
    
    console.log(data);
    const userDetails = data?.wetailor4uUserDetailsByContact;

    return (
        <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <div className="flex flex-col md:flex-row justify-around mb-6">
  <Link href='/OrderHistory'>
    <button className="mb-2 md:mb-0 w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">🛍️ Orders</button>
  </Link>
  <Link href='/CustomerAddress'>
    <button className="mb-2 md:mb-0 w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">📒 Saved Address</button>
  </Link>
  <Link href=''>
    <button className="mb-2 md:mb-0 w-full md:w-auto px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">📱 Contact Us</button>
  </Link>
  <Link href='/Cart'>
    <button className="mb-2 md:mb-0 w-full md:w-auto px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"> 🛒 Cart</button>
  </Link>
</div>


            <div className='bg-[#cbd5e1] max-w-lg mx-auto p-6 md:p-8 rounded-lg'>
                <h1 className="text-2xl font-bold mb-6 mt-6 text-center">My Account</h1>
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Error loading user details.</p>
                ) : userDetails ? (
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row justify-between">
                            <span className="font-medium">Name:</span>
                            <span>{userDetails.name}</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span className="font-medium">Email:</span>
                            <span>{userDetails.email}</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span className="font-medium">Contact:</span>
                            <span>{userDetails.contact}</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span className="font-medium">We Welcome you on:</span>
                            <span>{new Date(userDetails.date).toLocaleString()}</span>
                        </div>
                    </div>
                ) : (
                    <p className="text-center">No user details found.</p>
                )}
            </div>
        </div>
    );
};

export default MyAccount;
