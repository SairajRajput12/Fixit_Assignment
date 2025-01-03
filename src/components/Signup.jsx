import React, { useState } from 'react';
import Form from '../UI/Form';
import Button from '../UI/Button';
import './Signup.css';

export default function Signup() {
  const [selectedOption, setSelectedOption] = useState('signup');

  const toggleOptions = (
    <div className='show-options'>
      <div onClick={() => setSelectedOption('signup')} className={selectedOption === 'signup' ? 'active' : ''}>
        Signup
      </div>
      <div onClick={() => setSelectedOption('login')} className={selectedOption === 'login' ? 'active' : ''}>
        Login
      </div>
    </div>
  );

  const googleButton = (
    <div className='google-auth'>
      <Button className='google-button'>Sign in with Google</Button>
    </div>
  );

  const signupContent = (
    <>
      <h1>Signup Form</h1>
      {toggleOptions}
      <label htmlFor='username'>Username:</label>
      <input id='username' type='text' />
      <label htmlFor='email'>Email:</label>
      <input id='email' type='email' />
      <label htmlFor='password'>Password:</label>
      <input id='password' type='password' />
      <label htmlFor='confirmPassword'>Confirm Password:</label>
      <input id='confirmPassword' type='password' />
      <Button className='submit'>Submit</Button>
      <div className='divider'>or</div>
      {googleButton}
    </>
  );

  const loginContent = (
    <>
      <h1>Login Form</h1>
      {toggleOptions}
      <label htmlFor='email'>Email:</label>
      <input id='email' type='email' />
      <label htmlFor='password'>Password:</label>
      <input id='password' type='password' />
      <Button className='submit'>Submit</Button>
      <div className='divider'>or</div>
      {googleButton}
    </>
  );

  return (
    <Form className='form'>
      {selectedOption === 'signup' ? signupContent : loginContent}
    </Form>
  );
}
