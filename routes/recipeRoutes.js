const express = require('express');
const Recipe = require('../models/recipe'); // Import the Recipe model
const router = express.Router();

// Display all recipes on the homepage
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Get all recipes
    res.render('home', { recipes });     // Pass recipes to the home.ejs view
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving recipes');
  }
});

// create recipe page (for new recipe)
router.get('/create', (req, res) => {
  res.render('create-recipe', { recipe: null });
});

// edit recipe page (for an existing recipe)
router.get('/edit/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id); // Find recipe by ID
    res.render('create-recipe', { recipe: recipe }); // Pass recipe data to the view
  } catch (err) {
    console.log(err);
    res.redirect('/'); // Handle the error (e.g., redirect to homepage)
  }
});

// create new recipe
router.post('/create', async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const newRecipe = new Recipe({ title, ingredients, instructions });
    await newRecipe.save();
    res.redirect('/');  // After saving, redirect to homepage
  } catch (err) {
    console.log(err);
    res.redirect('/create');
  }
});

// edit recipe
router.post('/edit/:id', async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    await Recipe.findByIdAndUpdate(req.params.id, { title, ingredients, instructions });
    res.redirect('/'); // After updating, redirect to homepage
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// delete recipe
router.post('/delete/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/'); // After deleting, redirect to homepage
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;
