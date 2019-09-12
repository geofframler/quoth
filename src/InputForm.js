import React, { useState } from 'react';
import './inputform.css';

function InputForm({ getQuotes }) {
  const [inputs, setInputs] = useState({body: '', author: '', source: ''});
  const [sourceLink, setSourceLink] = useState("source-link-show");
  const [sourceField, setSourceField] = useState("source-field-hide");

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

  const setSource = (event) => {
    if (event) event.preventDefault();
    setSourceLink('source-link-hide');
    setSourceField('source-field-show')
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
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>Quote</label>
        <textarea 
          className="post-body quote-form-body uk-textarea"
          type="text" 
          name="body" 
          placeholder="Put your quote here!" 
          onChange={handleInputChange} 
          value={inputs.body} 
          autoFocus
          required />
        <label>Author</label>
        <input
          className="post-author quote-form-author uk-input"
          type="text"
          name="author"
          placeholder="Author"
          onChange={handleInputChange} 
          value={inputs.author} 
          required />
        <label>Source</label>
        <div className={'source-link ' + sourceLink}>
          <a href="/#" onClick={setSource}>Add Source</a>
        </div>
        <input
          className={'post-source quote-form-source uk-input ' + sourceField} 
          type="text"
          name="source"
          placeholder="https://url.of/author"
          onChange={handleInputChange} 
          value={inputs.source} />
          <br />
        <button 
          type="submit"
          className="post-button uk-button uk-button-primary">
            Add A Quote
        </button>
      </form>
    </div>
  );
}

export default InputForm;