"use client";
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CUSTOMER_CUSTOM_PRODUCT_DETAILS_BY_CONTACT_FOR_HALFPAID, GET_CUSTOMER_CUSTOM_PRODUCT_DETAILS_BY_CONTACT_FOR_UNPAID } from '@/utils/gql/GQL_QUERIES';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/actions/cartActions';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Image from 'next/image';
import { UPDATE_CUSTOMER_STATUS, UPDATE_PRODUCT_TOKEN } from '@/utils/gql/GQL_MUTATIONS';

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
  getDataByContact?: Product[];
}

interface QueryData {
  getHalfPaidDataByContact?:Product[]

}
interface QueryVars {
  contact_no: string;
}

const CustomerRoom: React.FC = () => {
  const [contactNo, setContactNo] = useState<string>('');
const [email,setEmail] = useState('');
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const userName = useSelector((state: any) => {
    const fullName = state.form.formData.name;
    return fullName ? fullName.split(' ')[0] : '';
  });

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber') || '';
    setContactNo(storedPhoneNumber);

    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
        setEmail(savedEmail);
    }

  }, []);
  useEffect(() => {
    // Dynamically load the Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script if the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const { loading, error, data,refetch } = useQuery<QueryData, QueryVars>(GET_CUSTOMER_CUSTOM_PRODUCT_DETAILS_BY_CONTACT_FOR_UNPAID, {
    variables: { contact_no: contactNo },
    skip: !contactNo,
  });
  const { loading:halfpayloading, error:halfpayerror, data:halfpaydata,refetch:halfpayrefetch } = useQuery<QueryData, QueryVars>(GET_CUSTOMER_CUSTOM_PRODUCT_DETAILS_BY_CONTACT_FOR_HALFPAID, {
    variables: { contact_no: contactNo },
    skip: !contactNo,
  });

  const [updateCustomerStatus] = useMutation(UPDATE_CUSTOMER_STATUS);
console.log(halfpaydata)
  const dispatch = useDispatch();
  const handleAddToCart = (product: Product, effectivePrice: number , id: string) => {
    const { name, image_link, pid, payment_type } = product;
    
    // Set the slug based on the payment type
 payment_type === 'advance_payment' ? 'advance_payment' : 'full_payment';
    const slug = `${id}/${payment_type}`;
    console.log(slug,"this is slug")
    dispatch(addToCart({
      name,
      price: effectivePrice,
      image: image_link,
      RegPrice: '',
      slug: slug,  // Use the determined slug here
      pid: pid || ''
    }));
  
    toast.success(`${name} added to cart!`);
  };
  
  
  const [updateProductToken] = useMutation(UPDATE_PRODUCT_TOKEN);
  const handlePayToken = (productId: string) => {
    const options = {
      key: "rzp_live_sCxaf0020ub9NP", // Replace with your Razorpay key
      amount: 100, // Amount in paise
      currency: "INR",
      name: "WeTailor4U",
      description: "This is a Token Money",
      image: "/images/logo/wetailor4u.png",
      handler: async (response: any) => {
        console.log("Payment successful!", response);
        toast.success("Payment of Rs. 200 successful! This will be adjusted in your final bill.");
    
      try {
        const { data } = await updateProductToken({ variables: { id: productId, token: 1 } });
        refetch();
        halfpayrefetch
        console.log(data.wetailor4uUpdateProductToken.responseMessage);
      } catch (error) {
        console.error("Error updating token:", error);
        toast.error("Error updating token. Please try again.");
      }
    },
      prefill: {
        name: userName,
        email: email,
        contact: contactNo,
      },
      theme: {
        color: "#0f172a",
      },
      
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };




  const handleHalfPayToken = (price:any , customerId:any) => {
    const options = {
      key: "rzp_live_sCxaf0020ub9NP", // Replace with your Razorpay key
      amount:price, // Amount in paise
      currency: "INR",
      name: "WeTailor4U",
      description: "This is a Token Money",
      image: "/images/logo/wetailor4u.png",
      handler: async (response: any) => {
        console.log("Payment successful!", response);
        toast.success("Payment of Rs. 200 successful! This will be adjusted in your final bill.");
    
      try {
        const { data } = await updateCustomerStatus({ 
          variables: { uid: customerId, status: "paid" } 
      });
        refetch();
        halfpayrefetch
        console.log(data.wetailor4uUpdateProductToken.responseMessage);
      } catch (error) {
        console.error("Error updating token:", error);
        toast.error("Error updating token. Please try again.");
      }
    },
      prefill: {
        name: userName,
        email: email,
        contact: contactNo,
      },
      theme: {
        color: "#0f172a",
      },
      
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };


  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  if (loading) return <p className='h-screen flex justify-center items-center text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl bg-clip-text text-transparent bg-gradient-to-t from-[#be123c] to-[#075985]'>
  Welcome {userName} to your personal Store </p>
  ;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>;

  const products = data?.getDataByContact;
  const halfPaidProducts = halfpaydata?.getHalfPaidDataByContact
  ;
  return (
    <div className="p-6 bg-red-50">
      <h1 className="text-md lg:text-4xl font-bold mb-6 text-center">Welcome {userName} to the place where your fashion dreams take shape!</h1>
      <h2 className="text-sm lg:text-4xl font-bold mb-6 text-center text-blue-800">Your personal style journey begins here—let’s get started!</h2>

      {/* Unpaid Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products && products.length > 0 ? (
          products.map(item => {
            const isAdvancePayment = item.payment_type === 'advance_payment';
            const effectivePrice = isAdvancePayment ? (parseFloat(item.price) / 2) : parseFloat(item.price);

            return (
              <div key={item.id} className={`relative bg-white rounded-lg shadow-md p-4 flex flex-col`}>
                {item.image_link && (
                  <div className="relative w-full h-48 mb-4">
                    <img
                      src={item.image_link}
                      alt={item.name}
                      className={`absolute inset-0 w-full h-full object-cover rounded-md ${!item.token ? 'blurred' : ''}`}
                      onClick={() => openModal(item.image_link)}
                    />
                  </div>
                )}
                <div className={`flex-1 ${!item.token ? 'blurred' : ''}`}>
                  <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-gray-700">Size: <span className="font-medium">{item.size}</span></p>
                  <p className="text-gray-700">Price: <span className="font-bold">₹{item.price}</span></p>
                  {isAdvancePayment && (
                    <p className="text-gray-700">Advance Payment: <span className="font-bold">₹{effectivePrice.toFixed(2)}</span></p>
                  )}
                  <p className="text-gray-700">Quantity: <span className="font-medium">{item.quantity}</span></p>
                  <p className="text-gray-700">Payment Type: <span className="font-medium">{item.payment_type}</span></p>
                  <button
                    onClick={() => handleAddToCart(item, effectivePrice, item.id)}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 w-full"
                  >
                    Add to Cart
                  </button>
                </div>
                {!item.token && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => handlePayToken(item.id )}
                      className="bg-[#ec4899] text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300 z-10"
                    >
                      Pay ₹{isAdvancePayment ? effectivePrice : '250'} as Token Advance
                      <p className='text-sm text-gray-800'>It will adjust in final bill</p>
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white flex justify-center ">
            <div className='w-100 bg-[#f5f5f4]'> 
              <Image
                src='/Backgrounds/cartchatbg.jpg'
                alt='image'
                height={400}
                width={400}
                loading='lazy'
                className='p-2'
              />
              <p className='text-center text-xl text-[#525252]'>Make Your Product Your Own</p>
              <p className='text-center text-md mb-2 text-[#b91c1c]'>You Decide, We Deliver.</p>
              <Link href='/chatLanguageSelectionPage'>
                <button className='w-full mt-4 bg-[#6b7280] text-white px-6 py-3 rounded-lg hover:bg-[#111827] transition duration-200 shadow-lg'>Chat With Our Designer</button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Half-Paid Products */}
      <div className='bg-[#f0fdfa]'>
        <div>  <h2 className="text-sm lg:text-2xl font-bold mb-6 text-center text-blue-800 mt-4">Please Pay the Final amount to dispatch your product</h2></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 p-4">
        {halfPaidProducts && halfPaidProducts.length > 0 ? (
          halfPaidProducts.map(item => {
            const halfPrice = parseFloat(item.price) / 2; // Calculate half price

            return (
              <div key={item.id} className={`relative bg-white rounded-lg shadow-md p-4 flex flex-col`}>
                {item.image_link && (
                  <div className="relative w-full h-48 mb-4">
                    <img
                      src={item.image_link}
                      alt={item.name}
                      className={`absolute inset-0 w-full h-full object-cover rounded-md`}
                      onClick={() => openModal(item.image_link)}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-gray-700">Size: <span className="font-medium">{item.size}</span></p>
                  <p className="text-gray-700">Price: <span className="font-bold">₹{item.price}</span></p>
                  <p className="text-gray-700">Remaining Balance: <span className="font-bold">₹{halfPrice.toFixed(2)}</span></p>
                  <p className="text-gray-700">Payment Type: <span className="font-medium">{item.payment_type}</span></p>
                 <div className='flex justify-center mt-3'>
                  <button
                    onClick={() => handleHalfPayToken(halfPrice.toFixed(2) , item.id)} // Adjust this function as needed
                    className="bg-[#ec4899]  text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                  >
                    Pay Remaining Balance
                  </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-4 text-gray-500">No half-paid products found.</div>
        )}
      </div>
      </div>
      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <span className="absolute top-4 right-4 text-white cursor-pointer" onClick={closeModal}>&times;</span>
          {selectedImage && (
            <img src={selectedImage} alt="Full view" className="max-w-full max-h-full" />
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerRoom;
