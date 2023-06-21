import React, {useState} from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from 'moment';
import axiosRequest from "../../helpers/axiosApi";
import Reviews from "../../components/reviews/Reviews";
import star from "../../assets/images/star.png"
import noavatar from "../../assets/images/noavatar.jpg"
import clock from "../../assets/images/clock.png"
import recycle from "../../assets/images/recycle.png"
import greencheck from "../../assets/images/greencheck.png"
import getCurrentUser from "../../helpers/getCurrentUser";



function Gig() {
  const [toUser, setTo]= useState(null)
  const { id } = useParams();
  const currentUser = getCurrentUser()
  const navigate = useNavigate()

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      axiosRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axiosRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  
  const handleChat = async (e)=>{
    e.preventDefault()
    if (!dataUser._id) return
    await axiosRequest.post('/conversations', {to:dataUser._id})
    setTimeout(() => {
      navigate("/messages");
    }, 5000);
  }

  return (
    // <div>
    // </div>
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              JobSpotter
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || noavatar}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src={star} alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <h2>About  <i> {data?.title}</i> Gig</h2>
            <p>{data?.desc}</p>
            
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>Seller Information</h2>
                <div className="user">
                  <img src={dataUser.img || noavatar} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src={star} alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    {!currentUser.isSeller && (
                    <button onClick={(e)=>handleChat(e)} >chat {dataUser.username}</button>
                    )}
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">PHONE</span>
                      <span className="desc">{dataUser.phone}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">{moment(dataUser.createdAt).format('MMMM Do, YYYY')}</span>
                    </div>
                    <div className="item">
                      <span className="title">Email</span>
                      <span className="desc">{dataUser.email}</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.description}</p>
                </div>
              </div>
            )}
            
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2> &#8358; {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src={clock} alt="" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src={recycle} alt="" />
                <span>{data.revisionNumber} Revision Number</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src={greencheck} alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            {!currentUser.isSeller && (
              <Link to={`/pay/${id}`}>
                <button>Pay</button>
              </Link>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;