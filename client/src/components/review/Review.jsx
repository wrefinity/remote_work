import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosRequest from "../../helpers/axiosApi";
import noavatar from "../../assets/images/noavatar.jpg"
import star from "../../assets/images/star.png"

import "./Review.scss";
const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery(
    {
      queryKey: [review.userId],
      queryFn: () =>
        axiosRequest.get(`/users/${review.userId}`).then((res) => {
          return res.data;
        }),
    },
  );


  return (
    <div className="review">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user">
          <img className="pp" src={data.img || noavatar} alt="" />
          <div className="info">
            <span>{data.username}</span>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src={star} alt="" key={i} />
          ))}
        <span>{review.star} <span> {review.desc}  </span></span>
        
      </div>
    </div>
  );
};

export default Review;
