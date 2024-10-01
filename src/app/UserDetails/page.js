"use client";

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { updateFormData, resetFormData } from '@/redux/reducers/formReducer';
import { auth } from '@/firebase.config'; 
import 'firebase/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Form = () => {
    const dispatch = useDispatch();
    const formData = useSelector(state => state.form.formData);
    const router = useRouter();
    const isFormSubmitted = useRef(false); // Track form submission

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

    const handleSubmit = (event) => {
        event.preventDefault();
        isFormSubmitted.current = true; // Mark the form as submitted
        const emailToSave = formData.email || email;
        localStorage.setItem('email', emailToSave || '');
        router.push('/'); // Redirect after submission
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
        <section className="bg-white flex flex-col items-center justify-center h-screen text-white-800"style={{ 
            backgroundImage: "url('/Backgrounds/loginbackground.jpg')", 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center' 
          }} >
            <div className="text-center mb-6">
        <h1 className="text-white text-3xl font-bold">Open the gateway to your tailored world</h1>
      </div>
            <div className="w-100 flex flex-col items-center gap-6 rounded-lg p-12 border-black shadow-xl bg-opacity-75 backdrop-filter backdrop-blur-md mt-6 mb-6" style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h1 className="text-center leading-normal text-black font-medium text-xl mb-6 bg-white p-2 rounded-md">
                   Tell us your name 
                </h1>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <label className="block mb-2 text-white mt-6">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder='Enter your name'
                            className="ml-2 py-2 px-3 rounded border-double border-4 border-white w-full mt-4 text-white"
                        />
                    </label>

                    <label className="block mb-2 mt-6 text-white">
                        Email: 
                        <input
                            type="email"
                            name="email"
                            placeholder='Optional'
                            value={formData.email}
                            onChange={handleChange}
                            className="ml-2 py-2 px-3 rounded border border-gray-300 w-full text-white mt-4"
                        />
                    </label>

                    <button type="submit" className="py-2 px-4 mt-6 bg-blue-500 text-white rounded cursor-pointer w-full">
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Form;
