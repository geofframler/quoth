import React from 'react';
import QuoteForm from './QuoteForm';
import QuoteList from './QuoteList';

function App() {
  return(
    <React.Fragment>
      <h1>Quotes</h1>
      <QuoteForm />
      <QuoteList />
    </React.Fragment>
  ) 
}

export default App;
