import React from 'react';

const Quote = ({ getQuotes, id }) => {
  // Delete a quote from server by ID
  const deleteQuote = (id) => {
    return fetch('http://localhost:3001/quotes/' + id, {
      method: 'DELETE',
    })
      .then(() => getQuotes());
  }

  return (
    <div className='uk-card-footer'>
      <button
        className='edit-link uk-button uk-button-text uk-float-left'
        uk-toggle={'target: #edit-' + id}>
        <span className='icon' uk-icon='icon: pencil; ratio: .8' />
        Edit
      </button>
      <button
        className='delete-link uk-button uk-button-text uk-float-right'
        type='button'>
        Delete
        <span className='icon' uk-icon='icon: trash; ratio: .8' />
      </button>
      <div className='delete-drop' 
           uk-drop='mode: click; 
                    pos: top; animation: 
                    uk-animation-slide-bottom-small; 
                    duration: 500;'>
        <div className='delete-drop-content uk-card uk-card-small uk-card-body 
                        uk-card-secondary uk-card-hover'>
          <h5>Are you sure?</h5>
          <button
            onClick={() => deleteQuote(id)}
            type='submit'
            className='delete-button uk-button 
                       uk-button-default uk-button-danger'>
            Yes
          </button>
        </div>
      </div>
    </div>
  )
};

export default Quote;