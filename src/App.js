import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import InputForm from './components/InputForm';
import SortBar from './components/SortBar';
import Quote from './components/Quote';
import QuoteFooter from './components/QuoteFooter';
import EditModal from './components/EditModal';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('id&_order=desc');
  const [page, setPage] = useState('1');
  const [perPage, setPerPage] = useState('20');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState('');

  // Fetch quotes from server
  const getQuotes = (event) => {
    if (event) event.preventDefault();
    return fetch('http://localhost:3001/quotes?_sort=' + sort + '&q=' + search)
      .then(res => res.json())
      .then(res => setQuotes(res))
      .then(setSearchResult(search))
      .then(setLoading(false));
  }

  // Get default quote list on page load
  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div id="app">
      <NavBar />

      <InputForm getQuotes={getQuotes} />

      <SortBar
        getQuotes={getQuotes}
        setSort={setSort}
        perPage={perPage}
        setPerPage={setPerPage}
        search={search}
        setSearch={setSearch}
        searchResult={searchResult} />

      {loading ? <div id="loading"><h4>Loading Quotes</h4><span uk-spinner="ratio: 4.5"></span></div> :
        <React.Fragment>
          {quotes.length > 0 && searchResult && <div id="search-results">Search: "{searchResult}"</div>}
          {quotes.length === 0 && searchResult && <div id="search-results"><br />There are no results containing "{searchResult}".<br />You can change that! Add a quote above.</div>}
          <div id="quote-list" uk-scrollspy="target: > div; cls: uk-animation-slide-top-small; delay: 20">
            {quotes.map((quote) => {
              return (
                <div className="quote" key={quote.id}>
                  <div className="uk-card uk-card-small uk-card-default uk-card-hover">
                    <Quote 
                      id={quote.id} 
                      body={quote.body} 
                      author={quote.author} 
                      source={quote.source} />

                    <QuoteFooter 
                      getQuotes={getQuotes} 
                      id={quote.id} />
                    
                    <EditModal 
                      getQuotes={getQuotes} 
                      id={quote.id} 
                      body={quote.body} 
                      author={quote.author} 
                      source={quote.source} />
                  </div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      }
    </div>

  )

}

export default App;