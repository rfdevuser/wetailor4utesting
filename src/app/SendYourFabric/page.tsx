"use client";
import { GET_CUSTOMER_ADDRESSES_BY_USER_ID, GET_FABRIC_PICKUP_DETAILS_BY_USER_ID } from '@/utils/gql/GQL_QUERIES';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { app } from '@/firebase.config';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ADD_FABRIC_PICKUP } from '@/utils/gql/GQL_MUTATIONS';

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

const SendYourFabric = () => {
    const [showMore, setShowMore] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
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
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [fabricDetails, setFabricDetails] = useState({
        fabric_type: '',
        fabric_colour: '',
        quantity: '',
        description: '',
        pickup_date: ''
    });
    const [phoneNumber,setPhoneNumber] = useState('')
    const [imageError, setImageError] = useState(false); // State for image upload validation
    const [loadingMutation, setLoadingMutation] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false); // Add this line

    const [addFabricPickup, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_FABRIC_PICKUP);
   
    useEffect(() => {
        const id = localStorage.getItem('userId');
        if (id) setUserId(id);
        const savedPhoneNumber = localStorage.getItem('phoneNumber');
        if (savedPhoneNumber) {
            setPhoneNumber(savedPhoneNumber);
        }
    }, []);

    const { loading: queryLoading, error: queryError, data } = useQuery(GET_CUSTOMER_ADDRESSES_BY_USER_ID, {
        variables: { userId },
        skip: !userId,
    });
    const { loading, error: pickuperror, data: pickupdata } = useQuery(GET_FABRIC_PICKUP_DETAILS_BY_USER_ID, {
        variables: { userID: userId }, // Use userID instead of userId
        skip: !userId, // This will skip the query if userId is null
    });
      console.log(pickupdata,"pickupdata")
      console.log(pickuperror,"pickuperror")
    const handleAddressSelect = (address: any) => {
        setSelectedAddress(address);
        setFormData(address);
        localStorage.setItem('selectedAddress', JSON.stringify(address));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            uploadImageToFirebase(file);
        }
    };

    const uploadImageToFirebase = async (file: File) => {
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${file.name}`);
        setIsUploading(true); // Start uploading

        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setImageURL(url); // Store the URL for use
            console.log('Image uploaded successfully:', url); // Log the URL
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploading(false); // End uploading
        }
    };

    const handleFabricChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFabricDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedAddress) {
            alert('Please select a pickup address before submitting.');
            return;
        }
        if (!imageURL) {
            setImageError(true);
            return;
        }
        setImageError(false);
        setLoadingMutation(true);
        
        try {
            await addFabricPickup({
                variables: {
                    userID: userId,
                    fabricType: fabricDetails.fabric_type,
                    fabricColour: fabricDetails.fabric_colour,
                    fabricQuantity: fabricDetails.quantity,
                    description: fabricDetails.description,
                    imageLink: imageURL,
                    address: `${selectedAddress?.address_title || ''}, ${selectedAddress?.door_no || ''}, ${selectedAddress?.postal_address1 || ''}, ${selectedAddress?.postal_address2 || ''}, ${selectedAddress?.landmark || ''}, ${selectedAddress?.city || ''}, ${selectedAddress?.state || ''}, ${selectedAddress?.pincode || ''}`.trim(),
                    pickupDate: fabricDetails.pickup_date,
                    contactNo: selectedAddress?.contact_no || '',
                    status: 'pickup generated',
                },
            });
    
            alert("Pickup scheduled successfully!");
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
    
            setFabricDetails({
                fabric_type: '',
                fabric_colour: '',
                quantity: '',
                description: '',
                pickup_date: ''
            });
    
            setSelectedImage(null);
            setImageURL(null);
            setSubmissionSuccess(true); // Optionally indicate success
        } catch (error) {
            console.error("Error submitting fabric pickup details:", error);
        } finally {
            setLoadingMutation(false); // Ensure loading state is reset here
        }
    };
    

    if (queryError) {
        return <p>Error loading addresses: {queryError.message}</p>;
    }

    const addresses = data?.wetailor4uCustomerAddressesByUserId || [];

    return (
        <>
            <div className="flex flex-col items-center justify-center bg-gray-100 p-10 rounded-lg shadow-lg mb-8">
                <h1 className="text-3xl font-bold text-center text-[#172554] mb-4">Transform Your Wardrobe</h1>
                <h2 className="text-lg text-center text-gray-700 mb-6">We pick up your garments for <b>free</b>, customize them with our expert designers, and deliver them back to you!</h2>
                <p className="text-center text-gray-500">
                    <u className='text-blue-800 text-bold'>
                        <Link href='/chatLanguageSelectionPage'><b>Chat</b></Link>
                    </u> with our experienced fashion designers, share your designs, and let us create the perfect fit for you!
                </p>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-4 text-[#1e293b]">Select your Pickup address</h2>
                <div className="space-y-4">
                    {queryLoading ? (
                        <Shimmer />
                    ) : (
                        addresses.slice(0, showMore ? addresses.length : 1).map((address: any) => (
                            <div
                                className={`p-4 border rounded-lg cursor-pointer hover:bg-[#ecfdf5] ${selectedAddress?.id === address.id ? 'border-[#334155]' : 'border-gray-200'}`}
                                key={address.id}
                                onClick={() => handleAddressSelect(address)}
                            >
                                <h3 className="text-lg font-semibold">{address.address_title}</h3>
                                <p className="text-gray-700">{address.firstname} {address.lastname}</p>
                                <p className="text-gray-700">{address.postal_address1}, {address.postal_address2}</p>
                                <p className="text-gray-600">{address.door_no}, {address.landmark}, {address.city}, {address.state}, {address.pincode}</p>
                                <p className="text-gray-600">Contact: {address.contact_no}</p>
                            </div>
                        ))
                    )}
                </div>
                {!showMore && addresses.length > 1 && (
                    <button onClick={() => setShowMore(true)} className="mt-4 text-blue-600 hover:underline">
                        Show More 🔽
                    </button>
                )}
                {showMore && addresses.length > 1 && (
                    <button onClick={() => setShowMore(false)} className="mt-4 text-blue-600 hover:underline flex justify-center">
                        Show Less 🔼
                    </button>
                )}
                <Link href='/CustomerAddress'>
                    <button className='bg-gray-400 text-white p-2 rounded-md m-4'>Add address</button>
                </Link>
            </div>

            {selectedAddress && (
                <div className="p-4 bg-[#fafafa] shadow-md rounded-md">
                    <h4 className="text-lg font-semibold">We will pickup from this address:</h4>
                    <p>{selectedAddress.firstname} {selectedAddress.lastname}</p>
                    <p>{selectedAddress.postal_address1}, {selectedAddress.postal_address2}</p>
                    <p>{selectedAddress.door_no}, {selectedAddress.landmark}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.pincode}</p>
                    <p>Contact: {selectedAddress.contact_no}</p>
                </div>
            )}

            {/* Image Upload Section */}
            <div className="mt-6 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2">Upload Your Product Image</h3>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="border p-2 rounded" 
                />
                {isUploading && (
                    <p className="mt-2 text-blue-600">Please wait, uploading...</p>
                )}
                {imageURL && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold">Image Preview:</h4>
                        <img src={imageURL} alt="Uploaded" className="mt-2 w-48 h-48 object-cover" />
                    </div>
                )}
                {selectedImage && (
                    <div className="mt-2">
                        <p>Uploaded Image: {selectedImage.name}</p>
                    </div>
                )}
            </div>

            {/* Fabric Details Form */}
            <form onSubmit={handleSubmit} className="w-full lg:w-1/2 mx-auto mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Fabric Details</h3>
                <div className="flex flex-col space-y-4">
                    <input 
                        type="text" 
                        name="fabric_type" 
                        placeholder="Fabric Type*" 
                        value={fabricDetails.fabric_type} 
                        onChange={handleFabricChange} 
                        className="border p-2 rounded" 
                        required 
                    />
                    <input 
                        type="text" 
                        name="fabric_colour" 
                        placeholder="Fabric Colour*" 
                        value={fabricDetails.fabric_colour} 
                        onChange={handleFabricChange} 
                        className="border p-2 rounded" 
                        required 
                    />
                    <input 
                        type="text" 
                        name="quantity" 
                        placeholder="Quantity*" 
                        value={fabricDetails.quantity} 
                        onChange={handleFabricChange} 
                        className="border p-2 rounded" 
                        required 
                    />
                    <input 
                        type="text" 
                        name="description" 
                        placeholder="Description (optional)" 
                        value={fabricDetails.description} 
                        onChange={handleFabricChange} 
                        className="border p-2 rounded" 
                    />
                    <input 
                        type="date" 
                        name="pickup_date" 
                        placeholder="Pickup Date*" 
                        value={fabricDetails.pickup_date} 
                        onChange={handleFabricChange} 
                        className="border p-2 rounded" 
                        required 
                    />
                </div>
                {imageError && (
                    <p className="text-red-500 mt-2">Please upload an image before submitting.</p>
                )}
                <div className='flex justify-center'>
                <button type="submit" className="mt-4 bg-[#1f2937] hover:bg-[#09090b] text-white p-2 rounded">
    {loadingMutation ? 'Please Wait...' : submissionSuccess ? 'Schedule Pick up' : 'Schedule Pick up'}
</button>
</div>
            </form>
            


            {pickupdata && pickupdata.wetailor4uFabricPickupDetails && pickupdata.wetailor4uFabricPickupDetails.length > 0 && (
    <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Fabric Pickup Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pickupdata.wetailor4uFabricPickupDetails.map((item:any) => (
                <div key={item.userID} className="border p-4 rounded shadow-md">
                    <img src={item.image_link} alt={item.fabric_type} className="w-full h-48 object-cover rounded mb-2" />
                    <h4 className="font-semibold">Fabric Type: {item.fabric_type}</h4>
                      <p>Fabric Colour:{item.fabric_colour}</p>
                    <p>Quantity: {item.fabric_quantity}</p>
                    <p>Pickup Date: {item.pickup_date}</p>
                    <p className='text-red-800'>Pickup Status: {item.status}</p>
                </div>
            ))}
        </div>
    </div>
)}

        </>
    );
}

export default SendYourFabric;
