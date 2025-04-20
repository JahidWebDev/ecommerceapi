require('dotenv').config();
const express = require('express');
const dbConnection = require('../database/dbConnection'); // Adjust path as needed
const router = require('../route'); // Corrected

const app = express();
const PORT = process.env.PORT || 5000;

dbConnection();  // DB connect

app.use(router);  // Use router for API routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
