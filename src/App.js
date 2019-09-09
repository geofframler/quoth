import React, { useState, useEffect } from 'react';
import QuoteForm from './QuoteForm';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getQuotes = () => {
    const urlQuotes = "http://localhost:3001/quotes?_sort=id&_order=desc";
    return fetch(urlQuotes)
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
                <li key="quote-{quote.id}">
                  <div className="quoteBody">{quote.body}</div>
                  <div className="quoteAuthor">
                  - <a 
                      href={quote.source}
                      alt={quote.author}
                      title={quote.author} 
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
