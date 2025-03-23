// src/Components/MainMenu.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import './MainMenu.css'; // optional styling

const MainMenu = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut().catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  // Navigate to each page
  const goToSubmissionHistory = () => navigate('/submissions');
  const goToAppeals = () => navigate('/appeals');
  const goToPublicView = () => navigate('/public-view');
  const goToEnhancedCamera = () => navigate('/enhanced-camera');


  return (
    <div className="container">
      <h2>Main Menu</h2>
      <p>Welcome to the main menu.</p>
      
      <div style={{ margin: '20px 0' }}>
        <button onClick={goToEnhancedCamera}>Camera</button>
        <button onClick={goToAppeals}>Appeals</button>
        <button onClick={goToPublicView}>Public View</button>
      </div>
      <div style={{ marginTop: '20px' }}></div>
      <button onClick={handleSignOut}>SIGN OUT</button>
    </div>
  );
};

export default MainMenu;
