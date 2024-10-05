"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from "next/navigation";
import Link from "next/link";
import SearchBox from '../Assests/SearchBox';
import { updateFormData } from '@/redux/reducers/formReducer';
import DropdownMenu from '@/components/Assests/DropdownMenu';

// NavBar Component
const NavBar: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.cart); // Access cart state
  const userName = useSelector((state: any) => {
    const fullName = state.form.formData.name;
    return fullName ? fullName.split(' ')[0] : '';
});


  // Handle mouse enter and leave for dropdown

  
  // Timers to manage delay
  let enterTimer:any, leaveTimer:any;

  const handleMouseEnter = () => {
    clearTimeout(leaveTimer); // Clear the leave timer
    enterTimer = setTimeout(() => {
      setShowDropdown(true);
    }, 200); // Delay before showing the dropdown
  };

  const handleMouseLeave = () => {
    clearTimeout(enterTimer); // Clear the enter timer
    leaveTimer = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // Delay before hiding the dropdown
  };

  // Close mobile menu when a nav link is clicked
  const handleNavLinkClick = () => setNavbarOpen(false);

  // Sticky navbar
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  // Load and update username from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      dispatch(updateFormData({ fieldName: 'name', fieldValue: storedName }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
    } else {
      localStorage.removeItem('userName');
    }
  }, [userName]);

  
  // Calculate the number of items in the cart
 
  const cartItems = useSelector((state: any) => state.cart.items); // Adjust this based on your state structure

  // Calculate the number of items in the cart
  const itemCount = cartItems ? cartItems.length : 0;
  return (
    <nav>
      <div className={`relative ${sticky ? 'sticky top-0 z-50' : ''}`}>
        {/* Top Section: Logo, Login, and Cart Buttons */}
        {/* <div className='bg-gradient-to-br from-[#FACBEA] to-[#FFE4D6]'> */}
        <div className='bg-[#f1f5f9]'>
          <div className="flex justify-between items-center py-2">
            <div className="text-white text-xl font-bold flex items-center mx-auto justify-center">
              <Link href='/'>
              <Image
                src='/images/logo/logo-4u.png'
                alt='wetailor4u_logo'
                width={80}
                height={60}
              />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {userName ? (
                // If userName is available (user is logged in), show welcome message
                <span
                  className="text-black hover:text-blue-800 text-sm mr-2 cursor-pointer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <b><u>Welcome {userName} 🔻</u></b>
                  {showDropdown && <DropdownMenu />}
                </span>
              ) : (
                // If userName is not available (user is not logged in), show user icon
                <Link href='/MobileAuth'>
                  <button className="text-white bg-[#e2e2e2] px-4 py-1 rounded-full hover:bg-[#fda4af]">
                    <Image
                      src='/images/icons/user.png'
                      alt='user_icon'
                      width={30}
                      height={30}
                      loading='lazy'
                    />
                  </button>
                </Link>
              )}
              <Link href='/Cart'>
              {itemCount > 0 && (
                    <div className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {itemCount}
                    </div>
                  )}
                <button className="relative text-white bg-[#e2e2e2] px-2 py-1 rounded-full hover:bg-[#fda4af]">
                  <Image
                    src='/images/icons/add-to-cart.png'
                    alt='cart_logo'
                    width={30}
                    height={30}
                    loading='lazy'
                  />
                  {/* Display item count badge */}
                
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className='w-full border-t border-white'></div>
        <div className='bg-white'>
          <div className='w-full flex justify-center text-black bg-white shadow-xl mt-1 mb-1'>
            <div className='lg:w-1/2 md:w-full sm:w-full '>
              <SearchBox />
            </div>
          </div>
        </div>
        {/* Bottom Section: Menu Items */}
        {/* Add your menu items here */}
      </div>
    </nav>
  );
};

export default NavBar;
