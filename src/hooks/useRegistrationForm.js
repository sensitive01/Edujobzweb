import { useState } from 'react';

export const useRegistrationForm = (callback, validate) => {
  const [values, setValues] = useState({
    userName: '',
    userMobile: '',
    userEmail: '',
    userPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Run validation if provided
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length === 0) {
        callback(values);
      }
    } else {
      callback(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit
  };
};