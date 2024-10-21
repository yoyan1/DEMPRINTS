"use client"
import React from 'react';

const MyComponent = () => {
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    gender: '',
    birth_date: '',
    address: '',
    contact_number: '',
    contact_email: '',
    contact_person: '',
    mandatory_benefit: '',
    job_title: '',
    department: '',
    hire_date: '',
    wage: '',
    basis: '',
    frequency: '',
    leave_entitlement: '',
    contract: '',
    pre_employment: '',
    certificates: '',
    review: '',
    actions: '',
  });

  const [errorMessages, setErrorMessages] = React.useState({});

  const isInvalid = React.useMemo(() => {
    const errors = {};

    if (!credentials.firstname) errors.firstname = "First name is required.";
    if (!credentials.lastname) errors.lastname = "Last name is required.";
    if (!credentials.email) errors.email = "Email is required.";
    if (credentials.email && !validateEmail(credentials.email)) errors.email = "Email is invalid.";
    if (!credentials.password) errors.password = "Password is required.";
    
    // Add additional validation checks as needed

    setErrorMessages(errors);
    return errors;
  }, [credentials]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrorMessages((prev) => ({ ...prev, [name]: "" })); // Clear error message on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = isInvalid;
    if (Object.keys(errors).length === 0) {
      // Proceed with form submission
      console.log("Form submitted:", credentials);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstname"
        value={credentials.firstname}
        onChange={handleChange}
        placeholder="First Name"
        style={{ borderColor: errorMessages.firstname ? 'red' : 'black' }}
      />
      {errorMessages.firstname && <span>{errorMessages.firstname}</span>}
      
      <input
        type="text"
        name="lastname"
        value={credentials.lastname}
        onChange={handleChange}
        placeholder="Last Name"
        style={{ borderColor: errorMessages.lastname ? 'red' : 'black' }}
      />
      {errorMessages.lastname && <span>{errorMessages.lastname}</span>}
      
      <input
        type="email"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="Email"
        style={{ borderColor: errorMessages.email ? 'red' : 'black' }}
      />
      {errorMessages.email && <span>{errorMessages.email}</span>}
      
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Password"
        style={{ borderColor: errorMessages.password ? 'red' : 'black' }}
      />
      {errorMessages.password && <span>{errorMessages.password}</span>}
      
      {/* Add other fields similarly */}
      
      <button type="submit">Submit</button>
    </form>
  );
};

// Example validation function
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default MyComponent;
