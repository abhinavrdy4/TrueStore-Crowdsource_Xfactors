// src/Components/UploadForm.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { computeSHA256 } from '../utils/fileHash'; // adjust path as needed

// Helper function: Converts a data URL to a Blob
function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const UploadForm = () => {
  // Retrieve captured media passed via state from EnhancedCamera
  const location = useLocation();
  const { capturedMedia } = location.state || { capturedMedia: [] };
  const navigate = useNavigate();

  const [offenceType, setOffenceType] = useState('');
  const [description, setDescription] = useState('');
  const [showMedia, setShowMedia] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // For each captured media item, compute file hash if not already computed.
      for (let i = 0; i < capturedMedia.length; i++) {
        if (!capturedMedia[i].fileHash) {
          const blob = dataURLtoBlob(capturedMedia[i].src);
          capturedMedia[i].fileHash = await computeSHA256(blob);
        }
      }
      // Get the current user's email from Firebase Auth
      const userEmail = auth.currentUser.email;
      const submissionData = {
        email: userEmail,
        offenceType,
        description,
        capturedMedia,
        createdAt: serverTimestamp(),
      };
      // Store the submission in Firestore under a "submissions" collection
      await addDoc(collection(db, 'submissions'), submissionData);
      setLoading(false);
      // After submission, redirect to the main menu or a submission history page
      navigate('/main');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Error submitting form. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Upload Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Type of Offence:</label>
          <select
            value={offenceType}
            onChange={(e) => setOffenceType(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">Select an option</option>
            <option value="3 ppl on 2-wheeler">3 people on 2-wheeler</option>
            <option value="Over-Speeding">Over-Speeding</option>
            <option value="Rash-Driving">Rash-Driving</option>
            <option value="Parking in No-Parking Zones">Parking in No-Parking Zones</option>
            <option value="Unnecessary Use of Horns">Unnecessary Use of Horns</option>
            <option value="Using Mobile Phone While Driving">Using Mobile Phone While Driving</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter vehicle description....."
            required
            rows="4"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          ></textarea>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <button type="button" onClick={() => setShowMedia(!showMedia)}>
            {showMedia ? 'Hide Captured Media' : 'View Captured Media'}
          </button>
          {showMedia && (
            <div style={{ marginTop: '10px' }}>
              {capturedMedia.length > 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  {capturedMedia.map((media, index) => (
                    <div
                      key={index}
                      style={{ border: '1px solid #ccc', padding: '5px' }}
                    >
                      {media.type === 'image' ? (
                        <img
                          src={media.src}
                          alt={`Capture ${index}`}
                          style={{ width: '150px' }}
                        />
                      ) : (
                        <video
                          src={media.src}
                          controls
                          style={{ width: '150px' }}
                        ></video>
                      )}
                      <p style={{ fontSize: '0.8em', color: '#555' }}>
                        Hash: {media.fileHash ? media.fileHash : 'Calculating...'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No media captured.</p>
              )}
            </div>
          )}
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
