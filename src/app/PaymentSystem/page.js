  "use client"
  import { CREATEORDER } from "@/utils/gql/GQL_MUTATIONS";
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
    const [selectedAddress, setSelectedAddress] = useState('');
    const [customerNotes, setCustomerNotes] = useState('');
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
    
    const [doCreateOrder, { loading: oloading, error: oerror }] = useMutation(CREATEORDER, {
      onCompleted: (odata) => {
        console.log(odata);
        alert(`Order Created. We have emailed your Order Details`);
      },
      onError: (err) => {
        console.error("Error creating order:", err.message);
      }
    });

    const handleonsubmit = async ()=>{
      console.log("checkout mutation get called")
      try{
        doCreateOrder({variables: {
                  
          input:{
            address1:selectedAddress.door_no+selectedAddress.postal_address1,
            address2:selectedAddress.postal_address2,
            city :selectedAddress.city,
            // company : input.company,
            email :email,
            firstName:selectedAddress.firstname,
            lastName:selectedAddress.lastname,
            phone : selectedAddress.contact_no,
            postcode : selectedAddress.pincode,
            state :selectedAddress.state,
            country: 'IN',
          
            overwrite: true
        },
        shippingInput:{
          firstName:selectedAddress.firstname,
          lastName:selectedAddress.lastname,
          address1:selectedAddress.door_no+selectedAddress.postal_address1,
          address2:selectedAddress.postal_address2,
          city :selectedAddress.city,
          // company :shippingInput.company,
          postcode : selectedAddress.pincode,
            state :selectedAddress.state,
            country: 'IN',
          
      
          overwrite: true
        },lineItems: mlineitems,isPaid:true,paymentMethod:'Razorpay Card Payment',status:'PROCESSING',
        customerNotes:customerNotes,shippingLines:shippingLines
      
        }})  
      }catch (error) {
        console.error("Order creation failed:", error);
        // Handle error appropriately (e.g., display a message to the user)
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
            // fetch("/api/verify-payment", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({
            //     razorpay_order_id: response.razorpay_order_id,
            //     razorpay_payment_id: response.razorpay_payment_id,
            //     razorpay_signature: response.razorpay_signature,
            //   }),
            // })
            //   .then((res) => res.json())
            //   .then((data) => {
            //     if (data.status === "ok") {
            //       window.location.href = "/payment-success";
            //     } else {
            //       alert("Payment verification failed");
            //     }
            //   })
            //   .catch((error) => {
            //     console.error("Error:", error);
            //     alert("Error verifying payment");
            //   });
            console.log("i am handaler funcion")
 

handleonsubmit()


          },
          

          
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Error:", error);
        alert("Error creating order");
      }
    };
  
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
    
    
          <button className="w-1/2  mt-4 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition duration-200 shadow-lg mb-10" type="submit " onClick={payNow}   >Pay Now</button>
      {/* <button onClick={handleonsubmit}>checkout</button> */}
      </div>
      </>
    );
  }
