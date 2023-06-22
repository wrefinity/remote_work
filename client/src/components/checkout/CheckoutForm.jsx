import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useQuery } from "@tanstack/react-query";
import "./checkout.scss";
import axiosRequest from "../../helpers/axiosApi";


const CheckoutForm = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const publicId = process.env.REACT_APP_FLUTTER_PUBLIC_KEY;
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      axiosRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  console.warn(publicId)
  // Test info 
  //   Card number 4187427415564246 
  // CVV 828
  // Expiry 09/32


  const config = {
    public_key: publicId,
    tx_ref: Date.now(),
    amount: data?.price,
    currency: "NGN",
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: email,
      phone_number: phone,
      name: name,
    },
    customizations: {
      title: "Job Spotter Payment",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSuccessAction = async (reference) => {
    try {
      await axiosRequest.post(`/orders/create-payment-intent/${id}`, {
        ref_txt: reference?.value?.flw_ref,
      });
      // setTimeout(() => {
      navigate("/orders");
      // }, 5000);
    } catch (err) {
    }
  };


  return (
    <div className="App">
      <div className="checkout">
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={() =>
            handleFlutterPayment({
              callback: (response) => {
                if (response.status === "successful") {
                  handleSuccessAction(response);
                }
                closePaymentModal(); // this will close the modal programmatically
              },
              onClose: () => { },
            })
          }
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
