import { useState } from 'react';

const useQuoteForm = (initialValues, callback) => {
  const [inputs, setInputs] = useState(initialValues);

  const handleInputChange = (event) => {
      event.persist();
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    callback();
  }
  
  return {
    inputs,
    handleInputChange,
    handleSubmit
  };
}

export default useQuoteForm;