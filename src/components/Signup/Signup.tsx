import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !='') {
      try {
        const response = await fetch('https://mulearn-internship-task-production.up.railway.app/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username,password}),
        });

        if (response.ok) {
          navigate('/');
        } else {
          throw new Error('Error registering user');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='signup'>
      <div className='signup-div'>
        <h1 className='h1_s'>Sign Up</h1>
        <form className='form_s' onSubmit={handleSubmit}>
          <label htmlFor='fname'>Username</label>
          <br />
          <input
            className='input-signup'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id='fname'
            name='name'
            placeholder='Username'
          />
          <br />
          <label htmlFor='fname'>Email</label>
          <br />
          <input
            className='input-signup'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id='fname'
            name='email'
            placeholder='E-mail'
          />
          <br />
          <label htmlFor='lname'>Phone</label>
          <br />
          <input
            className='input-signup'
            type='number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id='lname'
            name='phone'
            placeholder='+91-'
          />
          <br />
          <label htmlFor='lname'>Password</label>
          <br />
          <input
            className='input-signup'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id='lname'
            name='password'
            placeholder='Password'
          />
          <br />
          <br />
          <button className='signup-btn' type='submit'>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
