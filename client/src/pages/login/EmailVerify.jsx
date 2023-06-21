import React, { useState } from "react";
import "./Login.css";
import axiosRequest from "../../helpers/axiosApi.js";
import { useNavigate, useParams } from "react-router-dom";

const EmailVerify = ()=> {
  const [error, setError] = useState(null);
  const [sucessful, setSuccess] = useState(null);

  const navigate = useNavigate();
  const { id, token } = useParams();


  const submitHandler = async (e) => {
    setError(null)
    setSuccess(null)
    e.preventDefault();
    try {
      const res = await axiosRequest.get(`auth/users_verification/${id}/${token}`);
      // check if not error before navigating 
      if (res.status === 200) {
        setSuccess(true); // Set the success state to true
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        setError("Password reset failed, try again");
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        
        <h1> Confirm Account Creation </h1>
        <p className="danger">
        {error && error}
        </p>
        <p className="sucess">
        {sucessful && "email confirm you can now log in"}
      </p>
        <button type="submit">Confirm</button>
       
      </form>
    </div>
  );
}

export default EmailVerify;
