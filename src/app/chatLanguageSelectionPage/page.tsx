"use client";
import { BOOK_CHAT_SLOT, UPDATE_CHAT_INFO } from '@/utils/gql/GQL_MUTATIONS';
import { useMutation } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { TECollapse } from "tw-elements-react";

const ChatLanguageSelectionPage: React.FC = () => {
  const [updateChatInfo, { loading }] = useMutation(UPDATE_CHAT_INFO);
  const [bookChatSlot ,{loading:slotloading}] = useMutation(BOOK_CHAT_SLOT);
  const router = useRouter();
 const [activeElement, setActiveElement] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [contactInfo, setContactInfo] = useState('');
  useEffect(() => {
    const generateTimeSlots = () => {
      const slots: string[] = [];
      const startTime = new Date();
      startTime.setHours(10, 0, 0); // Start at 9 AM
      const endTime = new Date();
      endTime.setHours(21, 0, 0); // End at 10 PM
      
      for (let time = startTime; time <= endTime; time.setMinutes(time.getMinutes() + 15)) {
        slots.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
      setTimeSlots(slots);
    };

    const generateAvailableDates = () => {
      const dates: string[] = [];
      const today = new Date();
      dates.push(today.toISOString().split('T')[0]); // Today

      for (let i = 1; i <= 2; i++) {
        const nextDate = new Date();
        nextDate.setDate(today.getDate() + i);
        dates.push(nextDate.toISOString().split('T')[0]);
      }
      setAvailableDates(dates);
    };
    
    generateTimeSlots();
    generateAvailableDates();
    const savedPhoneNumber = localStorage.getItem('phoneNumber');
    if (savedPhoneNumber) {
      setContactInfo(savedPhoneNumber);
    }
  }, []);
  
  const handleLanguageSelect = async (language: string) => {
    setSelectedLanguage(language);

    const userId = localStorage.getItem('userId') || '';
    const mobile_no = localStorage.getItem('phoneNumber') || '';
    const storedName = localStorage.getItem('userName') || '';

    try {
      const { data } = await updateChatInfo({
        variables: {
          userID: userId,
          name: storedName,
          contact_no: mobile_no,
          language: language,
        },
      });

      if (data?.wetailor4uAddChatInfo?.responseMessage) {
        window.open(`https://chat-module-psi.vercel.app/Chat/${userId}`, '_blank');
      }
    } catch (error) {
      console.error('Mutation error:', error);
      router.push('/');
    }
  };

  const handleSlotSelect = async () => {
    if (!selectedSlot || !selectedDate) {
      alert('Please Select Date and Time');
      return;

        }    const userId = localStorage.getItem('userId') || '';

    const storedName = localStorage.getItem('userName') || '';
   

    try {
      const { data } = await bookChatSlot({
        variables: {
          userId: userId, // Make sure this is defined
          contact: contactInfo, // Or any appropriate contact value
          endTime: "0.00", // Adjust as necessary
          name: storedName, // Adjust as necessary
          schedulingDate: selectedDate, // Assuming selectedDate is in the correct format
          startTime: selectedSlot // Assuming selectedSlot is in the correct format
        },
      });
      
      
      console.log(data?.wetailor4uAddChatScheduling?.responseMessage, "Slot booking message");
      if (data?.wetailor4uAddChatScheduling?.responseMessage) {
        // Proceed to the chat or confirmation page
        alert('Your slot has been successfully booked.');
      }
    } catch (error) {
     alert('Error booking slot!please Try again Later');
    }
  };
  const handleClick = (value: string) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };
  const languages = ['Hindi', 'English', 'Telugu', 'Kannada'];
  return (
    <>
      <h2 className="text-3xl font-extrabold pb-6 text-[#18181b] text-center pt-6 bg-gray-200 ">
      🗪 Live Chat With Us
  
  </h2>
      <div className="flex flex-col md:flex-row items-center justify-center bg-gray-200">
    
        <div className="bg-[#ecfdf5] shadow-lg rounded-lg p-6 w-80">
          <h2 className="text-xl font-semibold mb-4 text-center">In Which Language you prefer to chat with us</h2>
          
          <h3 className='text-sm text-red-600 text-center'><b>Click for live chat with us</b></h3>
          <div className="grid grid-cols-2 gap-4">
            
            {languages.map((language) => (
              <button
                key={language}
                className={`p-4 rounded-lg text-center transition duration-300 
                  ${selectedLanguage === language ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={() => handleLanguageSelect(language)}
                disabled={loading}
              >
                {language}
              </button>
            ))}
          </div>
          {loading && (
            <div className="flex items-center justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="ml-2">Please wait! We are connecting to our best designer...</p>
            </div>
          )}
        </div>
        <div>
          <Image
            src='/Backgrounds/chatlanbg.png'
            alt='image'
            height={500}
            width={500}
            loading='lazy'
          />
        </div>
      </div>

      {/* Scheduling Section */}
      <div className="flex flex-col items-center mt-8 p-6 bg-white rounded-lg">
  <h2 className="text-3xl font-extrabold mb-6 text-[#18181b] text-center">
    🗓️ Schedule your appointment with our best designer
  
  </h2>
<div className=' border-2 border-gray-200 p-10 rounded-lg bg-[#ecfdf5] shadow-lg'>
  <div className="mb-6 w-full max-w-xs ">
    <label htmlFor="date" className="block mb-2 text-lg font-medium text-gray-700 text-center">Select Date:</label>
    <select
      id="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg bg-blue-50 text-gray-800 transition duration-300 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {availableDates.map(date => (
        <option key={date} value={date}>
          {new Date(date).toLocaleDateString()}
        </option>
      ))}
    </select>
    
  </div>

  <div className="mb-6 w-full max-w-xs">
    <label htmlFor="time" className="block mb-2 text-lg font-medium text-gray-700 text-center">Select Time Slot:</label>
    <select
      id="time"
      value={selectedSlot || ''}
      onChange={(e) => setSelectedSlot(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg bg-blue-50 text-gray-800 transition duration-300 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="" disabled>Select a time</option>
      {timeSlots.map(slot => (
        <option key={slot} value={slot}>
          {slot}
        </option>
      ))}
    </select>
  </div>
  <div className="mb-6 w-full max-w-xs">
        <label htmlFor="contact" className="block mb-2 text-lg font-medium text-gray-700 text-center">Contact Information:</label>
        <input
          type="text"
          id="contact"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          placeholder={contactInfo}
          className="w-full p-3 border border-gray-300 rounded-lg bg-blue-50 text-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
  <button
    onClick={handleSlotSelect}
    className="w-full max-w-xs bg-[#475569] text-white font-semibold p-3 rounded-lg shadow hover:bg-[#0f172a] transition duration-300"
    disabled={slotloading}
  >
    {slotloading ? 'Booking...' : 'Book Slot'}
  </button>
</div>

</div>
    {/* Accordian */}
   <div className='mb-3 flex justify-center text-2xl bg-white text-black'><b><u>FAQs</u></b></div>
    <div id="accordionExample">
        <div className="rounded-t-lg border border-neutral-200 bg-white text-black">
          <h2 className="mb-0" id="headingOne">
            <button
             className={`${
              activeElement === "element1" 
                ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                : `bg-white text-black`
            } group relative flex w-full items-center rounded-t-[15px] border-0 px-5 py-4 text-left text-base transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
            type="button"
              onClick={() => handleClick("element1")}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
         <strong className='bg-white text-black'>Who are we?</strong>    
              <span
                className={`${
                  activeElement === "element1"
                    ? `rotate-[-180deg] -mr-1`
                    : `rotate-0 fill-[#212529]  dark:fill-white`
                } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <TECollapse
            show={activeElement === "element1"}
            className="!mt-0 !rounded-b-none !shadow-none"
          >
            <div className="px-5 py-4 bg-white text-black">
            At B Spoke Brand, we specialize in creating made-to-measure garments tailored to meet the unique needs of each individual. Our commitment to quality craftsmanship ensures that every piece we produce reflects our dedication to both style and comfort.
<br/>
In addition to our bespoke offerings, we also provide wholesale and B2B garment solutions. Whether you are a retailer looking to enhance your collection or a business seeking high-quality apparel for your team, we offer a range of options to suit your needs.

With a focus on customer satisfaction and a passion for fashion, B Spoke Brand is your trusted partner in the garment industry. Explore our diverse range of products and let us help you bring your vision to life.
            </div>
          </TECollapse>
        </div>
      </div>
      <div className="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <h2 className="mb-0" id="headingTwo">
          <button
            className={`${
              activeElement === "element2"
                ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                : `transition-none rounded-b-[15px]`
            } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
            type="button"
            onClick={() => handleClick("element2")}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
        <strong className='bg-white text-black'>How is this chat feature helpful to me?</strong>   
            <span
              className={`${
                activeElement === "element2"
                  ? `rotate-[-180deg] -mr-1`
                  : `rotate-0 fill-[#212529] dark:fill-white`
              } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <TECollapse
          show={activeElement === "element2"}
          className="!mt-0 !rounded-b-none !shadow-none"
        >
          <div className="px-5 py-4 bg-white text-black">
          At B Spoke Brand, we take pride in offering personalized consultations with our expert designers. Our team is dedicated to understanding your unique requirements and bringing your vision to life.
<br/>
During your consultation, you can share your specific needs, and our designers will craft a tailored solution just for you. We will guide you through various fabric types, color combinations, and stylish options to ensure that the final product perfectly aligns with your preferences.
<br/>
Let us collaborate to create garments that truly reflect your style!
          </div>
        </TECollapse>
      </div>
      <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <h2 className="accordion-header mb-0" id="headingThree">
          <button
            className={`${
              activeElement === "element3"
                ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                : `transition-none rounded-b-[15px]`
            } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
            type="button"
            onClick={() => handleClick("element3")}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
          <strong className='bg-white text-black'>With whom will I be talking?</strong>  
            <span
              className={`${
                activeElement === "element3"
                  ? `rotate-[-180deg] -mr-1`
                  : `rotate-0 fill-[#212529] dark:fill-white`
              } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <TECollapse
          show={activeElement === "element3"}
          className="!mt-0 !shadow-none"
        >
          <div className="px-5 py-4 bg-white text-black">
          You will be talking with our top fashion designers, who are highly qualified and excel in their field. They are well-versed in the latest fashion trends and are dedicated to understanding your unique needs and body type.
<br/>
Our designers will provide personalized recommendations to help you find the best outfit that enhances your style and fits you perfectly. Your vision is our priority, and we are here to ensure you look and feel your best.
          </div>
        </TECollapse>
      </div>
   
      <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <h2 className="accordion-header mb-0" id="headingFour">
          <button
            className={`${
              activeElement === "element4"
                ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                : `transition-none rounded-b-[15px]`
            } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
            type="button"
            onClick={() => handleClick("element4")}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
          <strong className='bg-white text-black'>How will B2B benefit from this chat?</strong>  
            <span
              className={`${
                activeElement === "element4"
                  ? `rotate-[-180deg] -mr-1`
                  : `rotate-0 fill-[#212529] dark:fill-white`
              } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <TECollapse
          show={activeElement === "element4"}
          className="!mt-0 !shadow-none"
        >
          <div className="px-5 py-4 bg-white text-black" >
          With over a decade of experience in the industry, B Spoke Brand is well-equipped to guide your B2B business. Since our establishment in 2009, we have developed a deep understanding of the market, allowing us to identify the best quality fabrics at competitive prices that suit your specific needs.
<br/>
Our team includes top-notch designers who will work closely with you to create exceptional garments that reflect your brands vision. Additionally, our skilled production team ensures that your clothing is stitched to perfection and delivered on time, without compromising on quality.
<br/>
Partner with us to benefit from our expertise, exceptional design, and best pricing in the industry. We are here to support your business every step of the way!


          </div>
        </TECollapse>
      </div>        
    </>
  );
};

export default ChatLanguageSelectionPage;
