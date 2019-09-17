import React, { useState } from 'react';
import '../styles/sortbar.css';

const SortBar = (props) => {
  const [sort, setSort] = useState('id&_order=desc');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState('');

  // Submit a search query
  const sortQuotes = (event) => {
    if (event) event.preventDefault();
    return fetch('http://localhost:3001/quotes?_sort=' + sort + '&q=' + search)
      .then(props.setLoading(true))
      .then(props.setPage(1))
      .then(res => res.json())
      .then(res => props.setQuotes(res))
      .then(setSearchResult(search))
      .then(props.setLoading(false));
  }

  // Clear search
  const clearSearch = (event) => {
    if (event) event.preventDefault();
    return fetch('http://localhost:3001/quotes?_sort=' + sort)
      .then(props.setLoading(true))
      .then(setSearch(''))
      .then(setSearchResult(''))
      .then(props.setPage(1))
      .then(res => res.json())
      .then(res => props.setQuotes(res))
      .then(props.setLoading(false));
  }

  // Handle changing the per page selection
  const handlePerPage = (event) => {
    if (event) event.preventDefault();
    props.setPerPage(event.target.value);
    props.setPage(1);
  }

  // Handle submitting a search
  const handleSearch = (event) => {
    if (event) event.preventDefault();
    props.setPage(1);
    sortQuotes();
  }

  return (
    <React.Fragment>
      <div uk-sticky='sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar'>
        <nav className='uk-navbar-container'>
          <div className='sort-bar uk-flex'>

            <div className='uk-navbar-left'>
              <form className='uk-flex-inline' onSubmit={sortQuotes}>
              <select id='per-page-select' className='uk-select' value={props.perPage} onChange={handlePerPage}>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              <span className='sort-divider'>|</span>
                <select id='sort-select' className='uk-select' onChange={(event) => setSort(event.target.value)}>
                  <option value={'id&_order=desc'}>New to Old</option>
                  <option value={'id&_order=asc'}>Old to New</option>
                  <option value={'author&_order=asc'}>Author A-Z</option>
                  <option value={'author&_order=desc'}>Author Z-A</option>
                </select>
                <button type='submit' className='sort-button uk-button uk-button-text'>Sort</button>
              </form>
            </div>

            <div className='uk-navbar-center'>
              <button id='js-scroll-trigger' className='uk-button uk-button-link' uk-scroll='true' uk-totop='true' duration='500' />
            </div>

            <div className='uk-navbar-right'>
              <div className='uk-margin'>
                {searchResult && <button  type='submit' className='uk-button uk-button-text' onClick={clearSearch}>clear search</button>}
                <form className='uk-search uk-search-default' onSubmit={handleSearch}>
                  <button type='submit'  className='uk-button uk-button-link uk-search-icon-flip'><span className='search-button' uk-icon='icon: search; ratio: 1'></span></button>
                  <input className='uk-search-input' type='search' placeholder='Search...' value={search} onChange={(event) => setSearch(event.target.value)} />
                </form>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {props.quotes.length === 0 && searchResult && <div id='search-results'><br />There are no results containing "{searchResult}".<br />You can change that! Add a quote above.</div>}
      {props.quotes.length > 0 && searchResult && <div id='search-results'>Search: "{searchResult}"</div>}
    </React.Fragment>
  );
};

export default SortBar;