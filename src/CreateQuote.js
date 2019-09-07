import React from 'react';

function CreateQuote() {
  return (
    <React.Fragment>
      <h2>Add a Quote</h2>
        <textarea placeholder="Put your quote here!" />
          <br />
        <input placeholder="Author" />
          <br />
        <input placeholder="Source" />
          <br />
      <button>Add Quote</button>
    </React.Fragment>
  );
}

export default CreateQuote;