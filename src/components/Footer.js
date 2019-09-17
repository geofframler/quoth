import React from 'react';

import '../styles/footer.css';

const Footer = () => {
  return (
    <div id='footer'
      className='uk-card uk-card-body uk-card-small uk-card-primary uk-card-hover 
                 uk-child-width-expand@s uk-text-center'
      uk-grid='true'>
      <div className='footer-left'>
        Created by
        <a className='uk-button uk-button-text' 
           href='https://geofframler.com' 
           target='_blank' 
           rel='noopener noreferrer'>
          Geoff Ramler
        </a>
      </div>
      <div className='footer-right'>
        <button id='js-scroll-trigger' 
                className='uk-button uk-button-text' 
                uk-scroll='true' 
                uk-totop='true' 
                duration='500'>
          <span className='back-to-top-text'>
            back to top
          </span>
        </button>
      </div>
    </div>
  )
};

export default Footer;