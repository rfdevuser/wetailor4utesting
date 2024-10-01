"use client";
import { CREATEORDER } from "@/utils/gql/GQL_MUTATIONS";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust the import based on your Redux store structure

interface PaymentSystemProps {
  Price: number;
  customerNotes: string;
  cartItems: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
  }>;
  input: {
    address1: string;
    address2: string;
    city: string;
    company: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    postcode: string;
    state: string;
    country: string;
  };
  shippingInput: {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    company: string;
    postcode: string;
    state: string;
    country: string;
  };
}

export default function PaymentSystem({
  Price,
  customerNotes,
  cartItems,
  input,
  shippingInput,
}: PaymentSystemProps) {
  const [amount, setAmount] = useState<string>("1");
  const [email, setEmail] = useState<string>("");
  const userName = useSelector((state: RootState) => state.form.formData.name);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }

    const savedPhoneNumber = localStorage.getItem("phoneNumber");
    if (savedPhoneNumber) {
      setPhoneNumber(savedPhoneNumber);
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const shippingLines = [{ methodId: "IN", methodTitle: "Local", total: "60.00" }];
  const mlineitems = cartItems.map(item => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));

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

      const options = {
        key: "rzp_live_sCxaf0020ub9NP",
        amount: Price * 100,
        currency: order.currency,
        name: "WeTailor4U",
        description: "Test Transaction",
        image: "/images/logo/wetailor4u.png",
        order_id: order.id,
        callback_url: "/api/verify-payment",
        prefill: {
          name: userName,
          email: email,
          contact: phoneNumber,
        },
        theme: {
          color: "#0f172a",
        },
        handler: function (response: any) {
          // Uncomment to handle payment verification
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
          // .then((res) => res.json())
          // .then((data) => {
          //   if (data.status === "ok") {
          //     window.location.href = "/payment-success";
          //   } else {
          //     alert("Payment verification failed");
          //   }
          // })
          // .catch((error) => {
          //   console.error("Error:", error);
          //   alert("Error verifying payment");
          // });
          console.log("Handler function executed");
          // Add the mutation for order creation here
          // doCreateOrder({ variables: { ... } });
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
      <button
        className="w-1/2 mt-4 bg-[#064e3b] text-white px-6 py-3 rounded-lg hover:bg-[#111827] transition duration-200 shadow-lg mb-10"
        type="button"
        onClick={payNow}
      >
        Pay Now
      </button>
    </div>
  );
}
