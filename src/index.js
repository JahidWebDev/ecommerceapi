require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dbConnection = require('../database/dbConnection'); // Adjust path if needed
const router = require('../route');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
dbConnection();

// Parse incoming JSON
app.use(express.json());
app.use(cors())
// Session store setup
const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: 'mySessions'
});

app.use(session({
  secret: 'MERN2402',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // should be true only if using HTTPS
  store: store,
}));

// Serve static files (uploads) correctly
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Load routes
app.use(router);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
