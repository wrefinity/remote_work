import React, {useState} from "react";
import {useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axiosRequest from "../../helpers/axiosApi";
import deleted from '../../assets/images/delete.png'

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [errorMessage, setError] = useState(null)

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      axiosRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await axiosRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await axiosRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  const mutation = useMutation({
    mutationFn: (idx) => {
      return axiosRequest.delete(`/orders/delete/${idx}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      setError(error?.response?.data)
    }
  });

  const handleDelete = (idx) => {
    mutation.mutate(idx);
  };
  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
        <p className="danger"> {errorMessage && errorMessage}</p>
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr className="headers">
              <th>Number</th>
              <th>Title</th>
              <th>Price</th>
              <th>controls</th>
            </tr>
            {data.map((order, num) => (
              <tr key={order._id}>
                <td>
                  {num}
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                <img
                className="image"
                src={deleted}
                alt=""
                onClick={() => handleDelete(order._id)}
              />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
