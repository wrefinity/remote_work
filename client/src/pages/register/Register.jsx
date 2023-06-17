import React, { useState } from "react";
import upload from "../../helpers/upload";
import "./Register.scss";
import axiosRequest from "../../helpers/axiosApi";
import { handleInput } from "../../helpers/handlers";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    image: "",
    country: "",
    isSeller: false,
    description: "",
  });

  const navigate = useNavigate();


  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    console.log("check image")
    console.log(url)
    try {
      await axiosRequest.post("/auth/register", {
        ...user,
        image: url,
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="andrew wreford"
            onChange={(e) => handleInput(e, setUser)}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={(e) => handleInput(e, setUser)}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={(e) => handleInput(e, setUser)} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Nigeria "
            onChange={(e) => handleInput(e, setUser)}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>Become a seller</h1>
          <div className="toggle">
            <label htmlFor="">seller activation</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+234 800 000 000"
            onChange={(e) => handleInput(e, setUser)}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A brief description of yourself"
            name="description"
            id=""
            cols="30"
            rows="10"
            onChange={(e) => handleInput(e, setUser)}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
