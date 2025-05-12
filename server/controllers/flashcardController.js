// controllers/flashcardController.js

const db = require('../db');
const { fetchAllFlashcards } = require('../models/flashcardModel');
  
  const getAllFlashcards = async (req, res) => {
    const flashcards = await fetchAllFlashcards();
    res.json(flashcards)
  };

  const getFilteredFlashcards = async (req, res) => {
    const filters_dict = req.body.filters
    // filters will be a dict with key being name of filter and values being a list of the values to be filtered in
    let flashcards = await getAllFlashcards();
    for (let key in filters_dict) {
        filter_values = filters_dict[key]
        flashcards = flashcards.filter(card => filter_values.includes(card[key]))
    }
    res.json(flashcards)
  }
  
  module.exports = {
    getAllFlashcards,
    getFilteredFlashcards
  };
   