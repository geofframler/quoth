import React, { useState, useEffect } from 'react';

function Quotes() {
  const [quotes, setQuotes] = useState([]);

  const getQuotes = () => {
    const urlQuotes = "http://localhost:3001/quotes";
    return fetch(urlQuotes)
      .then(res => res.json())
      .then(res => setQuotes(res)); 
  }

  useEffect(() => {
    getQuotes();
  }, []);

  return (
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
  );
}

export default Quotes;