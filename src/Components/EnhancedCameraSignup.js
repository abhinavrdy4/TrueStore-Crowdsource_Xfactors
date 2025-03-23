import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';

const EnhancedCameraSignup = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null); // to store the media stream
  const recordedChunksRef = useRef([]); // for video recording
  const [capturedMedia, setCapturedMedia] = useState([]); // Array of { type: 'image' | 'video', src: string }
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const navigate = useNavigate();

  // Start camera when component mounts.
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" }  // This requests the back camera on mobile devices
          },
          audio: true
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };
    

    startCamera();

    // Cleanup: stop the camera when the component unmounts.
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/png');
    setCapturedMedia((prev) => [...prev, { type: 'image', src: dataURL }]);
  };

  const startRecording = () => {
    if (!streamRef.current) return;
    const recorder = new MediaRecorder(streamRef.current, { mimeType: 'video/webm;codecs=vp8' });
    recordedChunksRef.current = []; // reset recorded chunks
    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };
    recorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const videoURL = URL.createObjectURL(blob);
      setCapturedMedia((prev) => [...prev, { type: 'video', src: videoURL }]);
      recordedChunksRef.current = [];
    };
    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  // On "Proceed" click, sign in (if not already) and then navigate to the Upload Form page with captured media.
  const proceedToUpload = async () => {
    // Stop camera before proceeding.
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    try {
      // If user is not signed in, sign them in using Bits Gmail.
      if (!auth.currentUser) {
        await signInWithPopup(auth, googleProvider);
      }
      // After successful sign in, navigate to the Upload Form page with the captured media.
      navigate('/upload-form', { state: { capturedMedia } });
    } catch (err) {
      console.error("Error during sign-in:", err);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Enhanced Camera (Sign-Up Flow)</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '100%', maxWidth: '600px' }}
      ></video>
      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div style={{ marginTop: '10px' }}>
        <button onClick={capturePhoto}>Capture Photo</button>
        {!isRecording && <button onClick={startRecording}>Start Video Recording</button>}
        {isRecording && <button onClick={stopRecording}>Stop Recording</button>}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Captured Media</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
          {capturedMedia.map((media, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '5px' }}>
              {media.type === 'image' ? (
                <img src={media.src} alt={`Capture ${index}`} style={{ width: '150px', height: 'auto' }} />
              ) : (
                <video src={media.src} controls style={{ width: '150px' }}></video>
              )}
            </div>
          ))}
        </div>
      </div>
      {capturedMedia.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <button onClick={proceedToUpload}>Proceed to Upload Form</button>
        </div>
      )}
    </div>
  );
};

export default EnhancedCameraSignup;
