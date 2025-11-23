// models/recipe.js

// Import mongoose
const mongoose = require('mongoose');

// Define the Recipe schema
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  instructions: String,
  createdAt: { type: Date, default: Date.now },
});

// Create the Recipe model
const Recipe = mongoose.model('Recipe', recipeSchema);

// Export the Recipe model
module.exports = Recipe;
