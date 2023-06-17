import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosRequest from "../../helpers/axiosApi";
import { Link } from "react-router-dom";

import "./Home.scss";
import Featured from "../../components/featured/Featured";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/card/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";
import check from "../../assets/images/check.png";
import jazz from "../../assets/images/jazz.jpg";

function Home() {

  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigx"],
    queryFn: () =>
      axiosRequest
        .get(
          `/gigs`
        )
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    refetch();
  }, []);

  const apply = () => {
    refetch();
  };

  return (
    <div className="home">
      
      <Featured />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <div className="explore">
        <div className="container">
          <h1>Explore the marketplace</h1>

          <div className="items">


          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.map((gig) => (
              <Link to={`/gig/${gig._id}`} className="link">
              <div className="item">
              <img
                src={gig.cover}
                alt=""
              />
              <div className="line"></div>
              <span>{gig.title}</span>
              <h3>&#8358; {gig.price}</h3>
            </div>
              
              </Link>

  ))}
            
          </div>
        </div>
      </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              HotJobSpotter <i>business</i>
            </h1>
            <h1>
              A business solution designed for <i>teams</i>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <img src={check} alt="" />
              Connect with freelancers display effective experience
            </div>

            <div className="title">
              <img src={check} alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>

            <div className="title">
              <img src={check} alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button>Explore HotJobSpotter </button>
          </div>
          <div className="item">
            <img
              src={jazz}
              alt=""
            />
          </div>
        </div>
      </div>
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
}

export default Home;
