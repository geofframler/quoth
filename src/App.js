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
      <h1>Quotes</h1>
      <QuoteForm getQuotes={getQuotes} />
      {loading ? <div id="quotesLoading">Loading...</div> : 
        <div id="quoteList">
          <ul>
            {quotes.map((quote) => {
              return (
                <li key={quote.id}>
                  <div className="quoteBody">{quote.body}</div>
                  <div className="quoteAuthor">
                  - <a 
                      href={quote.source}
                      alt={quote.author}
                      title={quote.author} 
                      rel="noopener noreferrer"
                      target="_blank" >
                        {quote.author}
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      }
    </div>
  ) 
}

export default App;