import React from 'react'
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
  return (
    <div className='cards'>
        <h1>Check out the jobs available</h1>
        <div className='cards__container'>
            <div className='cards__wrapper'>
                <ul className='cards-items'>
                   <CardItem 
                   src="images/img-9.jpg"
                   text="HotJobs in canada"
                   label='Explore '
                   path='/Post Jobs'
                   />
                   <CardItem 
                   src="images/img-2.jpg"
                   text="HotJobs in canada"
                   label='Explore '
                   path='/Post Jobs'
                   />
                   <CardItem 
                   src="images/img-1.jpg"
                   text="HotJobs in canada"
                   label='Explore '
                   path='/Post Jobs'
                   />
                </ul>
                <ul className='cards-items'>
                   <CardItem 
                   src="images/img-9.jpg"
                   text="HotJobs in canada"
                   label='Explore '
                   path='/Post Jobs'
                   />
                   <CardItem 
                   src="images/img-9.jpg"
                   text="HotJobs in canada"
                   label='Explore '
                   path='/Post Jobs'
                   />
                   <CardItem 
                   src="images/img-9.jpg"
                   text="HotJobs in canada"
                   label='Explore '
                   path='/sign-up'
                   />
                   </ul>

            </div>
        </div>
      
    </div>
  );
}

export default Cards;
