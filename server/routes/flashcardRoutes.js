// routes/flashcardRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllFlashcards,
  getFilteredFlashcards
} = require('../controllers/flashcardController');

router.get('/', getAllFlashcards);
router.post('/filtered_flashcards', getFilteredFlashcards);

module.exports = router;
