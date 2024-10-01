"use client"
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_CUSTOMER_ADDRESS_BY_ID, UPDATE_CUSTOMER_ADDRESS } from '@/utils/gql/GQL_MUTATIONS';
import { GET_CUSTOMER_ADDRESSES_BY_USER_ID } from '@/utils/gql/GQL_QUERIES';

interface FormData {
  address_title: string;
  firstname: string;
  lastname: string;
  door_no: string;
  postal_address1: string;
  postal_address2: string;
  landmark: string;
  pincode: string;
  state: string;
  city: string; // Added city
  contact_no: string;
  other_title?: string; // Optional field for the custom title
}

const CustomerAddressForm: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    address_title: 'home', // Default to "home"
    firstname: '',
    lastname: '',
    door_no: '',
    postal_address1: '',
    postal_address2: '',
    landmark: '',
    pincode: '',
    state: '',
    city: '', // Initialize city
    contact_no: '',
    other_title: '',
  });

 

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) setUserId(id);
  }, []);

  const [updateCustomerAddress, { loading, error }] = useMutation(UPDATE_CUSTOMER_ADDRESS);
  const [DeleteCustomerAddressById,{loading:Deleteloading , error:deleteError}] = useMutation(DELETE_CUSTOMER_ADDRESS_BY_ID)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { address_title, other_title } = formData;
    const titleToSubmit = address_title === 'other' ? other_title : address_title;

    try {
      await updateCustomerAddress({
        variables: { userId, ...formData, address_title: titleToSubmit },
      });
      setFormData({
        address_title: 'home', // Reset to default
        firstname: '',
        lastname: '',
        door_no: '',
        postal_address1: '',
        postal_address2: '',
        landmark: '',
        pincode: '',
        state: '',
        city: '',
        contact_no: '',
        other_title: '',
      });
      refetch();
      alert('Address updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error updating address: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleTitleClick = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      address_title: title,
      other_title: title === 'other' ? prev.other_title : '', // Clear other_title if not selecting "other"
    }));
  };


 

  // Use the query
  const { loading:loadingaddress, error:loadingerror, data ,refetch } = useQuery(GET_CUSTOMER_ADDRESSES_BY_USER_ID, {
    variables: { userId },
    skip: !userId, // Skip query if userId is not available
  });

console.log(data)
  // // Handle loading state
  // if (loading) return <p>Loading...</p>;

  // // Handle error state
  // if (error) return <p>Error: {error.message}</p>;

  const handleOnClick = async (id: string) => {
    console.log(id);
    try {
        await DeleteCustomerAddressById({ variables: { id } });
        refetch(); // Refetch addresses after deletion
        alert('Address deleted successfully!');
    } catch (error) {
        console.error(error);
        alert('Error deleting address: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
};

  const addresses = data?.wetailor4uCustomerAddressesByUserId || [];
  return (

    <>
 <div className=" max-w-full mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 flex justify-center text-[#1e293b]">Saved Addresses</h2>
      <div className="space-y-4">
        {addresses.map((address:any) => (
          <div className="p-4 border border-gray-200 rounded-lg" key={address.id}>
            <h3 className="text-lg font-semibold">{address.address_title}</h3>
            <p className="text-gray-700">
              {address.firstname} {address.lastname}
            </p>
            <p className="text-gray-700">
              {address.postal_address1} , {address.postal_address2}
            </p>
            <p className="text-gray-600">
              {address.door_no}, {address.landmark}, {address.city}, {address.state}, {address.pincode}
            </p>
            <p className="text-gray-600">Contact: {address.contact_no}</p>
            <button className=' text-[#dc2626] hover:text-[#7f1d1d]' onClick={()=>handleOnClick(address.id)}>Delete</button>
          </div>
          
        ))}
        
      </div>
  
    </div>
    
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#020617]">Update Your Address</h2>
      <form onSubmit={handleSubmit}>
        {/* Address Title Section */}
        <div className="mb-4">
          <h3 className="block text-sm font-medium text-gray-700 mb-2">ADDRESS TITLE</h3>
          <div className="flex space-x-4">
            <div
              onClick={() => handleTitleClick('home')}
              className={`cursor-pointer p-2 border rounded-md flex-1 text-center 
                ${formData.address_title === 'home' ? 'bg-[#1e293b] text-white' : 'bg-gray-200 text-gray-700'}`}
            >
            🏚️ Home
            </div>
            <div
              onClick={() => handleTitleClick('office')}
              className={`cursor-pointer p-2 border rounded-md flex-1 text-center 
                ${formData.address_title === 'office' ? 'bg-[#1e293b] text-white' : 'bg-gray-200 text-gray-700'}`}
            >
             🏢 Office
            </div>
            <div
              onClick={() => handleTitleClick('other')}
              className={`cursor-pointer p-2 border rounded-md flex-1 text-center 
                ${formData.address_title === 'other' ? 'bg-[#1e293b]   text-white' : 'bg-gray-200 text-gray-700'}`}
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
  className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 md:p-3 lg:p-4"
  required
>
  <option value="">Select State</option>
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
          className="w-full py-2 mt-4 text-white bg-[#1f2937] rounded-md hover:bg-[#030712] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Address'}
        </button>
        {error && <p className="mt-2 text-red-500 text-sm">{error.message}</p>}
      </form>
    </div>
    </> 
  );
};

export default CustomerAddressForm;
