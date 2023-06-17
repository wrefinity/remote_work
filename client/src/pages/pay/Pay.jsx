import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axiosRequest from "../../helpers/axiosApi";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkout/CheckoutForm";

const stripePromise = loadStripe(
  "sk_test_51MtmdICr6bjRolxcvPygQ0Fv6h6JeqlQJi8FCUnWg4hiqHjjoL4ND8JLNz0ZJfRzitqVKeCNGeLy4mreG7mGsWH900xo6hvmrO"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axiosRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay;
