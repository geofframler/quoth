import React, { useState, useEffect } from 'react';

function QuoteList() {
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

  return (
    <React.Fragment>
      {loading ? <div id="quotesLoading">Loading...</div> : 
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
      }
    </React.Fragment>
  );
}

export default QuoteList;