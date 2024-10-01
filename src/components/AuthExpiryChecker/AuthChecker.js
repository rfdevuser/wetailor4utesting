// components/AuthChecker.js
"use client";

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from "@/firebase.config";
import { signOut } from 'firebase/auth';
import { resetFormData } from '@/redux/reducers/formReducer';
import { useRouter } from 'next/navigation';

const AuthChecker = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const checkTokenExpiration = () => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (tokenExpiration) {
      const currentTime = new Date().getTime();
      if (currentTime > tokenExpiration) {
        handleLogout(); // Call logout if token is expired
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Successfully logged out");

      dispatch(resetFormData());
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');

      router.push('/'); // Redirect to login page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    checkTokenExpiration(); // Check expiration on mount
  }, []);

  return <>{children}</>; // Render children components
};

export default AuthChecker;
