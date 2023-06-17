import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.css";

function CatCard({ card }) {
  return (
    <Link to="/gigs?cat=design">
      <div className="catCard">
        <img src={card.img} alt="" />
        <span className="card_desc">{card.desc}</span>
        <span className="card_title">{card.title}</span>
      </div>
    </Link>
  );
}
export default CatCard;
