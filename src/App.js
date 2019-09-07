import React from 'react';
import Quotes from './Quotes';
import CreateQuote from './CreateQuote';

function CCNQuotes() {
  return(
    <React.Fragment>
      <h1>Quotes</h1>
      <CreateQuote />
      <Quotes />
    </React.Fragment>
  ) 
}

export default CCNQuotes;
