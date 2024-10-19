  "use client"
import { sendEmail } from "@/email/email";

  import { CREATEORDER, INSERT_ORDER_HISTORY, UPDATE_CUSTOMER_ORDER } from "@/utils/gql/GQL_MUTATIONS";
  import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
  import { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";

  export default function PaymentSystem() {
    const router = useRouter(); 
    const [amount, setAmount] = useState("1");
    const [email, setEmail] = useState('');
    const userName = useSelector((state) => state.form.formData.name);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [orderId , setOrderId] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [customerNotes, setCustomerNotes] = useState('');
    const [userID, setUserID] = useState('');
    const cartItems = useSelector((state) => state.cart.items);
    // const dispatch = useDispatch();

    useEffect(() => {
      // Retrieve the email from local storage
      const savedEmail = localStorage.getItem('email');
      if (savedEmail) {
          setEmail(savedEmail);
      }

      
      const savedPhoneNumber = localStorage.getItem('phoneNumber');
          if (savedPhoneNumber) {
              setPhoneNumber(savedPhoneNumber);
          }
const saveduserID = localStorage.getItem('userId') || '';
if(saveduserID){
  setUserID(saveduserID)
}

          const storedAddress = localStorage.getItem('selectedAddress');
        if (storedAddress) {
            setSelectedAddress(JSON.parse(storedAddress));
        }

       
  }, []);
useEffect(()=>{
  const token = localStorage.getItem('token');
  if(!token){
    router.push('/MobileAuth');
  }
  
},[])

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

    var orderitem = {productId:0,name:"",quantity:0,total:0.00}   

// var mlineitems = []
const mlineitems = cartItems.map((item) => {
  // Convert total to a string after calculating it
  const total = item.price ? (parseFloat(item.price) || 0).toFixed(2) : "0.00"; // Ensure it's formatted to two decimal places
  return {
      productId: item.pid ? Number(item.pid) : "0", // Convert to string
      name: item.name || "",                          // Name as string
      quantity: item.quantity ? Number(item.quantity) : 1, // Convert to number
      total: String(total) // Ensure total is a string
  };
});
console.log(mlineitems,"ml")
var shippingLines = [{methodId: "IN", methodTitle:"Local", total: "60.00"}]
    const totalRegularPrice = cartItems.reduce((acc, item) => acc + Number(item.RegPrice), 0);
    const totalDiscountedPrice = cartItems.reduce((acc, item) => acc + Number(item.price), 0);
    const totalDiscount = totalRegularPrice - totalDiscountedPrice + 60;
    const [insertOrderHistory, { data, loading, error }] = useMutation(INSERT_ORDER_HISTORY);
    console.log(error,"errorer")
    const [doCreateOrder, { loading: oloading, error: oerror }] = useMutation(CREATEORDER, {
      onCompleted: async (odata) => {
          console.log(odata);

        console.log(typeof orderId , typeof userID)
          insertOrderHistory({ variables: { userID:userID, orderID:orderId } });
          alert(`Order Created. We have emailed your Order Details`);
          try {
            const emailData = {
                to_email: email, // Replace with your account team's email
                from_name: 'WeTailor4U',
                to_name: userName,
                reply_to: 'no-reply@wetailor4u.com',
                subject: 'Order Created Successfully',
                message: `Thank you for choosing to shop with us! We truly appreciate your support and trust in our products. Your satisfaction is our top priority, and we hope you’re delighted with your purchase.\n Here are your order details: 
                Order ID: ${orderId}, 
             
               `,
            };

            await sendEmail(emailData);
        } catch (emailErr) {
            console.error("Failed to send error notification email:", emailErr);
            
        }
      },
      onError: async (err) => {
          console.error("We regret to inform you that there was an error in creating your order. Please rest assured that your refund will be processed and should be reflected in your account within 3 to 5 business days.");
          
          try {
              const emailData = {
                  to_email: 'accounts@rakhisfashions.com', // Replace with your account team's email
                  from_name: 'WeTailor4U',
                  to_name: 'Accounts',
                  reply_to: 'no-reply@wetailor4u.com',
                  subject: 'Order Creation Error Notification',
                  message: `
                  I am writing to inform you that one of our customers has encountered an issue with a recent transaction, which has unfortunately failed. Could you please verify this matter with the accounts team and initiate the refund process at your earliest convenience? \n An error occurred while creating an order. Please initiate a refund.\n\nError Details: ${err.message}\nCustomer Details:\nName: ${userName}\nEmail: ${email}\nPhone: ${phoneNumber}\nAddress: ${JSON.stringify(selectedAddress)}\n\nPlease take necessary actions.`,
              };
  
              await sendEmail(emailData);
          } catch (emailErr) {
              console.error("Failed to send error notification email:", emailErr);
            
          }
      }
  });
  
    const [updateCustomerOrder] = useMutation(UPDATE_CUSTOMER_ORDER);
    const handleonsubmit = async () => {
      console.log("checkout mutation get called");
    
      // Check for payment types in cartItems
      const hasFullPayment = cartItems.some(item => item.slug && item.slug.includes('full_payment'));
      const hasAdvancePayment = cartItems.some(item => item.slug && item.slug.includes('advance_payment'));
     

      

      try {
        // Call the order creation mutation
        const response = await doCreateOrder({
          variables: {
            input: {
              address1: selectedAddress.door_no + selectedAddress.postal_address1,
              address2: selectedAddress.postal_address2,
              city: selectedAddress.city,
              email: email,
              firstName: selectedAddress.firstname,
              lastName: selectedAddress.lastname,
              phone: selectedAddress.contact_no,
              postcode: selectedAddress.pincode,
              state: selectedAddress.state,
              country: 'IN',
              overwrite: true,
            },
            shippingInput: {
              firstName: selectedAddress.firstname,
              lastName: selectedAddress.lastname,
              address1: selectedAddress.door_no + selectedAddress.postal_address1,
              address2: selectedAddress.postal_address2,
              city: selectedAddress.city,
              postcode: selectedAddress.pincode,
              state: selectedAddress.state,
              country: 'IN',
              overwrite: true,
            },
            lineItems: mlineitems,
            isPaid: true,
            paymentMethod: 'Razorpay Card Payment',
            status: 'PROCESSING',
            customerNotes: customerNotes,
            shippingLines: shippingLines,
          },
        });
    console.log(response)
    const orderIdResponse = response.data.createOrder.orderId;
    setOrderId(String(orderIdResponse));
    const uid = cartItems.length > 0 && cartItems[0].slug ? cartItems[0].slug.split('/')[0] : null;

    let status;
console.log(uid,"uid from final checkout")
    if (hasAdvancePayment) {
      status = 'halfpaid'; // Set status for advance payment
     
    } else if (hasFullPayment) {
      status = 'paid'; // Set status for full payment
    
    }
console.log(status,"status")
    // Call the GraphQL mutation to update the customer order
    if (status) {
      console.log("insidestatus")
      const orderid = response.data.createOrder.orderId; // Update this line
      console.log(uid)
      await updateCustomerOrder({
        variables: {
          uid,
          status,
          orderid: String(orderid), 
        },
      });
    }

  } catch (error) {
    console.error("Order creation failed:", error);
  }
};

    const payNow = async () => {
      if (!selectedAddress || Object.keys(selectedAddress).length === 0) {
        return alert("Please select an address before proceeding to payment");
      }
      if (!amount) return alert("Please enter an amount");

      try {
        // Create order by calling the server endpoint
        const response = await fetch("/api/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            currency: "INR",
            receipt: "receipt#1",
            notes: {},
          }),
        });

        const order = await response.json();

        // Open Razorpay Checkout
        const options = {
          key: "rzp_live_sCxaf0020ub9NP", //rzp_test_PgdcAVbkK0t1Ue
          amount: totalDiscountedPrice*100,
          currency: order.currency,
          name: "WeTailor4U",
          description: "Test Transaction",
          image: "/images/logo/wetailor4u.png",
          order_id: order.id, // This is the order_id created in the backend
          // callback_url: "/api/verify-payment", // Your success URL
          prefill: {
            name: userName,
            email: email,
            contact: phoneNumber,
          },
          theme: {
            color: "#0f172a",
          },
          handler: function (response) {
           
        
            
 
            handleonsubmit();
           


          },
          

          
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Error:", error);
        alert("Error creating order");
      }
    };
  if(oloading){
    return(
      <p className="text-2xl flex justify-center text-center  bg-clip-text text-transparent bg-gradient-to-t from-[#111827] to-[#075985] mt-8 mb-8"><b>Please Wait...Creating Your Order</b></p>
    )
  }
  if(loading){
return(
  <p className="text-2xl flex justify-center text-center  bg-clip-text text-transparent bg-gradient-to-t from-[#111827] to-[#075985] mt-8 mb-8"><b>Almost Done..</b></p>
)

  }
    return (
      <>
      <div className='mt-4 w-full'>
        <h2 className=' flex justify-center'>Is there anything you’d like to share with us?</h2>
    <textarea
        value={customerNotes}
        onChange={(e) => setCustomerNotes(e.target.value)}
        placeholder="We value every piece of feedback and actively work to implement it."
      className='border-2 border-gray-200 w-2/3 flex justify-center mx-auto'
      />
      </div>
      <div className="flex justify-center">
    
    
          <button className="w-1/2  mt-4 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition duration-200 shadow-lg mb-10" type="submit " onClick={handleonsubmit}   >Pay Now</button>
      {/* <button onClick={handleonsubmit}>checkout</button> */}
      </div>
      </>
    );
  }
