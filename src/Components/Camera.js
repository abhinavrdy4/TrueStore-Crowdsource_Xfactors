import React, { useRef, useEffect, useState } from 'react';

const Camera = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Request access to the video stream
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera", err);
        setError("Error accessing camera. Please check your permissions.");
      }
    };

    startCamera();

    // Cleanup: stop all video tracks when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Camera View</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: '100%', maxWidth: '600px' }}
      ></video>
    </div>
  );
};

export default Camera;
