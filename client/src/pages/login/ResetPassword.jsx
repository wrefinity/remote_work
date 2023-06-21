import React, { useState } from "react";
import "./Login.css";
import axiosRequest from "../../helpers/axiosApi.js";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [sucessful, setSuccess] = useState(null);

  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosRequest.post("auth/reset_link", { email });
      // Check the response status code
      setEmail("")
      if (res.status === 200) {
        setSuccess(true); // Set the success state to true
        setTimeout(() => {
          navigate("/login");
        }, 5000);

      } else {
        setError("Reset failed.");
      }
    } catch (err) {
      setEmail("")
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={submitHandler}>

        <h1>RESET PASSWORD </h1>
        <p className="danger">
          {error && error}
        </p>
        <p className="sucess">
          {sucessful && "Check your email for reset link"}
        </p>
        <p className="sucess">
          {sucessful && sucessful}
        </p>
        <label htmlFor="">Email</label>
        <input
          name="email"
          type="text"
          placeholder="test@test.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Rest Password</button>

      </form>
    </div>
  );
}

export default ResetPassword;
