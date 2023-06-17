import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosRequest from "../../helpers/axiosApi";
import heart from "../../assets/images/heart.png"
import star from "../../assets/images/star.png"
import noavatar from "../../assets/images/noavatar.jpg"


const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      axiosRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data.img || noavatar} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            <img src={star} alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        
        <div className="detail">
          <img src={heart} alt="" />
          <div className="price">
            <h2>&#8358; {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
