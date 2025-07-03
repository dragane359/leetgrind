// backend/seed.js
// import { createConnection } from 'mysql2/promise'
require('dotenv').config(); 
const { v4: uuidv4 } = require('uuid');

const mysql = require('mysql2/promise');


const seedDatabase = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: process.env.REACT_APP_DB_USERNAME,
    password: process.env.REACT_APP_DB_PASSWORD,
  });

  try {
    // Create DB & table
    await connection.query(`CREATE DATABASE IF NOT EXISTS flashcards_db`);
    await connection.query(`USE flashcards_db`);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS flashcards (
        id CHAR(36) PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category VARCHAR(100),
        level VARCHAR(50)
      )
    `);
    
    uuids = [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()]
    // Insert sample data
    await connection.query(`
      INSERT INTO flashcards (id, question, answer, category, level)
      VALUES
        ('${uuids[0]}', 'What is 2 + 2?', '4', 'Math', 'Easy'),
        ('${uuids[1]}', 'What is the capital of France?', 'Paris', 'Geography', 'Easy'),
        ('${uuids[2]}', 'What is React?', 'A JavaScript library for building UI', 'Web', 'Medium'),
        ('${uuids[3]}', 'What is 5 x 6?', '30', 'Math', 'Easy'),
        ('${uuids[4]}', 'What is the capital of Japan?', 'Tokyo', 'Geography', 'Medium')
    `);


    console.log('✅ Database seeded successfully');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
  } finally {
    connection.end();
  }
};

seedDatabase();
