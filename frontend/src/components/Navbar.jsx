// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";


export function Navbar() {
  return (
    <nav className="nav">
      <ul className="links">
        <li><Link to="/" className="link">Home</Link></li>
        <li><Link to="/flashcards" className="link">Flashcards</Link></li>
        <li><Link to="/add-card" className="link">Add Flashcard</Link></li>
        <li><Link to="/about" className="link">About</Link></li>
      </ul> 
    </nav>
  );
}

 