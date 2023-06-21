import React, { useState } from "react";
import "./Login.css";
import axiosRequest from "../../helpers/axiosApi.js";
import { useNavigate , useParams} from "react-router-dom";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [sucessful, setSuccess] = useState(null);

  const navigate = useNavigate();
  const { id, token } = useParams();


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosRequest.post(`auth/reset_password/${id}/${token}`, { password });
      setPassword("")
      if (res.status === 200) {
        setSuccess(true); // Set the success state to true
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        setError("Password reset failed, try again");
      }
      
    } catch (err) {
      console.log(err.response.data.message)
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        
        <h1> RESET NOW</h1>
        <p className="danger">
        {error && error}
        </p>
        <p className="sucess">
        {sucessful && "password changed"}
      </p>
        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset</button>
       
      </form>
    </div>
  );
}

export default NewPassword;
