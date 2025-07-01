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

  const addNewFlashcard = async (req, res) => {
    console.log('here')
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });

    const new_flashcard = req.body.new_flashcard

    console.log('here', new_flashcard)

    connection.query(`
      INSERT INTO flashcards (question, answer, category, level)
      VALUES
        (${new_flashcard.question}, ${new_flashcard.answer}, ${new_flashcard.category}, ${new_flashcard.level})
    `);
    res.status(200)
  } 
   
  module.exports = {
    baseRoute,
    getAllFlashcards,
    getFilteredFlashcards,
    addNewFlashcard
  };
   