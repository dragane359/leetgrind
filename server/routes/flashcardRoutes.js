// routes/flashcardRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllFlashcards,
  getFilteredFlashcards,
  baseRoute
} = require('../controllers/flashcardController');

router.get('/', baseRoute);
router.get('/flashcards', getAllFlashcards);
router.post('/filtered_flashcards', getFilteredFlashcards);

module.exports = router;
