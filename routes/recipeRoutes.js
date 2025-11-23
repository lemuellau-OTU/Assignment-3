const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();

// Home route
router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.render('home', { recipes });
});

// Create a new recipe
router.get('/create', (req, res) => {
  res.render('create-recipe');
});

router.post('/create', async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  const newRecipe = new Recipe({ title, ingredients, instructions });
  await newRecipe.save();
  res.redirect('/');
});

// Edit recipe
router.get('/edit/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render('create-recipe', { recipe });
});

router.post('/edit/:id', async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  await Recipe.findByIdAndUpdate(req.params.id, { title, ingredients, instructions });
  res.redirect('/');
});

// Delete recipe
router.post('/delete/:id', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
