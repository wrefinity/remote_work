import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import credit from "../../assets/img/fad.jpg";
} from "../../Slicer/Pergent";
import { useNavigate, useParams } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

export default function FlutterPayment() {
  const { pergentId } = useParams();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.pergants);
  const pergants = useSelector((state) => getPergantsById(state, pergentId));
  const voter = JSON.parse(localStorage.getItem("voter"));
  if (pergants === "undefined") navigate("/");

  const { voters, phone, email, numberVote } = voter;
  console.log("Number of count", numberVote)
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPayment, setSuccessPayment] = useState(false);
  const dispatch = useDispatch();

  const publicId = process.env.REACT_APP_FLUTTER_PUBLIC_KEY;
  const config = {
    public_key: publicId,
    tx_ref: Date.now(),
    amount:pergants?.title?.amount * numberVote, 
    currency: 'NGN', // Currency set to dollars
    payment_options: "card",
    customer: {
      email: email,
      phone_number: phone,
      name: voters,
    },
    customizations: {
      title: "Pergant Payment",
      description: `Payment ${pergants?.name} Pergant`,
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const incrementRate = () => {
    const total = pergants?.title?.amount;
    console.warn(total)
    return numberVote;
  }

  const handleSuccessAction = (reference) => {
    dispatch(
      incrementPergant({
        name: voters,
        counter: incrementRate(),
        _id: pergants?._id,
      })
    );
    dispatch(incPerReset());
    setSuccessPayment(false);
    localStorage.removeItem("voter");
    navigate("/");
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      if (response.status === "successful") {
        handleSuccessAction(response);
      }
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {
      handlePaystackCloseAction();
    },
  };

  useEffect(() => {
    if (status === "succeeded" && isSubmit && isPayment) {
      navigate("/");
      setIsSubmit(false);
      dispatch(incPerReset());
      setSuccessPayment(false);
    }
  }, [status]);

  const handlePaystackCloseAction = () => {
    toast.error("Transaction cancelled", { autoClose: 2000 });
  };

  return (
    <Row
      className=" d-flex align-items-center justify-content-center text-center mbt"
      style={{
        backgroundImage: `url(${credit})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="mb-3">
        <h3 className="cus_txt_color fw-500 text-center mb-4">
          PAYMENT METHODS
        </h3>

        <FlutterWaveButton className="btn btn-success" {...fwConfig} />
      </div>
    </Row>
  );
}
