import React from 'react';
import './sortbar.css';

const SortBar = (props) => {
  return (
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar">
      <nav className="uk-navbar-container">
        <div className="sort-bar uk-flex">

          <div className="uk-navbar-left">
            <form className="uk-flex-inline" onSubmit={props.getQuotes}>
              <select className="uk-select" onChange={(event) => props.setSort(event.target.value)}>
                <option value={'id&_order=desc'}>New to Old</option>
                <option value={'id&_order=asc'}>Old to New</option>
                <option value={'author&_order=asc'}>Author A-Z</option>
                <option value={'author&_order=desc'}>Author Z-A</option>
              </select>
              <select className="uk-select" value={props.perPage} onChange={(event) => props.setPerPage(event.target.value)}>
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
                <option value="50">50 per page</option>
              </select>
              <button type="submit" className="uk-button uk-button-text">Update</button>
            </form>
          </div>

          <div className="uk-navbar-center">
            <a id="js-scroll-trigger" href="" uk-scroll="true" uk-totop="true" duration="500"></a>
          </div>

          <div className="uk-navbar-right">
            <div className="uk-margin">
              {props.searchResult && <a href="" className="clear-search">clear search</a>}
              <form className="uk-search uk-search-default" onSubmit={props.getQuotes}>
                <button type="submit" href="" className="uk-button uk-button-link uk-search-icon-flip"><span className="search-button" uk-icon="icon: search; ratio: 1"></span></button>
                <input className="uk-search-input" type="search" placeholder="Search..." onChange={(event) => props.setSearch(event.target.value)} />
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SortBar;