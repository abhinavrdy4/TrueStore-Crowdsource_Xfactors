// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase-config';
import SignUpPage from './Components/SignUpPage';
import MainMenu from './Components/MainMenu';
import Camera from './Components/Camera';
import EnhancedCamera from './Components/EnhancedCamera';
import UserSubmissionHistoryPage from './Components/UserSubmissionHistoryPage';
import AppealsPage from './Components/AppealsPage';
import PublicViewPage from './Components/PublicViewPage';
import MySubmissionsPage from './Components/MySubmissionsPage';
import UploadForm from './Components/UploadForm';
import EnhancedCameraSignup from './Components/EnhancedCameraSignup';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={user ? <Navigate to="/main" /> : <SignUpPage />} />
        <Route path="/main" element={user ? <MainMenu /> : <Navigate to="/signup" />} />
        <Route path="/camera" element={<EnhancedCameraSignup />} />
        <Route path="/" element={user ? <Navigate to="/main" /> : <Navigate to="/signup" />} />
        <Route path="/enhanced-camera" element={<EnhancedCamera />} />
        <Route path="/submissions" element={<UserSubmissionHistoryPage />} />
        <Route path="/appeals" element={<AppealsPage />} />
        <Route path="/public-view" element={<PublicViewPage />} />
        <Route path="/my-submissions" element={<MySubmissionsPage />} />
        <Route path="/upload-form" element={<UploadForm />} />
      </Routes>
    </Router>
  );
}

export default App;