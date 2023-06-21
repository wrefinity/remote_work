import React, { useState } from "react";
import "../login/Login.css";
import axiosRequest from "../../helpers/axiosApi.js";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const redirector = () => {
    navigate(from, { replace: true });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosRequest.post("/auth/login", { password });
      console.warn(res)
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      redirector();
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        
        <h1> Rest Password</h1>
        <p className="danger">
        {error && error}
        </p>
        <label htmlFor="">new password</label>
        <input
          name="password"
          type="password"
          placeholder="enter new password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Rest</button>
       
      </form>
    </div>
  );
}

export default ResetPassword;
