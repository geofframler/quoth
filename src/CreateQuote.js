import React from 'react';
import './createquote.css';

function CreateQuote() {
  return (
    <div id="quoteForm">
      <h2>Add a Quote</h2>
      <form>
        <label>Quote</label>
        <textarea type="text" placeholder="Put your quote here!" />
          <br />
        <label>Author</label>
        <input type="text" placeholder="Author Name" />    
        <label>Source</label>
        <input type="text" placeholder="https://url.of/author" />
          <br />
        <button type="submit">Add Quote</button>
      </form>
    </div>
  );
}

export default CreateQuote;