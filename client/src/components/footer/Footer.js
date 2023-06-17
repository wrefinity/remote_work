import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import './Footer.css';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
           Come onboard and enjoy unlimited 
           job opportunities
        </p>
        <p className='footer-subscription-text'>
           You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
            <form>
                <input 
                type='email'
                 name='email' 
                 placeholder='Your Email'
                 className='footer-input'
                />
                <Button buttonStyle='btn--outline'>Subscribe</Button>
            </form>

        </div>

      </section>
     
    <section class='social-media'>
        <div class='social-media-wrap'>
        <div class='footer-logo'>
           <Link to='/' className='social-logo'>
            HotJobSpotter
            <i class='fas fa-handshake' />
           </Link>
        </div>
        <small class='website-rights'>HJS © 2024</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
    </section>
    </div>
  );
}

export default Footer
