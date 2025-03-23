// src/Components/PublicViewPage.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const PublicViewPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes to get current user email
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserEmail(user.email);
      } else {
        setCurrentUserEmail(null);
      }
    });

    // Query all submissions ordered by creation time
    const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
    const unsubscribeSnapshot = onSnapshot(
      q,
      (querySnapshot) => {
        const subs = [];
        querySnapshot.forEach((doc) => {
          subs.push({ id: doc.id, ...doc.data() });
        });
        setSubmissions(subs);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching submissions:', error);
        setLoading(false);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  const handleMySubmissionsClick = () => {
    navigate('/my-submissions');
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2>Public View</h2>
      {/* "My Submissions" button at the top-right */}
      {currentUserEmail && (
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <button onClick={handleMySubmissionsClick}>My Submissions</button>
        </div>
      )}
      {loading ? (
        <p>Loading submissions...</p>
      ) : submissions.length > 0 ? (
        submissions.map((submission) => (
          <div
            key={submission.id}
            style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}
          >
            <p>
              <strong>Submitted By:</strong> {submission.email}
            </p>
            <p>
              <strong>Type of Offence:</strong> {submission.offenceType}
            </p>
            <p>
              <strong>Description:</strong> {submission.description}
            </p>
            <p>
              <strong>Date:</strong>{' '}
              {submission.createdAt?.toDate().toLocaleString() || 'N/A'}
            </p>
            {submission.capturedMedia && submission.capturedMedia.length > 0 && (
  <div className="media-grid">
    {submission.capturedMedia.map((media, idx) => (
      <div key={idx} className="media-item">
        {media.type === 'image' ? (
          <img src={media.fileUrl || media.src} alt={`Attachment ${idx}`} style={{ width: '150px' }} />
        ) : (
          <video src={media.fileUrl || media.src} controls style={{ width: '150px' }} />
        )}
        <p style={{ fontSize: '0.8em', color: '#555', display:'flex' }}>
          Hash: {media.fileHash ? media.fileHash : 'N/A'}
        </p>
      </div>
    ))}
  </div>
)}

            {/* Disagree button for entries not submitted by the current user */}
            {(currentUserEmail === null || currentUserEmail !== submission.email) && (
              <button style={{ marginTop: '10px' }}>Disagree</button>
            )}
          </div>
        ))
      ) : (
        <p>No submissions found.</p>
      )}
    </div>
  );
};

export default PublicViewPage;
