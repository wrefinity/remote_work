import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../helpers/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosRequest from "../../helpers/axiosApi";
import deleted from '../../assets/images/delete.png'

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  const [errorMessage, setError] = useState(null)


  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      axiosRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return axiosRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
    onError: (error) => {
      setError(error?.response?.data)
    }
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
        <p className="danger"> {errorMessage && errorMessage}</p>
          <div className="title">
            <h1>GIGS</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add Gigs</button>
              </Link>
            )}
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {data.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <img className="image" src={gig.cover} alt="" />
                </td>
                <td>{gig.title}</td>
                <td>{gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    className="delete"
                    src={deleted}
                    alt=""
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
