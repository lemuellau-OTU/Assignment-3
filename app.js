// app.js

// Imports
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoutes');

// load environment variables from .env file
dotenv.config();

const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (CSS, images, etc.)

// MongoDB Connection
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Use the recipe routes
app.use('/', recipeRoutes);  // Use all routes from recipeRoutes.js

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
