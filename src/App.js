import React, { useState, useEffect } from 'react';
import QuoteForm from './QuoteForm';

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
      <nav class="uk-navbar-container" uk-navbar>
          <div class="uk-navbar-left">
            <a href="" class="uk-navbar-item uk-logo">Quotes</a>
          </div>
      </nav>
      <div class="uk-card uk-card-body uk-card-primary uk-card-hover">
        <QuoteForm getQuotes={getQuotes} />
      </div>
      {loading ? <div id="loading"><h4>Loading Quotes</h4><span uk-spinner="ratio: 4.5"></span></div> : 
        <div id="quote-list">
          {quotes.map((quote) => {
            return (
              <div className="quote uk-card uk-card-default uk-card-hover" key={quote.id}>
                <div className="uk-card-body">
                  <div className="quote-body uk-card-title">"{quote.body}"</div>
                  <div className="quote-author">
                  - <a 
                      href={quote.source}
                      alt={quote.author}
                      title={quote.author} 
                      rel="noopener noreferrer"
                      target="_blank" >
                        {quote.author}
                    </a>
                  </div>
                </div>
                <div className="uk-card-footer">
                  <a href="#" className="edit-link uk-button uk-button-text">
                    <span className="icon" uk-icon="icon: pencil; ratio: .8"></span> Edit</a>
                  <a href="#" className="delete-link uk-button uk-button-text">
                    Delete <span className="icon" uk-icon="icon: trash; ratio: .8"></span></a>
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