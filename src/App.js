import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import InputForm from './components/InputForm';
import SortBar from './components/SortBar';
import Quote from './components/Quote';
import QuoteFooter from './components/QuoteFooter';
import EditModal from './components/EditModal';
import Pagination from './components/Pagination';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);


  // Fetch quotes from server
  const getQuotes = () => {
    return fetch('http://localhost:3001/quotes?_sort=id&_order=desc')
      .then(res => res.json())
      .then(res => setQuotes(res))
      .then(setLoading(false));
  }

  // Get default quote list on page load
  useEffect(() => {
    getQuotes();
  }, []);

  // Get current quotes per page
  const indexOfLastPost = page * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentQuotes = quotes.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setPage(pageNumber);

  return (
    <div id='app'>
      <NavBar />

      <InputForm getQuotes={getQuotes} />

      <SortBar
        quotes={quotes}
        setQuotes={setQuotes}
        getQuotes={getQuotes}
        setPage={setPage}
        setLoading={setLoading}
        perPage={perPage}
        setPerPage={setPerPage} />

      {loading ? <div id='loading'><h3>Loading Quotes</h3><span uk-spinner='ratio: 4.5'></span></div> :
        <React.Fragment>
          <div id='quote-list' uk-scrollspy='target: > div; cls: uk-animation-slide-top-small; delay: 20'>

            <Pagination
              page={page}
              perPage={perPage}
              totalQuotes={quotes.length}
              paginate={paginate} />

            {currentQuotes.map((quote) => {
              return (
                <div id={'quote-' + quote.id} className='quote' key={quote.id}>
                  <div className='uk-card uk-card-small uk-card-default uk-card-hover'>
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

            <Pagination
              page={page}
              perPage={perPage}
              totalQuotes={quotes.length}
              paginate={paginate} />
          </div>
        </React.Fragment>
      }
    </div>
  )
}

export default App;