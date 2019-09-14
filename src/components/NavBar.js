import React from 'react';

const NavBar = () => {
  return (
    <nav className="uk-navbar-container">
      <div className="uk-navbar-left">
        <a href="/" className="uk-navbar-item uk-logo">Quoth</a>
        <span className="uk-navbar-item">A Quotes App</span>
      </div>
    </nav>
  )
};

export default NavBar;