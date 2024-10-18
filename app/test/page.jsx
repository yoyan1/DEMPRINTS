// src/App.js
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@nextui-org/react';

const App = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [credentials, setCredentials] = useState({
        email: null,
        password: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setCredentials((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/getUsers');
                setUsers(response.data);
            } catch (err) {
                setError(`Error fetching users ${err}`);
            }
        };

        fetchUsers();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await axios.post('http://localhost:5000/api/users/register', credentials);
          
          if (response.status === 201) {
            console.log('Registration successful:', response.data);
            setError(null);
          } else {
            setError('Unexpected response from server');
          }
          
        } catch (error) {
          if (error.response) {
            console.error('Error response from server:', error.response.data);
            setError(error.response.data.message || 'Error occurred during registration');
          } else if (error.request) {
            console.error('No response from server:', error.request);
            setError('No response from server. Please try again later.');
          } else {
            console.error('Error setting up the request:', error.message);
            setError('Error setting up request');
          }
        }
      };      

    if (error) return <div>{error}</div>;

    return (
        <div>
            <div>
                <form onSubmit={submit}>
                    <Input placeholder='email' type='email' value={credentials.email} onChange={hand}/>
                    <Input placeholder='password' type='password' value={credentials.password} onChange={(e) => setCredentials(prevUser => ({ ...prevUser, password: e.target.value }))}/>
                    <input type="submit" placeholder='submit' />
                </form>
            </div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
