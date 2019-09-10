import React, { useState } from 'react';
import './quoteform.css';

function QuoteForm({ getQuotes }) {
  const [inputs, setInputs] = useState({body: '', author: '', source: ''});

  const postQuote = () => {
    return fetch('http://localhost:3001/quotes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: inputs.body,
        author: inputs.author,
        source: inputs.source,
      })
    })
  }

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    postQuote(inputs)
    .then(() => setInputs({body: '', author: '', source: ''}))
    .then(() => getQuotes());
  }

  return (
    <div id="quote-form">
      <h2>Add a Quote</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>Quote</label>
        <textarea 
          className="quote-form-body"
          type="text" 
          name="body" 
          placeholder="Put your quote here!" 
          onChange={handleInputChange} 
          value={inputs.body} 
          autoFocus
          required />
        <br />
        <label>Author</label>
        <input
          className="quote-form-author"
          type="text"
          name="author"
          placeholder="Author Name"
          onChange={handleInputChange} 
          value={inputs.author} 
          required />
        <label>Source</label>
        <input
          className="quote-form-source"
          type="text"
          name="source"
          placeholder="https://url.of/author"
          onChange={handleInputChange} 
          value={inputs.source} 
          required />
          <br />
        <button type="submit">Add Quote</button>
      </form>
    </div>
  );
}

export default QuoteForm;