# TrueStore-Crowdsource_Xfactors
Web app: https://crowdsource-b266e.web.app
Blockchain backend: https://testingfront-kqrgndany-satviks-projects-2883dc5b.vercel.app/

We are currently facing a problem while integrating the blockchain-based backend running on one laptop with the UI frontend on another laptop. Both components function perfectly when run independently, but we are unable to establish a successful connection between them. We are working on resolving this issue and will update the documentation once a solution is found.


Private Blockchain Ledger & File Hashing Project
This project is a demonstration of a private blockchain-inspired ledger that tracks fake currency balances and logs user transactions along with file attachments. It consists of two main parts:

Backend (Node.js):
A Node.js server implements blockchain logic (blocks, transactions, mining) to manage user balances. It also computes SHA-256 file hashes for uploaded attachments and stores the data in Firestore and Firebase Storage.

Frontend (React):
A React app provides a user interface for capturing media (photos and videos), submitting a form (with attachments), and viewing submission history. It also includes accessibility features and a modern theme.

Table of Contents
Features

Project Overview

Setup Instructions

Prerequisites

Backend Setup

Frontend Setup

Running the Project

Core Logic

Unit Testing

Accessibility Considerations

Additional Features

Deployment

License

Features
Blockchain-Inspired Ledger:
Implements blocks and transactions to mimic a blockchain. Each transaction updates a fake currency balance for users with Bits email addresses.

File Hashing:
Computes SHA-256 hashes for all file attachments (photos, videos) during form submission.

Media Capture:
Supports capturing media via camera (including mobile back camera usage).

Secure Transactions:
Integrates Firebase Authentication to ensure that only authorized Bits email users can submit transactions.

User-Friendly UI:
Modern themed React interface with ghost text in input fields and responsive design.

Project Overview
The solution addresses the problem of tracking a fake currency balance for users (with Bits email IDs) by creating a centralized ledger that mimics key blockchain properties:

Immutable Ledger: Transactions are grouped into blocks that are chained together via cryptographic hashes.

File Integrity: Every uploaded attachment is hashed using SHA-256, ensuring file integrity and traceability.

Secure and Modular: The backend is secured with Firebase Cloud Functions (or Node.js server deployed to Google Cloud Run/Vercel) and the React app communicates over HTTPS.

Setup Instructions
Prerequisites
Node.js and npm: Ensure you have Node.js (v14 or higher) and npm installed.

Firebase Account: A Firebase project configured with Firestore, Storage, and Authentication.

Google Cloud SDK (if deploying to Cloud Run) or Vercel/Render account if deploying there.

Docker: (Optional) for containerization if deploying to Cloud Run.

Backend Setup
Clone the Repository:
Clone this repository and navigate to the project root.

Create the Backend Folder:
The Node.js server code is located in the /server folder.

Install Dependencies:
In the /server folder, run:

bash
Copy
npm install
Configure Firebase Admin:

Create a service account JSON file from your Firebase Console.

In /server/admin.js, update the configuration to use your service account and set your Storage bucket.

Build the Docker Image (Optional):
If deploying via Google Cloud Run, create a Dockerfile in /server (see Dockerfile instructions in the docs).

Frontend Setup
Navigate to the Frontend Folder:
The React app is in the /src folder (with the root project also containing the typical Create React App structure).

Install Dependencies:
From the project root, run:

bash
Copy
npm install
Configure Firebase Client:
Update /src/firebase-config.js with your Firebase project settings.

File Hash Utility:
Verify that /src/utils/fileHash.js exists and contains the SHA-256 computation logic using Web Crypto.

Running the Project
Locally (Development)
Backend:
In the /server folder, run:

bash
Copy
node server.js
or use Docker (if set up) with:

bash
Copy
docker run -p 3001:3001 my-node-server
Frontend:
From the project root, run:

bash
Copy
npm start
The React app should launch on http://localhost:3000.

Production Build
Frontend:
Run:

bash
Copy
npm run build
and deploy the build to your hosting platform.

Backend Deployment:
Deploy your Node.js server via your chosen platform (Google Cloud Run, Vercel, Render, or Firebase Cloud Functions). Refer to the deployment instructions in the docs.

Core Logic
Blockchain Ledger:
The backend implements a simple blockchain using a Block class and a Blockchain class. Each block contains an index, timestamp, transactions, previous hash, and its own computed hash (using SHA-256). Transactions update a user's balance (starting from a fixed default) and are grouped into blocks.

File Hashing:
On form submission, the app computes a SHA-256 hash for each attachment. On the client side, this is done using the Web Crypto API (via computeSHA256 in /src/utils/fileHash.js), and the hash is included in the submission data.

Unit Testing
Backend Tests:
You can write tests using Jest or Mocha to verify blockchain functions (e.g., block creation, chain validation, transaction processing). For example, create tests for Block.calculateHash() and Blockchain.isChainValid().

Frontend Tests:
Use React Testing Library and Jest to test components like the UploadForm and media preview logic. For instance, tests can check if the placeholder appears and if file hash computation is triggered on file selection.

(Note: Unit testing isn’t fully implemented in this version, but you can add tests in a /tests folder for further assurance.)

Accessibility Considerations
Semantic HTML:
The project uses proper semantic HTML elements (e.g., <form>, <label>, <textarea>) to ensure screen readers and assistive technologies can interpret the content.

Placeholder Text & Alt Attributes:
Input fields have ghost text (via placeholder attributes) and images include alt text.

Responsive Design:
CSS is written to support various screen sizes (desktop and mobile). Color contrast and font sizes are chosen for readability.

Additional Features
Mobile Camera Optimization:
The enhanced camera components request the mobile back camera using the constraint { facingMode: { ideal: "environment" } }.

Themed UI:
A custom CSS theme provides a modern look (with consistent colors, spacing, and typography).

Secure Backend:
The backend uses Firebase Admin to securely handle file uploads and verifies Firebase ID tokens to ensure that only authorized users can submit transactions.

Deployment Options:
Detailed instructions are provided for deploying via Google Cloud Run, Vercel, or Firebase Cloud Functions.

Deployment
Google Cloud Run
Create a Dockerfile in /server (see instructions).

Build and Push the Image:

bash
Copy
docker build -t gcr.io/YOUR_PROJECT_ID/my-node-server .
docker push gcr.io/YOUR_PROJECT_ID/my-node-server
Deploy the Image:

bash
Copy
gcloud run deploy my-node-server \
  --image gcr.io/YOUR_PROJECT_ID/my-node-server \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
Vercel / Firebase Cloud Functions
Restructure your endpoints as needed and deploy using the respective CLI tools.

License
Include your license information here (e.g., MIT License).
