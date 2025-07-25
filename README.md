# Stayfinder - Node.js MVC Application

A server-rendered Node.js application for listing and booking accommodations, built using the MVC (Model-View-Controller) pattern with Express, MongoDB, and EJS.

## Project Structure

```
MVCproject/
├── app.js                # Main Express application file
├── models/               # Mongoose models (MongoDB schemas)
│   └── user.js
├── routes/               # Express route handlers
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── utils/                # Utility functions and custom errors
│   └── ExpressError.js
├── views/                # EJS templates for server-side rendering
│   ├── layouts/
│   └── listings/
├── public/               # Static assets (CSS, images, JS)
├── package.json          # Project metadata and dependencies
└── .env                  # Environment variables (not committed)
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/EdlaKoushik/stayfinder-mvc.git
   cd MVCproject
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   ```
4. Start the server:
   ```bash
   node app.js
   ```

## Features
- User authentication (register, login, logout)
- Property listings with add, edit, delete
- Review system for listings
- Search and filter functionality
- Flash messages for user feedback
- Responsive EJS templates
- Session management with MongoDB

## Folder Details

- **models/**: Contains Mongoose schemas for MongoDB collections.
- **routes/**: Defines all Express routes for listings, reviews, and users.
- **views/**: EJS templates for rendering HTML pages.
- **public/**: Static files like CSS and images.
- **utils/**: Custom error classes and helper functions.

## License

This project is for educational
