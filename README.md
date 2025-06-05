# Wanderlust - MERN Stack Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for listing and booking accommodations.

## Project Structure

```
wanderlust/
├── frontend/                   # React frontend
│   ├── public/
│   └── src/
│       ├── components/        # Reusable components
│       ├── pages/            # Page components
│       ├── styles/           # CSS files
│       ├── context/          # React context
│       ├── utils/            # Utility functions
│       └── api/              # API integration
│
└── backend/                   # Node.js backend
    ├── controllers/          # Route controllers
    ├── models/              # MongoDB models
    ├── routes/              # API routes
    ├── middleware/          # Custom middleware
    └── utils/               # Utility functions
```

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=8000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file with:
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Features
- User authentication
- Property listings with filters
- Search functionality
- Tax display toggle
- Responsive design
- Category-based filtering 