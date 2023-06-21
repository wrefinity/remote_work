import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import axiosRequest from "../../helpers/axiosApi";
import getCurrentUser from "../../helpers/getCurrentUser"
import noavatar from "../../assets/images/noavatar.jpg"
import "./Message.scss";

const Message = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
    axiosRequest.get(`/messages/${id}`).then((res) => {
      console.warn(res.data)
      return res.data;
    }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return axiosRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      interactionId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };
  const currentUser = getCurrentUser();
  
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Back to Interactions</Link>
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                <img
                  src={m.userId.image || noavatar}
                  alt="m.uccs"
                />
                <h6>{m.userId.username}</h6>
                <p>{m.message}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <input type="text" placeholder="send a message......." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
