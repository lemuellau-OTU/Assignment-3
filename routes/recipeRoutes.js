// routes/recipeRoutes.js
// Routes for creating, editing, deleting, and displaying recipes

// Imports
const express = require('express');
const Recipe = require('../models/recipe'); 
const router = express.Router();

// Home route (render the homepage)
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Fetch all recipes from the database
    res.render('home', { recipes }); 
  } catch (err) {
    res.status(500).send('Error retrieving recipes');
  }
});

// Display all recipes on the 'all-recipes' page
router.get('/all-recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Fetch all recipes from the database
    res.render('all-recipes', { recipes }); 
  } catch (err) {
    res.status(500).send('Error retrieving recipes');
  }
});

// create recipe page (for new recipe)
router.get('/create', (req, res) => {
  res.render('create-recipe', { recipe: null });
});
router.post('/create', async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    // Create a new recipe
    const newRecipe = new Recipe({ title, ingredients, instructions });
    await newRecipe.save(); // Save to database
    res.redirect('/all-recipes');  // Redirect to the All Recipes page after saving
  } catch (err) {
    res.redirect('/create');  // In case of error, redirect to the create page
  }
});

// edit recipe page (for an existing recipe)
router.get('/edit/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id); // Find recipe by ID
    res.render('create-recipe', { recipe: recipe }); 
  } catch (err) {
    res.redirect('/'); // Redirect to homepage on error
  }
});

// edit recipe
router.post('/edit/:id', async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    // Update the recipe
    await Recipe.findByIdAndUpdate(req.params.id, { title, ingredients, instructions });
    res.redirect('/all-recipes'); // After updating, redirect to All Recipes page
  } catch (err) {
    res.redirect('/all-recipes');
  }
});

// delete recipe
router.post('/delete/:id', async (req, res) => {
  try {
    // Delete the recipe
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/all-recipes'); // After updating, redirect to All Recipes page
  } catch (err) {
    res.redirect('/all-recipes');
  }
});

module.exports = router;
