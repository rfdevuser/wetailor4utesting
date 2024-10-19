"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '@/redux/actions/cartActions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Cart: React.FC = () => {
  const router = useRouter(); // Initialize useRouter
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (index: number) => {
    dispatch(removeFromCart(index));
  };
  console.log(cartItems,"cartitems");

 // Calculate total prices
const totalRegularPrice = cartItems.reduce((acc: number, item: any) => acc + Number(item.RegPrice), 0);
const totalDiscountedPrice = cartItems.reduce((acc: number, item: any) => acc + Number(item.price), 0);
const totalDiscount = totalRegularPrice - totalDiscountedPrice + 60;

const LastCodeOfName = (id: string | undefined) => {
  if (!id) return ''; // Handle undefined or null case
  const idParts = id.split('-');
  return idParts[idParts.length - 1]; // Return the last part
};
const handleClick = () => {
  const token = localStorage.getItem('token'); // Check if token exists
  const userId = localStorage.getItem('userId');
  const mobile_no = localStorage.getItem('phoneNumber')
  console.log(mobile_no, "mobile")
  console.log(userId,"userId")
  if (token) {
    router.push('/Checkout');
     // Navigate to Google if token is present
  } else {
    router.push('/MobileAuth'); // Navigate to MobileAuth page if token is not present
  }
};
  return (
    <>
      <div className='flex flex-col lg:flex-row h-full mb-20'>
        <div className="w-full lg:w-3/4 mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h2>
          <ul className="space-y-4">
            {cartItems.length === 0 ? (
              <li className="py-4 text-center text-gray-500">Your cart is empty</li>
            ) : (
              cartItems.map((item: any, index: any) => (
               
                <li key={index} className="flex flex-col sm:flex-row items-center justify-between p-4 border-b">
                  <div className="flex items-center mb-4 sm:mb-0">
                  <Link href={`/SingleBlouseDescriptionPage?id=${LastCodeOfName(item.slug)}`} as={`/SingleBlouseDescriptionPage/${LastCodeOfName(item.slug)}`}>
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain mr-4 p-2" /> </Link>
                    <div className="flex flex-col">
                    <Link href={`/SingleBlouseDescriptionPage?id=${LastCodeOfName(item.slug)}`} as={`/SingleBlouseDescriptionPage/${LastCodeOfName(item.slug)}`}>
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      </Link>
                      <p className="text-gray-600"  style={{ textDecoration: 'line-through' }}>{item.RegPrice}</p>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(index)}
                    className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Remove
                  </button>
                </li>
              ))
            )}
          </ul>
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <Link href='/'>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200 mb-4 sm:mb-0">
              Continue Shopping
            </button>
            </Link>
          </div>
        </div>

        {/* Right side card */}
        <div className='w-full lg:w-1/4'>
        <div className="flex flex-col p-6 border-b bg-[#f5f5f4] shadow-sm rounded-lg">
  {cartItems.length > 0 && (
    <>

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 mt-4">Cart Summary</h2>
      <p className=" text-gray-700">Price ({cartItems.length}): <span className="text-green-600">₹{totalRegularPrice.toFixed(2)}</span></p>
      <p className="  text-gray-700">Total Discount: <span className="text-red-600">-₹{totalDiscount.toFixed(2)}</span></p>
      <p className="  text-gray-800">Delivery: <span className="text-[#65a30d]">₹60</span></p>
      <p className=" text-gray-800">Total Amount: <span className="text-[#030712]">₹{totalDiscountedPrice.toFixed(2) }</span></p>

      <button className="mt-4 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition duration-200 shadow-lg"   onClick={handleClick}>
        Proceed to Checkout
      </button>

    </>
  )}
</div>

          <div className='w-100 bg-[#f5f5f4]'> 
            <Image
              src='/Backgrounds/cartchatbg.jpg'
              alt='image'
              height={400}
              width={400}
              loading='lazy'
              className='p-2'
            />
            <p className='text-center text-xl text-[#525252]'>Make Your Product Your Own </p>
            <p className='text-center text-md mb-2 text-[#b91c1c]'>You Decide, We Deliver. </p>
            <Link href='/chatLanguageSelectionPage'>
              <button className=' w-full  mt-4 bg-[#6b7280] text-white px-6 py-3 rounded-lg hover:bg-[#111827] transition duration-200 shadow-lg'>Chat With Our Designer</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
