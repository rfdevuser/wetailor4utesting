
import { FaInstagram, FaLinkedin, FaFacebookF } from 'react-icons/fa'; 
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scroll
    });
};
  return (
    <>
    <div className="w-screen flex justify-center bg-[#748b97] p-4 text-white cursor-pointer" onClick={scrollToTop}><b>Back to Top</b></div>
    <footer className="bg-[#d1d5db] dark:bg-gray-700 text-black py-8 "  >
    
      <div className="max-w-screen-xl mx-auto px-4">
    
        <div className="flex flex-col md:flex-row md:justify-center sm:justify-center">
        <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-2">Get to know us</h3>
            <p className="hover:text-[#4338ca] cursor-pointer">About us</p>
            <p className="hover:text-[#4338ca] cursor-pointer">career</p>
            <p className="hover:text-[#4338ca] cursor-pointer">Onati Global</p>
            <p className="hover:text-[#4338ca] cursor-pointer">Rebble Bee</p>
            <p className="hover:text-[#4338ca] cursor-pointer">OGIFT</p>
          </div>
          
          
          {/* Contact Info */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-2 border-t border-gray-300">Connect with us</h3>
            <p className="hover:text-[#4338ca] cursor-pointer">customercare: customercare@onatiglobal.com</p>
            <p className="hover:text-[#4338ca] cursor-pointer">Phone: +91 9916214043</p>
            <div className="flex mt-4 space-x-4">Social- 
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#4338ca] hover:text-[#2c3e50]">
                  <FaInstagram size={24} />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#4338ca] hover:text-[#2c3e50]">
                  <FaLinkedin size={24} />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#4338ca] hover:text-[#2c3e50]">
                  <FaFacebookF size={24} />
                </a>
              </div>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-2">Let us help you</h3>
            <p className="hover:text-[#4338ca] cursor-pointer">Cancellation and Return Policy</p>
            <p className="hover:text-[#4338ca] cursor-pointer">Privacy Policy</p>
            <p className="hover:text-[#4338ca] cursor-pointer">Fabric Policy</p>
            <p className="hover:text-[#4338ca] cursor-pointer">Terms of use</p>
            <p className="hover:text-[#4338ca] cursor-pointer">Track Your Order</p>
            <p className="hover:text-[#4338ca] cursor-pointer">Your account</p>
            <p className="hover:text-[#4338ca] cursor-pointer">Wash Care</p>
          </div>
         {/* Address Section */}
         <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Our Address</h3>
            <p>Rakhis Fashions</p>
            <p>19 , 2nd floor , 1st cross B-Block,</p>
            <p>4th main road Vinayaka Nagar , HAL Airport road</p>
            <p>Bengaluru, Karnataka 560017</p>
          </div>
        </div>

      
 

      </div>
    </footer>
    <div className='flex justify-between items-center p-2 bg-[#d4d4d4] border-t-2 border-gray-800'>
  <div className='flex-1 text-center text-[#4b5563]'>© 2009-present Rakhis Fashions</div>
  <div className='ml-4 text-[#4b5563]'>This site is protected by copyright and trade mark laws.</div>
</div>


    </>
  );
};

export default Footer;
