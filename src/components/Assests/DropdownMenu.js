import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  auth } from "@/firebase.config"


import {  signOut } from 'firebase/auth';
import { resetFormData } from '@/redux/reducers/formReducer';
const DropdownMenu = () => {
  const dispatch = useDispatch();

  const checkTokenExpiration = () => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (tokenExpiration) {
      const currentTime = new Date().getTime();
      if (currentTime > tokenExpiration) {
        handleLogout(); // Call logout if token is expired
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration(); // Check expiration on mount
  }, []);
  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);
      console.log("Successfully logged out");
      
      // Clear Redux form data
      dispatch(resetFormData());

      // Clear localStorage
      localStorage.removeItem('accessToken'); // Replace with your relevant key
      localStorage.clear(); // Uncomment if you need to clear everything

      // Redirect to login page
      router.push('/'); // Ensure this path is correct
    } catch (error) {
      // Handle sign-out errors
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1">
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Home
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
         Orders
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Contact Us
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Coupons
        </a>

        <a
          href="/CustomerAddress"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
         Saved Address
        </a>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Logout
        </button>
        {/* Add more dropdown items as needed */}
      </div>
    </div>
  );
};

export default DropdownMenu;
