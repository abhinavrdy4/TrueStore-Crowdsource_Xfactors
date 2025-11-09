
# TrueStore Crowdsource Xfactors

###  Web Application  
**Frontend:** [crowdsource-b266e.web.app](https://crowdsource-b266e.web.app)  
**Blockchain Backend:** [testingfront-kqrgndany-satviks-projects-2883dc5b.vercel.app](https://testingfront-kqrgndany-satviks-projects-2883dc5b.vercel.app)

---

##  Current Status
We are currently troubleshooting an issue where the blockchain-based backend (running on one machine) cannot communicate with the frontend hosted on another.  
Both the backend and frontend work independently without issues. Documentation will be updated once this integration problem is resolved.

---

##  Project Overview
This project demonstrates a **private blockchain-inspired ledger** that tracks *fake currency balances* and logs *user transactions with file attachments*.

### Core Components
- **Backend (Node.js):** Implements blockchain logic, transaction handling, and file hashing.  
- **Frontend (React):** Provides the user interface for submission, media capture, and transaction visualization.

---

## Table of Contents
1. [Features](#-features)
2. [Project Overview](#-project-overview)
3. [Setup Instructions](#-setup-instructions)
4. [Prerequisites](#-prerequisites)
5. [Backend Setup](#-backend-setup)
6. [Frontend Setup](#-frontend-setup)
7. [Running the Project](#-running-the-project)
8. [Core Logic](#-core-logic)
9. [Unit Testing](#-unit-testing)
10. [Accessibility Considerations](#-accessibility-considerations)
11. [Additional Features](#-additional-features)
12. [Deployment](#-deployment)
13. [License](#-license)

---

## Features

### Blockchain-Inspired Ledger
- Simulates blockchain behavior with **blocks** and **transactions**.
- Tracks **fake currency balances** for users with BITS email addresses.

### File Hashing
- Computes **SHA-256 hashes** for uploaded files (photos, videos).

### Media Capture
- Supports **photo and video capture** (including mobile back camera).

### Secure Transactions
- Enforces **Firebase Authentication** for authorized BITS users.

### User-Friendly Interface
- Modern **React UI** with ghost text, responsive design, and themed layout.

---

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher) & npm  
- Firebase Project with Firestore, Storage, and Authentication  
- Google Cloud SDK or **Vercel/Render** account  
- *(Optional)* Docker for containerized deployments

---

## Backend Setup

1. **Clone the Repository**  
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Navigate to Backend Folder**  
   ```bash
   cd server
   ```

3. **Install Dependencies**  
   ```bash
   npm install
   ```

4. **Configure Firebase Admin**  
   - Obtain a **service account JSON** file from Firebase Console.  
   - Update `/server/admin.js` with the credentials and storage bucket.

5. **(Optional) Docker Setup**  
   ```bash
   docker build -t my-node-server .
   docker run -p 3001:3001 my-node-server
   ```

---

## Frontend Setup

1. **Navigate to Frontend Folder**  
   ```bash
   cd src
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Configure Firebase Client**  
   Update `/src/firebase-config.js` with your Firebase project settings.

4. **File Hash Utility**  
   Verify `/src/utils/fileHash.js` includes SHA-256 logic using the Web Crypto API.

---

## Running the Project

### Development Mode
**Backend:**  
```bash
cd server
node server.js
```

**Frontend:**  
```bash
npm start
```
Frontend will start at [http://localhost:3000](http://localhost:3000)

### Production Build
**Frontend:**  
```bash
npm run build
```
Deploy build to Firebase, Vercel, or your hosting service.

**Backend Deployment:**  
Use **Google Cloud Run**, **Vercel**, **Render**, or **Firebase Cloud Functions**.

---

## Core Logic

### Blockchain Ledger
- Implements **Block** and **Blockchain** classes.  
- Each block includes: index, timestamp, transactions, previous hash, and SHA-256 hash.  
- User balances are updated per transaction, maintaining immutability.

### File Hashing
- Client computes file hashes before submission.  
- Uses Web Crypto API in `/src/utils/fileHash.js`.

---

## Unit Testing

### Backend
Use Jest or Mocha to test blockchain logic:  
- `Block.calculateHash()`  
- `Blockchain.isChainValid()`

### Frontend
Use React Testing Library + Jest:  
- Validate UI elements and hash computation flow.

*(Unit tests not fully implemented yet — suggested structure in `/tests` folder.)*

---

## Accessibility Considerations

- **Semantic HTML**: Proper use of `<form>`, `<label>`, and `<textarea>` elements.  
- **Placeholder & Alt Text**: Ensures assistive readability.  
- **Responsive Design**: Mobile-friendly and high contrast UI.

---

## Additional Features

- Optimized **mobile camera** via `{ facingMode: { ideal: "environment" } }`.  
- Custom **CSS theme** for consistent and modern design.  
- Backend secured with **Firebase Admin SDK** and token verification.

---

## Deployment Options

### Google Cloud Run
```bash
docker build -t gcr.io/YOUR_PROJECT_ID/my-node-server .
docker push gcr.io/YOUR_PROJECT_ID/my-node-server
gcloud run deploy my-node-server   --image gcr.io/YOUR_PROJECT_ID/my-node-server   --platform managed   --region us-central1   --allow-unauthenticated
```

### Vercel / Firebase Cloud Functions
- Adjust endpoint structure.
- Deploy using CLI tools.

---

## License
Include your license here (e.g., **MIT License**).

---

> © TrueStore Project Team | Blockchain Ledger & File Hashing Demo
