import React, { useState } from 'react';

import '../styles/inputform.css';

import RavenSuccess from '../raven-success.png';

function InputForm({ getQuotes }) {
  const [inputs, setInputs] = useState({ body: '', author: '', source: '' });
  const [sourceLink, setSourceLink] = useState('source-link-show');
  const [sourceField, setSourceField] = useState('source-field-hide');
  const [ravenSuccess, setRavenSuccess] = useState('');

  // Post a new quote to the database
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

  // Display the form for adding a cited source
  const setSource = (event) => {
    if (event) event.preventDefault();
    setSourceLink('source-link-hide');
    setSourceField('source-field-show')
  }

  // Update state on form input
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  }

  // Handle the form submission for adding a new post
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    postQuote(inputs)
      .then(() => setInputs({ body: '', author: '', source: '' }))
      .then(() => getQuotes())
      .then(() => setRavenSuccess('raven-success-show'))
      .then(() => setTimeout(() => {
        setRavenSuccess('')
      }, 3000));
  }

  return (
    <div className='input-form-wrapper uk-card uk-card-body uk-card-small uk-card-primary uk-card-hover'>
      <div id='input-form' className='post-form'>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <label>Quote</label>
          <div className='quotation-mark-left'><span uk-icon='icon: quote-right; ratio: 4'></span></div>
          <div className='quotation-mark-right'><span uk-icon='icon: quote-right; ratio: 4'></span></div>
          <textarea
            className='post-body input-form-body uk-textarea'
            type='text'
            name='body'
            placeholder='Put your quote here!'
            onChange={handleInputChange}
            value={inputs.body}
            autoFocus
            required />
          <label>Author</label>
          <div className='author-hyphen'>-</div>
          <input
            className='post-author input-form-author uk-input'
            type='text'
            name='author'
            placeholder='Author'
            onChange={handleInputChange}
            value={inputs.author}
            required />
          <label>Source</label>
          <div className={'source-link ' + sourceLink}>
            <a href='/#' onClick={setSource}>Add Citation</a>
          </div>
          <input
            className={'post-source input-form-source uk-input ' + sourceField}
            type='text'
            name='source'
            placeholder='https://url.of/author'
            onChange={handleInputChange}
            value={inputs.source} />
          <br />
          <button
            type='submit'
            className='post-button uk-button uk-button-primary'>
            <div id='raven-success' className={ravenSuccess}><img src={RavenSuccess} alt='Raven Success' title='Success!' /></div>
            Add A Quote
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputForm;