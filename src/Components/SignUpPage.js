// src/Components/SignUpPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import './SignUpPage.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleBitsGoaSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        navigate('/main');
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        setError("Failed to sign in. Please try again.");
      });
  };

  const handleCamera = () => {
    navigate('/camera');
  };

  return (
    <div className="container">
      <h2>CrowdSourced Traffic Violation Platform</h2>
      <h2>Sign In Page</h2>
      {error && <p className="error">{error}</p>}
      <div className="button-group">
        <button onClick={handleBitsGoaSignIn}>Sign in with Bits Goa Gmail</button>
        <button onClick={handleCamera}>Camera</button>
      </div>
    </div>
  );
};  

export default SignUpPage;
