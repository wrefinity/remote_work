import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosRequest from "../../helpers/axiosApi";
import Review from "../review/Review";
import { toast } from "react-toastify";
import "./Reviews.scss";
import getCurrentUser from "../../helpers/getCurrentUser";

const Reviews = ({ gigId }) => {

  const queryClient = useQueryClient()
  const [errorMessage, setError] = useState("")
  const currentUser = getCurrentUser()

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      axiosRequest.get(`/reviews/${gigId}`).then((res) => {
        console.log(res)
        return res.data;
      }),

  });



  const mutation = useMutation({
    mutationFn: (review) => {
      return axiosRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"])
    },
    onError: (error) => {
      toast.success(error?.response?.data, { autoClose: 2000 });
      setError(error?.response?.data)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
          ? "Something went wrong!"
          : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        {!currentUser.isSeller && (
          <>
            <h3>kindly review and rate me</h3>
            <span>{errorMessage && errorMessage}</span>
            <form action="" className="addForm" onSubmit={handleSubmit}>
              <select name="" id="">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <input type="text" placeholder="write your opinion" />
              <button>Send</button>
            </form>
          </>


        )}
      </div>
    </div>
  );
};

export default Reviews;
