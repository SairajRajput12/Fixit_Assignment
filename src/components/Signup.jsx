import React, { useState } from 'react';
import Form from '../UI/Form';
import Button from '../UI/Button';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [selectedOption, setSelectedOption] = useState('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate(); 

  const toggleOptions = (
    <div className="show-options">
      <div
        onClick={() => setSelectedOption('signup')}
        className={selectedOption === 'signup' ? 'active' : ''}
      >
        Signup
      </div>
      <div
        onClick={() => setSelectedOption('login')}
        className={selectedOption === 'login' ? 'active' : ''}
      >
        Login
      </div>
    </div>
  );

  const googleButton = (
    <div className="google-auth">
      <Button className="google-button">Sign in with Google</Button>
    </div>
  );

  const signupContent = (
    <>
      <h1>Signup Form</h1>
      {toggleOptions}
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Re-enter your password"
      />
      <Button className="submit">Submit</Button>
    </>
  );

  const loginContent = (
    <>
      <h1>Login Form</h1>
      {toggleOptions}
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <Button className="submit">Submit</Button>
    </>
  );

  const SendSignupData = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    if (confirmPassword !== password) {
      setErrorMessage('Confirm Password and Typed Password do not match!');
      return;
    }

    try {
      const response = await fetch('https://backend-code-ngs0.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        const userId = result.uid; 
        alert('Your Generated User Id Is',userId);
        navigate(`/create/${userId}`);
      } else {
        setErrorMessage(result.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while signing up. Please try again.');
    }
  };

  const SendLoginData = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    try {
      const response = await fetch('https://backend-code-ngs0.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email:email,
          password:password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Login Successfully!');
        const userId = result.uid; 
        alert('Your Generated User Id Is',userId);
        navigate(`/create/${userId}`);
      } else {
        setErrorMessage(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <Form
      className="form"
      onSubmit={
        selectedOption === 'signup'
          ? (e) => SendSignupData(e)
          : (e) => SendLoginData(e)
      }
    >
      {selectedOption === 'signup' ? signupContent : loginContent}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </Form>
  );
}
