import React from 'react';

const Quote = (quote) => {
  return (
    <div className="uk-card-body">
      <div className="quote-body uk-card-title">"{quote.body}"</div>
      <div className="quote-author">
        - {quote.author}
      </div>
      {quote.source && (
        <div className="quote-source">
          Source: <a href={quote.source} target="_blank" rel="noopener noreferrer">{quote.source}</a>
        </div>
      )}
    </div>
  )
};

export default Quote;