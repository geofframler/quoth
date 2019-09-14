import React, { useState, useEffect } from 'react';
import InputForm from './InputForm';
import EditModal from './EditModal';
import NavBar from './NavBar';
import SortBar from './SortBar';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('id&_order=desc');
  const [page, setPage] = useState('1');
  const [perPage, setPerPage] = useState('20');
  const [search, setSearch] = useState('');

  // Fetch quotes from server
  const getQuotes = (event) => {
    if (event) event.preventDefault();
    return fetch('http://localhost:3001/quotes?_sort=' + sort + '&_page=' + page + '&_limit=' + perPage + '&q=' + search)
      .then(res => res.json())
      .then(res => setQuotes(res))
      .then(setLoading(false));
  }

  // Delete a quote from server by ID
  const deleteQuote = (id) => {
    return fetch('http://localhost:3001/quotes/' + id, {
      method: 'DELETE',
    })
      .then(() => getQuotes());
  }

  // Update quote list with sort options
  const updateQuoteList = (event) => {

    getQuotes();
  }

  // Get default quote list on page load
  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div id="app">
      <NavBar />

      <div className="input-form-wrapper uk-card uk-card-body uk-card-small uk-card-primary uk-card-hover">
        <InputForm getQuotes={getQuotes} />
      </div>

      <SortBar
        getQuotes={getQuotes}
        setSort={setSort}
        perPage={perPage}
        setPerPage={setPerPage}
        search={search}
        setSearch={setSearch} />

      {loading ? <div id="loading"><h4>Loading Quotes</h4><span uk-spinner="ratio: 4.5"></span></div> :
        <div id="quote-list">
          {quotes.length == 0 && search && <div id="search-empty">There are no results found for that query.<br />You can change that! Add a quote above.</div>}
          {quotes.map((quote) => {
            return (
              <div className="quote" key={quote.id}>
                <div className="uk-card uk-card-small uk-card-default uk-card-hover">
                  <div className="uk-card-body">
                    <div className="quote-body uk-card-title">"{quote.body}"</div>
                    <div className="quote-author">
                      - {quote.author}
                    </div>
                    {quote.source && (
                      <div className="quote-source">
                        Source: <a href={quote.source}>{quote.source}</a>
                      </div>
                    )}
                  </div>

                  <div className="uk-card-footer">
                    <a href="#/"
                      className="edit-link uk-button uk-button-text uk-float-left"
                      uk-toggle={'target: #edit-' + quote.id}>
                      <span className="icon" uk-icon="icon: pencil; ratio: .8"></span> Edit
                    </a>

                    <button
                      className="delete-link uk-button uk-button-text uk-float-right"
                      type="button">
                      Delete <span className="icon" uk-icon="icon: trash; ratio: .8"></span>
                    </button>
                    <div uk-drop="mode: click; pos: top; animation: uk-animation-slide-bottom-small; duration: 500">
                      <div className="delete-drop uk-card uk-card-small uk-card-body uk-card-secondary uk-card-hover">
                        <h5>Are you sure?</h5>
                        <button
                          onClick={() => deleteQuote(quote.id)}
                          type="submit"
                          className="delete-button uk-button uk-button-default uk-button-danger">
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>

                  <EditModal getQuotes={getQuotes} id={quote.id} body={quote.body} author={quote.author} source={quote.source} />

                </div>
              </div>
            );
          })}
        </div>
      }
    </div>
  )
}

export default App;