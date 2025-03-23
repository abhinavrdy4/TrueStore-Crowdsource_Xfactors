// src/Components/MySubmissionsPage.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

const MySubmissionsPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes to capture the current user
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, []);

  // Once the currentUser is set, run the Firestore query
  useEffect(() => {
    if (!currentUser) {
      setSubmissions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const userEmail = currentUser.email;
    const q = query(
      collection(db, 'submissions'),
      where('email', '==', userEmail),
      orderBy('createdAt', 'desc')
    );
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
    return () => unsubscribeSnapshot();
  }, [currentUser]);

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2>My Submissions</h2>
      {loading ? (
        <p>Loading your submissions...</p>
      ) : submissions.length > 0 ? (
        submissions.map((submission) => (
          <div
            key={submission.id}
            style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}
          >
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
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {submission.capturedMedia.map((media, index) => (
                  <div key={index} style={{ border: '1px solid #ccc', padding: '5px' }}>
                    {media.type === 'image' ? (
                      <img
                        src={media.src}
                        alt={`My Submission ${index}`}
                        style={{ width: '150px' }}
                      />
                    ) : (
                      <video src={media.src} controls style={{ width: '150px' }} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>You have not made any submissions yet.</p>
      )}
    </div>
  );
};

export default MySubmissionsPage;
