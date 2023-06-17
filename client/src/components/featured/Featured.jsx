import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";
import video from "../../assets/videos/video-2.mp4"
import search from "../../assets/images/search.png"

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };
  return (
    <div className="featured">
      <video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <div className="container">
    
          <h1>
            Job Opportunities Awaits
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src={search} alt="" />
              <input
                type="text"
                placeholder='Try "building mobil app"'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <button>Explore Now </button>
          </div>
        
      </div>
    </div>
  );
}

export default Featured;



// <h1>Job Opportunities Awaits</h1>
// <p>What are you waiting for?</p>
// <div className='ad-btns'>
//   <Button
//   className='btns'
//   buttonStyle='btn--outline'
//   buttonSize='btn--large'
// >
//   GO GLOBAL
//   </Button>
//   <Button
//   className='btns'
//   buttonStyle='btn--primary'
//   buttonSize='btn--large'
// >
//   Watch THIS <i className='far fa-play-circle' />
//   </Button>

// </div>
// </div>