const db = require('../db');

const fetchAllFlashcards = async () => {
  const [rows] = await db.query('SELECT * FROM flashcards');
  return rows;
  console.log(rows)
};

module.exports = { fetchAllFlashcards };
