import { CREATEORDER } from '@/utils/gql/GQL_MUTATIONS';
import { useMutation } from '@apollo/client';
import React from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios";
const Payment = () => {
  // Hardcoded test data
  const address = {
    line1: "123 Main St",
    city: "Cityville",
    state: "State",
    country: "Country",
    zip: "123456"
  };

  const shippingAddress = {
    line1: "456 Another St",
    city: "Townsville",
    state: "State",
    country: "Country",
    zip: "654321"
  };

  const customerNotes = "Please deliver between 9 AM and 5 PM.";
  const shippingLines = [{ methodId: "IN", methodTitle: "Local", total: "60.00" }];
  const cartItems = [{ id: 1, name: "Item 1", quantity: 1, price: 200 }];

  const dispatch = useDispatch();
  const userName = "John Doe"; // Hardcoded user name for testing

  const [doCreateOrder, { loading: oloading, error: oerror }] = useMutation(CREATEORDER, {
    onCompleted: (odata) => {
      console.log(odata);
      alert(`Order Created. We have emailed your Order Details`);
    },
    onError: (err) => {
      console.error("Error creating order:", err.message);
    }
  });
// const totOrderValue= 202
  //Razorpay Section Begin
//Initialize Razor Pay Script

function loadScript(src) {
  return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
          resolve(true);
      };
      script.onerror = () => {
          resolve(false);
      };
      document.body.appendChild(script);
  });
}

async function displayRazorpay() {
  const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }

  const data = await fetch("/api/razorpaypost", 
    { 
    method: "POST" ,
    headers: {
      'content-Type': 'application/json',

     },
    body: JSON.stringify({
      taxAmt:100
    })
  }).then((t) =>
    t.json()
  );
  console.log(data);

  if (!data) {
      alert("Server error. Are you online?");
      return;
  }

  // const { amount, id: order_id, currency } = result.data;

  var options = {
      key: "rzp_live_sCxaf0020ub9NP", // Enter the Key ID generated from the Dashboard
      amount: data.amount,
      currency: data.currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
      image:  '/images/logo/wetailor4u.png' ,
      order_id: data.id,
      handler: async function (response) {
        

     

          alert(result.data.msg);
      },
      prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "9999999999",
      },
      notes: {
          address: "Soumya Dey Corporate Office",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}



//Razorpay Payment Section Ends

  return (
    <div>
      <h1>Payment</h1>
      <button onClick={displayRazorpay} disabled={oloading}>
        {oloading ? "Processing..." : "Pay Now"}
      </button>
      {oerror && <p>Error creating order: {oerror.message}</p>}
    </div>
  );
};

export default Payment;
