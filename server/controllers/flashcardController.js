// controllers/flashcardController.js

const db = require('../db');
const { fetchAllFlashcards } = require('../models/flashcardModel');

const baseRoute = async (req, res) => {
    res.json('backend server running')
  };
  
  const getAllFlashcards = async (req, res) => {
    const flashcards = await fetchAllFlashcards();
    res.json(flashcards)
  };

  const getFilteredFlashcards = async (req, res) => {
    try {
      console.log('Request body:', req.body);
  
      const filters_dict = req.body.filters;

  
      if (!filters_dict || typeof filters_dict !== 'object') {
        return res.status(400).json({ error: 'Invalid or missing filters' });
      }
  
      var flashcards = await fetchAllFlashcards();

  
      for (const key in filters_dict) {
        const filter_values = filters_dict[key];
        if (filter_values.includes('ALL')) {
          continue
        }
        flashcards = flashcards.filter(card => filter_values.includes(card[key]));
      } 
  
      res.json(flashcards); 
    } catch (error) {
      console.error('Error in getFilteredFlashcards:', error); 
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }; 
   
  module.exports = {
    baseRoute,
    getAllFlashcards,
    getFilteredFlashcards
  };
   