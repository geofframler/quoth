import React, { useState } from 'react';

import '../styles/inputform.css';

import RavenSuccess from '../raven-success.png';

function EditModal(props) {
  const [editInputs, setEditInputs] = useState({ id: props.id, body: props.body, author: props.author, source: props.source });
  const [ravenSuccess, setRavenSuccess] = useState('');

  // Edit an existing quote in the database
  const editQuote = () => {
    return fetch('http://localhost:3001/quotes/' + editInputs.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: editInputs.body,
        author: editInputs.author,
        source: editInputs.source,
      })
    })
  }

  // Update state on form input
  const handleInputChange = (event) => {
    event.persist();
    setEditInputs(editInputs => ({ ...editInputs, [event.target.name]: event.target.value }));
  }

  // Handle the form submission for editing a quote
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    editQuote(editInputs)
      .then(() => props.getQuotes())
      .then(() => setRavenSuccess('raven-success-show'))
      .then(() => setTimeout(() => {
        setRavenSuccess('')
      }, 3000));
  }

  return (
    <div id={'edit-' + props.id} className='uk-modal uk-flex-top' uk-modal='true'>
      <div className='uk-modal-dialog uk-margin-auto-vertical'>
        <button className='uk-modal-close-default' type='button' uk-close='true'></button>
        <div className='uk-modal-header'>
          <h2 className='uk-modal-title'>Edit this {editInputs.author} quote:</h2>
        </div>
        <div className='uk-modal-body'>
          <div id='input-form'>

            <form onSubmit={handleSubmit} autoComplete='off'>

              <label>Quote</label>
              <textarea
                className='input-form-body uk-textarea'
                type='text'
                name='body'
                placeholder='Put your quote here!'
                onChange={handleInputChange}
                value={editInputs.body}
                autoFocus
                required />
              <br />

              <label>Author</label>
              <input
                className='input-form-author uk-input'
                type='text'
                name='author'
                placeholder='Author Name'
                onChange={handleInputChange}
                value={editInputs.author}
                required />

              <label>Source</label>
              <input
                className='input-form-source uk-input'
                type='text'
                name='source'
                placeholder='https://url.of/author'
                onChange={handleInputChange}
                value={editInputs.source} />
              <br />

              <button
                className='uk-button uk-button-default uk-modal-close'
                type='button'>
                Close
              </button>
              <button
                type='submit'
                className='uk-button uk-button-primary' >
                <div id='raven-success-edit' className={ravenSuccess}><img src={RavenSuccess} /></div>
                Edit Quote
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;