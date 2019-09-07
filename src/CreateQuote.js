import React from 'react';
import useQuoteForm from './hooks';
import './createquote.css';

function CreateQuote() {
  const createQuote = () => {
    const urlQuotes = "http://localhost:3001/quotes";
    return fetch(urlQuotes, {
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

  const {inputs, handleInputChange, handleSubmit} = useQuoteForm({body: '', author: '', source: ''}, createQuote);

  return (
    <div id="quoteForm">
      <h2>Add a Quote</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>Quote</label>
        <textarea 
          className="textarea"
          type="text" 
          name="body" 
          placeholder="Put your quote here!" 
          onChange={handleInputChange} 
          value={inputs.body} 
          required />
        <br />
        <label>Author</label>
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          onChange={handleInputChange} 
          value={inputs.author} 
          required />
        <label>Source</label>
        <input
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

export default CreateQuote;