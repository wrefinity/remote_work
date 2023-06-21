import React from "react";
import { Link } from "react-router-dom";
import "./notfound.scss"
import not_found  from "../../assets/images/404.png"

const NotFound = () => {

    return (
        <div className="containerx">

        <img src={not_found} alt="405"/>

            <Link to={'/'}>
            <button> return home</button>
            </Link>

        </div>
  );
};

export default NotFound;
