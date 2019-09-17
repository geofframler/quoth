import React from 'react';

import RavenLogo from '../raven-logo.png';

const NavBar = () => {
  return (
    <nav className='uk-navbar-container'>
      <div className='uk-navbar-left'>
        <a href='/' className='uk-navbar-item uk-logo'>
          <img src={RavenLogo} id='raven-logo' 
               alt='Raven Logo' 
               title='Quoth' />
          Quoth
        </a>
        <span className='uk-navbar-item'>
          A Quotes App
        </span>
      </div>
    </nav>
  )
};

export default NavBar;