import React, { useState } from "react";
import "./Login.css";
import axiosRequest from "../../helpers/axiosApi.js";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
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
    setError(null)
    try {
      const res = await axiosRequest.post("/auth/login", { email, password });
      // console.warn(res)
      
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      redirector();
    } catch (err) {
      console.warn(err)
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={submitHandler}>

        <h1>Login.</h1>
        <p className="danger">
          {error && error}
        </p>
        <label htmlFor="">Email</label>
        <input
          name="email"
          type="text"
          placeholder="test@test.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <Link to={'/password_reset'}>
          Reset password
        </Link>

      </form>
    </div>
  );
}

export default Login;
