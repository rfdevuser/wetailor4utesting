// components/AdModal.js
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const AdModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const modalClosed = sessionStorage.getItem('adModalClosed');
      if (!modalClosed) {
        setShowModal(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setShowModal(false);
    sessionStorage.setItem('adModalClosed', 'true');
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-3xl h-96 ml-10"> {/* Adjusted size for larger screens */}
        <img src="/Backgrounds/adpic3.png" alt="Advertisement" className="w-full h-full object-cover rounded-lg" />
        <button 
          className="absolute top-2 right-2 text-gray-600 bg-white rounded-full p-1" 
          onClick={closeModal}
        >
          &times;
        </button>
        <div className="absolute bottom-0 right-0 items-center  mx-8">
          <h2 className="text-lg font-semibold text-white bg-[#475569] flex justify-center mx-8 text-center p-1">Customise Your Garment — From Single to Bulk, We Design It All!</h2>
          <Link href='/chatLanguageSelectionPage'> <button onClick={closeModal} className="  mt-2 w-full bg-[#172554] text-white py-2 rounded hover:bg-[#020617]">
           Chat with us
          </button>
          </Link>
          </div>
      </div>
    </div>
  );
};

export default AdModal;
