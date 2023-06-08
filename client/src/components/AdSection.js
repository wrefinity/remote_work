import React from 'react';
import '../App.css';
import { Button } from './Button';
import './AdSection.css';

function AdSection() {
  return (
    <div className='ad-container'>
      <video src='./videos/video-2.mp4' autoPlay loop muted />
      <h1>Job Opportunities Awaits</h1>
      <p>What are you waiting for?</p>
      <div className='ad-btns'>
        <Button
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--large'
      >
        GO GLOBAL
        </Button>
        <Button
        className='btns'
        buttonStyle='btn--primary'
        buttonSize='btn--large'
      >
        Watch THIS <i className='far fa-play-circle' />
        </Button>

      </div>
    </div>
  );
}

export default AdSection;
