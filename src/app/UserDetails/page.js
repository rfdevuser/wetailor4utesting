"use client";

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { updateFormData, resetFormData } from '@/redux/reducers/formReducer';
import { auth } from '@/firebase.config'; 
import 'firebase/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useMutation } from '@apollo/client'; // Import useMutation
import { ADD_USER_INFO } from '@/utils/gql/GQL_MUTATIONS';
import Image from 'next/image';
 // Adjust the import path as necessary

const Form = () => {
    const dispatch = useDispatch();
    const formData = useSelector(state => state.form.formData);
    const router = useRouter();
    const isFormSubmitted = useRef(false); // Track form submission
    const [responseMessage, setResponseMessage] = useState('');
    const [PhoneNumber , setPhoneNumber] = useState('');
    const [addUserInfo, { loading, error }] = useMutation(ADD_USER_INFO, {
        onCompleted: (data) => {
            setResponseMessage(data.wetailor4uAddUserInfo.wetailor4u_responseMessage);
        },
        onError: (err) => {
            setResponseMessage(`Error: ${err.message}`);
        }
    });
    useEffect(() => {
      
     
  
        const savedPhoneNumber = localStorage.getItem('phoneNumber');
            if (savedPhoneNumber) {
                setPhoneNumber(savedPhoneNumber);
            }
  
  
  
         
    }, []);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/login');
            }
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, [router]);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        isFormSubmitted.current = true; // Mark the form as submitted
        const emailToSave = formData.email || ''; // Save email only if provided
        localStorage.setItem('email', emailToSave);
        
        try {
            await addUserInfo({ variables: { 
                userID: localStorage.getItem('userId'), // Assuming you save user ID in local storage
                name: formData.name,
                email: formData.email,
                contact: PhoneNumber // Ensure you have this field in your formData
            }});
            router.push('/'); // Redirect after mutation completion
        } catch (err) {
            console.error('Error adding user info:', err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch(updateFormData({ fieldName: name, fieldValue: value }));
    };

    // Use a listener to detect navigation
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (!isFormSubmitted.current) {
                handleLogout();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Track programmatic navigation
    useEffect(() => {
        const handleRouteChange = (url) => {
            if (!isFormSubmitted.current) {
                handleLogout();
            }
        };

        // This is a workaround since router.events is not available in the app directory
        const originalPush = router.push;
        router.push = async (url) => {
            await originalPush(url);
            handleRouteChange(url);
        };

        return () => {
            router.push = originalPush; // Restore original method on cleanup
        };
    }, [router]);

    return (
        <div className="flex  flex-col md:flex-row items-center justify-center"
            // style={{ 
            //     backgroundImage: "url('/Backgrounds/des2.jpg')", 
            //     backgroundSize: 'cover', 
            //     backgroundRepeat: 'no-repeat', 
            //     backgroundPosition: 'center' 
            // }}
            >
                
                <div className='w-full mb-8'>
            <div className="text-center mb-2">
                <h1 className="text-black text-3xl font-bold">Open the gateway to your tailored world</h1>
            </div>
            <div className="w-full flex flex-col items-center gap-6 rounded-lg p-12 border-black shadow-xl bg-gray-100 bg-opacity-75 backdrop-filter backdrop-blur-md mt-6 mb-6"
                style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h1 className="text-center leading-normal text-black font-medium text-xl mb-6 bg-white p-2 rounded-md">
                    Tell us your name 
                </h1>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <label className="block mb-2 text-black mt-6">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder='Enter your name'
                            className="ml-2 py-2 px-3 rounded border-double border-4 border-gray-300 w-full mt-4 text-black"
                        />
                    </label>

                    <label className="block mb-2 mt-6 text-black">
                        Email: 
                        <input
                            type="email"
                            name="email"
                            placeholder='Optional'
                            value={formData.email}
                            onChange={handleChange}
                            className="ml-2 py-2 px-3 rounded border border-gray-300 w-full text-black mt-4"
                        />
                    </label>

                   

                    <button type="submit" className="py-2 px-4 mt-6 bg-[#1e293b] hover:bg-[#0c0a09] text-white rounded cursor-pointer w-full">
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
                {responseMessage && <p className="mt-4 text-center">{responseMessage}</p>}
                {error && <p className="mt-4 text-red-500 text-center">{error.message}</p>}
            </div>
            </div>
            <div className='w-full'>
                <Image
    src='/Backgrounds/userpagesvg.jpg'
    alt="Login"
    height={700}
    width={700}
    
    />
                </div>
        </div>
    );
};

export default Form;
