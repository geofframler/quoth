import React, { useState, useEffect } from 'react';
import InputForm from './InputForm';
import EditModal from './EditModal';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getQuotes = () => {
    return fetch('http://localhost:3001/quotes?_sort=id&_order=desc')
      .then(res => res.json())
      .then(res => setQuotes(res))
      .then(setLoading(false));       
  }

  useEffect(() => {
    getQuotes();
  }, []);

  return(
    <div id="app">
      <nav className="uk-navbar-container">
          <div className="uk-navbar-left">
            <a href="/" className="uk-navbar-item uk-logo">Quotes</a>
          </div>
      </nav>
      <div className="uk-card uk-card-body uk-card-primary uk-card-hover">
        <InputForm getQuotes={getQuotes} />
      </div>
      {loading ? <div id="loading"><h4>Loading Quotes</h4><span uk-spinner="ratio: 4.5"></span></div> : 
        <div id="quote-list">
          {quotes.map((quote) => {
            return (
              <div className="quote" key={quote.id}>
                <div className="uk-card uk-card-default uk-card-hover">
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
                    <a href="#/" className="edit-link uk-button uk-button-text uk-float-left" uk-toggle={'target: #edit-' + quote.id}>
                      <span uk-icon="icon: pencil; ratio: .8"></span> Edit</a>
                    <a href="#/" className="delete-link uk-button uk-button-text uk-float-right">
                      Delete <span uk-icon="icon: trash; ratio: .8"></span></a>
                  </div>
                </div>
                <EditModal getQuotes={getQuotes} id={quote.id} body={quote.body} author={quote.author} source={quote.source} />
              </div>
            );
          })}
        </div>
      }
    </div>
  ) 
}

export default App;