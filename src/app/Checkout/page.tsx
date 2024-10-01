"use client";
import { UPDATE_CUSTOMER_ADDRESS } from '@/utils/gql/GQL_MUTATIONS';
import { GET_CUSTOMER_ADDRESSES_BY_USER_ID } from '@/utils/gql/GQL_QUERIES';
import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {PaymentSystem} from '@/app/PaymentSystem'
// import Payment from '@/components/Payment'
// import Payment from '@/components/Payment'

const Shimmer = () => {
    return (
        <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
    );
};

import PaymentSystem from '../PaymentSystem/page';
const Page = () => {
    const cartItems = useSelector((state: any) => state.cart.items);
    const dispatch = useDispatch();
    
    const [userId, setUserId] = useState<string | null>(null);
    const [showMore, setShowMore] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<any | null>(null);
    
    const [formData, setFormData] = useState({
        address_title: '',
        other_title: '',
        firstname: '',
        lastname: '',
        door_no: '',
        postal_address1: '',
        postal_address2: '',
        landmark: '',
        pincode: '',
        state: '',
        city: '',
        contact_no: ''
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const id = localStorage.getItem('userId');
        if (id) setUserId(id);
    }, []);
    useEffect(() => {
        const id = localStorage.getItem('userId');
        if (id) setUserId(id);

        // Load selected address from local storage if it exists
        const storedAddress = localStorage.getItem('selectedAddress');
        if (storedAddress) {
            setSelectedAddress(JSON.parse(storedAddress));
        }
    }, []);
    const { loading: queryLoading, error: queryError, data , refetch } = useQuery(GET_CUSTOMER_ADDRESSES_BY_USER_ID, {
        variables: { userId },
        skip: !userId,
    });
    const [updateCustomerAddress, { loading:updateLoading, error:updateError }] = useMutation(UPDATE_CUSTOMER_ADDRESS);
    const addresses = data?.wetailor4uCustomerAddressesByUserId || [];

    const handleAddressSelect = (address: any) => {
        setSelectedAddress(address);
        setFormData(address); // Populate form with selected address data
          // Save the selected address to local storage
          localStorage.setItem('selectedAddress', JSON.stringify(address));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTitleClick = (title: string) => {
        setFormData({ ...formData, address_title: title, other_title: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await updateCustomerAddress({
                variables: { userId, ...formData, address_title:    formData.address_title },
              });
              
            setModalOpen(false);
            setFormData({
                address_title: '',
                other_title: '',
                firstname: '',
                lastname: '',
                door_no: '',
                postal_address1: '',
                postal_address2: '',
                landmark: '',
                pincode: '',
                state: '',
                city: '',
                contact_no: ''
            });
            refetch();
        } catch (err) {
            setError('Failed to update address.');
        } finally {
            setLoading(false);
        }
    };


    

  
 
    if (queryError) return <p>Error fetching addresses</p>;

console.log(cartItems)
    const totalRegularPrice = cartItems.reduce((acc: number, item: any) => acc + Number(item.RegPrice), 0);
const totalDiscountedPrice = cartItems.reduce((acc: number, item: any) => acc + Number(item.price), 0);
const totalDiscount = totalRegularPrice - totalDiscountedPrice + 60;
    return (
        <>
        <div className='flex flex flex-col lg:flex-row'>
        <div className='h-full w-full lg:w-3/4'>
            <div className="max-w-3/4 mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4  text-[#1e293b]">1. Select a delivery address</h2>
                <div className="space-y-4 ">
                    {loading ? (
            // Show shimmer effect when loading
            <Shimmer />
        ) : (addresses.slice(0, showMore ? addresses.length : 1).map((address: any) => (
                        <div
                            className={`p-4 border rounded-lg cursor-pointer hover:bg-[#ecfdf5] ${selectedAddress?.id === address.id ? 'border-[#334155]' : 'border-gray-200'}`}
                            key={address.id}
                            onClick={() => handleAddressSelect(address)}
                        >
                            <h3 className="text-lg font-semibold">{address.address_title}</h3>
                            <p className="text-gray-700">
                                {address.firstname} {address.lastname}
                            </p>
                            <p className="text-gray-700">
                                {address.postal_address1}, {address.postal_address2}
                            </p>
                            <p className="text-gray-600">
                                {address.door_no}, {address.landmark}, {address.city}, {address.state}, {address.pincode}
                            </p>
                            <p className="text-gray-600">Contact: {address.contact_no}</p>
                        </div>
                   ) ))}
                </div>
                {!showMore && addresses.length > 1 && (
                    <button
                        onClick={() => setShowMore(true)}
                        className="mt-4 text-blue-600 hover:underline"
                    >
                        Show More 🔽
                    </button>
                )}
                {showMore && addresses.length > 1 && (
                    <button
                        onClick={() => setShowMore(false)}
                        className="mt-4 text-blue-600 hover:underline flex justify-center"
                    >
                        Show Less 🔼
                    </button>
                )}
<br/>
<div className='flex justify-center '>
                <button
                    onClick={() => {
                        setModalOpen(true);
                        setFormData({
                            address_title: '',
                            other_title: '',
                            firstname: '',
                            lastname: '',
                            door_no: '',
                            postal_address1: '',
                            postal_address2: '',
                            landmark: '',
                            pincode: '',
                            state: '',
                            city: '',
                            contact_no: ''
                        });
                    }}
                    className="mt-6  p-3 text-[#0f172a] rounded-md hover:bg-[#09090b]"
                >
              <b>   <u>+ Add new address</u></b> 
                </button>
                </div>
                {/* Modal for Adding Address */}
                {modalOpen && (
                    <div className="fixed h-screen overflow-y-auto inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
                        <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full overflow-auto mt-8 mt-12 py-12">
                            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-500">
                                ❌
                            </button>
                            <h2 className="text-2xl font-bold mb-4 text-center text-[#020617] mt-12 py-12">Update Your Address</h2>
                            <form onSubmit={handleSubmit}>
                                {/* Address Title Section */}
                                <div className="mb-4">
                                    <h3 className="block text-sm font-medium text-gray-700 mb-2  mt-12 py-12">ADDRESS TITLE</h3>
                                    <div className="flex space-x-4">
                                        <div
                                            onClick={() => handleTitleClick('home')}
                                            className={`cursor-pointer p-2 border rounded-md flex-1 text-center ${formData.address_title === 'home' ? 'bg-[#1e293b] text-white' : 'bg-gray-200 text-gray-700'}`}
                                        >
                                            🏚️ Home
                                        </div>
                                        <div
                                            onClick={() => handleTitleClick('office')}
                                            className={`cursor-pointer p-2 border rounded-md flex-1 text-center ${formData.address_title === 'office' ? 'bg-[#1e293b] text-white' : 'bg-gray-200 text-gray-700'}`}
                                        >
                                            🏢 Office
                                        </div>
                                        <div
                                            onClick={() => handleTitleClick('other')}
                                            className={`cursor-pointer p-2 border rounded-md flex-1 text-center ${formData.address_title === 'other' ? 'bg-[#1e293b] text-white' : 'bg-gray-200 text-gray-700'}`}
                                        >
                                            👥 Other
                                        </div>
                                    </div>
                                </div>

                                {/* Other Title Input */}
                                {formData.address_title === 'other' && (
                                    <div className="mb-4">
                                        <label htmlFor="other_title" className="block text-sm font-medium text-gray-700 mb-1">
                                            Please specify Your Address Title
                                        </label>
                                        <input
                                            type="text"
                                            name="other_title"
                                            id="other_title"
                                            value={formData.other_title}
                                            onChange={handleChange}
                                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                        />
                                    </div>
                                )}

                                {/* First Name */}
                                <div className="mb-4">
                                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        id="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                {/* Last Name */}
                                <div className="mb-4">
                                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        id="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                {/* Door Number */}
                                <div className="mb-4">
                                    <label htmlFor="door_no" className="block text-sm font-medium text-gray-700 mb-1">
                                        Door Number
                                    </label>
                                    <input
                                        type="text"
                                        name="door_no"
                                        id="door_no"
                                        value={formData.door_no}
                                        onChange={handleChange}
                                        className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                {/* Postal Address 1 */}
                                <div className="mb-4">
                                    <label htmlFor="postal_address1" className="block text-sm font-medium text-gray-700 mb-1">
                                        Postal Address 1
                                    </label>
                                    <input
                                        type="text"
                                        name="postal_address1"
                                        id="postal_address1"
                                        value={formData.postal_address1}
                                        onChange={handleChange}
                                        className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                {/* Postal Address 2 */}
                                <div className="mb-4">
                                    <label htmlFor="postal_address2" className="block text-sm font-medium text-gray-700 mb-1">
                                        Postal Address 2
                                    </label>
                                    <input
                                        type="text"
                                        name="postal_address2"
                                        id="postal_address2"
                                        value={formData.postal_address2}
                                        onChange={handleChange}
                                        className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                {/* Landmark */}
                                <div className="mb-4">
                                    <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-1">
                                        Landmark
                                    </label>
                                    <input
                                        type="text"
                                        name="landmark"
                                        id="landmark"
                                        value={formData.landmark}
                                        onChange={handleChange}
                                        className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                {/* Pincode */}
                                <div className="mb-4">
                                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                                        Pincode
                                    </label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        id="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                {/* State Dropdown */}
                                <div className="mb-4">
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                        State
                                    </label>
                                    <select
                                        name="state"
                                        id="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                        required
                                    >
                                        <option value="">Select State</option>
                                        {/* Add more state options here */}
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="West Bengal">West Bengal</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                        <option value="Ladakh">Ladakh</option>
                                    </select>
                                </div>

                                {/* City */}
                                <div className="mb-4">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                {/* Contact Number */}
                                <div className="mb-4">
                                    <label htmlFor="contact_no" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Number
                                    </label>
                                    <input
                                        type="text"
                                        name="contact_no"
                                        id="contact_no"
                                        value={formData.contact_no}
                                        onChange={handleChange}
                                        className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2 mt-4 text-white bg-[#0f172a] rounded-md hover:bg-[#030712] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? 'Updating...' : 'Add Address'}
                                </button>
                                {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {selectedAddress && (
                <div className="  p-4 bg-[#fafafa] shadow-md mt-4">
                    <h4 className="text-lg font-semibold">Your product will be delivered to :</h4>
                    <p>{selectedAddress.firstname} {selectedAddress.lastname}</p>
                    <p>{selectedAddress.postal_address1}, {selectedAddress.postal_address2}</p>
                    <p>{selectedAddress.door_no}, {selectedAddress.landmark}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.pincode}</p>
                    <p>Contact: {selectedAddress.contact_no}</p>
                </div>
            )}
            
        </div>

            <div className='w-full lg:w-1/4'>
            <div className="flex flex-col p-6 border-b bg-[#ecfdf5] shadow-sm rounded-lg rounded-md">
  {cartItems.length > 0 && (
    <>

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 mt-4 ">Cart Summary</h2>
      <p className=" text-gray-700"><b>Price:</b> ({cartItems.length}): <span className="text-green-600">₹{totalRegularPrice.toFixed(2)}</span></p>
      <p className="  text-gray-700"><b>Total Discount:</b> <span className="text-red-600">-₹{totalDiscount.toFixed(2)}</span></p>
      <p className="  text-gray-800"><b>Delivery: </b><span className="text-[#65a30d]">₹60</span></p>
      <p className=" text-gray-800"><b>Total Amount:</b> <span className="text-[#1e3a8a]">₹{totalDiscountedPrice.toFixed(2) }</span></p>

    

    </>
  )}
</div>
            
            </div>
    
          </div>
{/* Payment section */}



    {/* <PaymentSystem/> */}
    
      <h2 className="text-xl font-bold mb-4 mt-3 text-[#1e293b] mx-4">2.Payment </h2>
    <PaymentSystem/>
        </>
    );
};

export default Page;
