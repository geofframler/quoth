import React, { useState } from 'react';
import '../styles/sortbar.css';

const SortBar = (props) => {
  const [sort, setSort] = useState('id&_order=desc');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const searchQuotes = (event) => {
    if (event) event.preventDefault();
    return fetch('http://localhost:3001/quotes?_sort=' + sort + '&q=' + search)
      .then(props.setLoading(true))
      .then(res => res.json())
      .then(res => props.setQuotes(res))
      .then(setSearchResult(search))
      .then(props.setLoading(false));
  }

  return (
    <React.Fragment>
      <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar">
        <nav className="uk-navbar-container">
          <div className="sort-bar uk-flex">

            <div className="uk-navbar-left">
              <form className="uk-flex-inline" onSubmit={searchQuotes}>
                <select className="uk-select" onChange={(event) => setSort(event.target.value)}>
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
              <button id="js-scroll-trigger" className="uk-button uk-button-link" href="" uk-scroll="true" uk-totop="true" duration="500" />
            </div>

            <div className="uk-navbar-right">
              <div className="uk-margin">
                {searchResult && <a href="" type="submit" className="uk-button uk-button-text">clear search</a>}
                <form className="uk-search uk-search-default" onSubmit={searchQuotes}>
                  <button type="submit" href="" className="uk-button uk-button-link uk-search-icon-flip"><span className="search-button" uk-icon="icon: search; ratio: 1"></span></button>
                  <input className="uk-search-input" type="search" placeholder="Search..." onChange={(event) => setSearch(event.target.value)} />
                </form>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {props.quotes.length > 0 && searchResult && <div id="search-results">Search: "{searchResult}"</div>}
      {props.quotes.length === 0 && searchResult && <div id="search-results"><br />There are no results containing "{searchResult}".<br />You can change that! Add a quote above.</div>}
    </React.Fragment>
  );
};

export default SortBar;