require('dotenv').config();
const express = require('express');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const dbConnection = require('../database/dbConnection'); // Adjust path as needed
const router = require('../route'); // Corrected

const app = express();
const PORT = process.env.PORT || 5000;

dbConnection();  // DB connect
app.use(express.json()); 
const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: 'mySessions'
});
app.use(session({
  secret: 'MERN2402',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: store,
}))
app.use(router);  // Use router for API routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
