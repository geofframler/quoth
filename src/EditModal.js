import React, { useState } from 'react';
import './inputform.css';

function EditModal( props ) {
  const [editInputs, setEditInputs] = useState({id: props.id, body: props.body, author: props.author, source: props.source});
  const [alert, setAlert] = useState('alert-hide');

  const quoteUrl = 'http://localhost:3001/quotes/' + editInputs.id;

  const editQuote = () => {
    return fetch( quoteUrl , {
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

  const handleInputChange = (event) => {
    event.persist();
    setEditInputs(editInputs => ({...editInputs, [event.target.name]: event.target.value}));
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    editQuote(editInputs)
    .then(() => setAlert('alert-hide'))
    .then(() => props.getQuotes())
    .then(() => setAlert('alert-show'))
    .then(() => setTimeout(() => {
                  setAlert('alert-hide')
                }, 3000));
  }

  return (
    <div id={'edit-' + props.id} className="uk-modal uk-flex-top" uk-modal="true">
        <div className="uk-modal-dialog uk-margin-auto-vertical">
          <button className="uk-modal-close-default" type="button" uk-close="true"></button>
          <div className="uk-modal-header">
              <h2 className="uk-modal-title">Edit this {editInputs.author} quote:</h2>
          </div>
          <div className="uk-modal-body">
          <div id="quote-form">
              <div className={alert}>
              <div className="uk-alert-success" uk-alert="true">
                  <p>Quote successfully edited!</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off">
              <label>Quote</label>
              <textarea 
                className="quote-form-body uk-textarea"
                type="text" 
                name="body" 
                placeholder="Put your quote here!" 
                onChange={handleInputChange} 
                value={editInputs.body} 
                autoFocus
                required />
              <br />
              <label>Author</label>
              <input
                className="quote-form-author uk-input"
                type="text"
                name="author"
                placeholder="Author Name"
                onChange={handleInputChange} 
                value={editInputs.author} 
                required />
              <label>Source</label>
              <input
                className="quote-form-source uk-input"
                type="text"
                name="source"
                placeholder="https://url.of/author"
                onChange={handleInputChange} 
                value={editInputs.source} />
                <br />
                <button 
                  class="uk-button uk-button-default uk-modal-close" 
                  type="button">
                    Close
                </button>
              <button 
                type="submit"
                className="uk-button uk-button-primary" >
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