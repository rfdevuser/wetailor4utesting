"use client"
import { CREATEORDER } from "@/utils/gql/GQL_MUTATIONS";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function PaymentSystem({ Price , customerNotes ,cartItems ,input,shippingInput}) {
  const [amount, setAmount] = useState("1");
  const [email, setEmail] = useState('');
  const userName = useSelector((state) => state.form.formData.name);
  const [phoneNumber, setPhoneNumber] = useState('');
  useEffect(() => {
    // Retrieve the email from local storage
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
        setEmail(savedEmail);
    }

console.log(cartItems)
    const savedPhoneNumber = localStorage.getItem('phoneNumber');
        if (savedPhoneNumber) {
            setPhoneNumber(savedPhoneNumber);
        }
}, []);


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

  const shippingLines = [{ methodId: "IN", methodTitle: "Local", total: "60.00" }];
  const mlineitems = cartItems.map(item => ({
    id: item.id, // Assuming each item has an id
    name: item.name, // Name of the item
    quantity: item.quantity, // Quantity of the item
    price: item.price, // Price of the item
  }));
  // const cartItems = [{ id: 1, name: "Item 1", quantity: 1, price: 200 }];
  const [doCreateOrder, { loading: oloading, error: oerror }] = useMutation(CREATEORDER, {
    onCompleted: (odata) => {
      console.log(odata);
      alert(`Order Created. We have emailed your Order Details`);
    },
    onError: (err) => {
      console.error("Error creating order:", err.message);
    }
  });
  const payNow = async () => {
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
        amount: Price*100,
        currency: order.currency,
        name: "WeTailor4U",
        description: "Test Transaction",
        image: "/images/logo/wetailor4u.png",
        order_id: order.id, // This is the order_id created in the backend
        callback_url: "/api/verify-payment", // Your success URL
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
// mutation for order creation
// doCreateOrder({variables: {
            
//   input:{
//     address1:input.address1,
//     address2:input.address2,
//     city :input.city,
//     company : input.company,
//     email :input.email,
//     firstName:input.firstName,
//     lastName:input.lastName,
//     phone : input.phone,
//     postcode : input.postcode,
//     state :input.state,
//     country :input.country,
  
//     overwrite: true
// },
// shippingInput:{
//   firstName:shippingInput.firstName,
//   lastName:shippingInput.lastName,
//   address1:shippingInput.address1,
//   address2:shippingInput.address2,
//   city :shippingInput.city,
//   company :shippingInput.company,
//   postcode : shippingInput.postcode,
//   state : shippingInput.state,
//   country : shippingInput.country,

//   overwrite: true
// },lineItems: mlineitems,isPaid:true,paymentMethod:'Razorpay Card Payment',status:'PROCESSING',
// customerNotes:customerNotes,shippingLines:shippingLines

// }})  



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
    <div className="flex justify-center">
   
  
        <button className="w-1/2  mt-4 bg-[#064e3b] text-white px-6 py-3 rounded-lg hover:bg-[#111827] transition duration-200 shadow-lg mb-10" type="submit " onClick={payNow}>Pay Now</button>
     
    </div>
  );
}
