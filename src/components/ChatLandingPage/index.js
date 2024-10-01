
import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { FaComments } from 'react-icons/fa'; // Make sure to install react-icons

const ChatLandingPage = () => {
  const router = useRouter(); // Initialize useRouter

  const handleClick = () => {
    const token = localStorage.getItem('token'); // Check if token exists
    const userId = localStorage.getItem('userId');
    const mobile_no = localStorage.getItem('phoneNumber')
    console.log(mobile_no, "mobile")
    console.log(userId,"userId")
    if (token) {
      router.push('/chatLanguageSelectionPage');
       // Navigate to Google if token is present
    } else {
      router.push('/MobileAuth'); // Navigate to MobileAuth page if token is not present
    }
  };
  
  return (
    <div className='fixed bottom-5 right-5 z-50 p-2 transition-transform transform cursor-pointer'>
      <div 
        className='relative bg-[#0f172a] p-3 rounded-lg shadow-lg border-2 border-blue-700 hover:scale-105 hover:shadow-xl'
        onClick={handleClick} // Add click event handler
      >
        <FaComments className='text-2xl md:text-3xl text-white' />
      </div>
    </div>
  );
};

export default ChatLandingPage;
