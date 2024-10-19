// this page is acting as a middlepage between Mobile authentication and user details input so that it can find where user have already registered earlier or not if registed then save the details to local and dispatch a action and then push to the home page other wise it will push to the userDetails page
"use client"
import { updateFormData } from '@/redux/reducers/formReducer';
import { GET_CUSTOMER_DETAILS_BY_USER_ID } from '@/utils/gql/GQL_QUERIES';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';



const CheckUser = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const [phoneNumber , setPhoneNumber] = useState('');
  useEffect(()=>{
    const savedPhoneNumber = localStorage.getItem('phoneNumber');
if (savedPhoneNumber) {
    setPhoneNumber(savedPhoneNumber);
}

  },[])
  const { loading, error, data } = useQuery(GET_CUSTOMER_DETAILS_BY_USER_ID, {
    variables: { contact: `${phoneNumber}` },
  });

  // Effect to handle redirection after data is loaded
  React.useEffect(() => {
    if (loading) return; // Wait for loading to finish
    if (error) {
      console.error(error);
      return; // Handle error as necessary
    }

    console.log(data);

    // Navigate based on the presence of customer data
    if (data && data.wetailor4uUserDetailsByContact) {
      const emailToSave = data.wetailor4uUserDetailsByContact.email || ''; // Save email only if provided
localStorage.setItem('email', emailToSave);
dispatch(updateFormData({ fieldName: 'name', fieldValue: data.wetailor4uUserDetailsByContact.name }));
      router.push('/'); // Redirect to home if customer data exists
    } else {
      router.push('/UserDetails'); // Redirect to userDetails if no data
    }
  }, [loading, error, data, router]);

  return<> 
  <p className='h-screen flex justify-center items-center text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl bg-clip-text text-transparent bg-gradient-to-t from-[#111827] to-[#075985]'>
  Hang Tight! Setting Up Your Profile…</p>
  
  
  
  </>// Show loading text initially
};


export default CheckUser
