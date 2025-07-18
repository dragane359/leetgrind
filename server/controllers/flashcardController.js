// controllers/flashcardController.js
require('dotenv').config();  // top of your file
const db = require('../db');
const mysql = require('mysql2/promise');
const { fetchAllFlashcards } = require('../models/flashcardModel');
const { v4: uuidv4 } = require('uuid');


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

    const connection = await mysql.createConnection({
      host: 'localhost',
      user: process.env.REACT_APP_DB_USERNAME,
      password: process.env.REACT_APP_DB_PASSWORD,
    });

    const new_flashcard = req.body.new_flashcard 

    await connection.query(`USE flashcards_db`);
    connection.query(`
      INSERT INTO flashcards (id, question, answer, category, level)
      VALUES
        ("${uuidv4()}", "${new_flashcard.question}", "${new_flashcard.answer}", "${new_flashcard.category}", "${new_flashcard.level}")
    `); 
    res.status(200)
  } 

  const deleteFlashcard = async (req, res) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: process.env.REACT_APP_DB_USERNAME,
        password: process.env.REACT_APP_DB_PASSWORD,
      });
      console.log(req.params.id)

      const id_to_delete  = req.params.id

      await connection.query(`USE flashcards_db`);
      console.log(id_to_delete)
 
      connection.query(`
        DELETE FROM flashcards WHERE id = '${id_to_delete}'
      `);  
      res.status(200)

  }
    
  module.exports = {
    baseRoute,
    getAllFlashcards, 
    getFilteredFlashcards, 
    addNewFlashcard,
    deleteFlashcard
  };
   