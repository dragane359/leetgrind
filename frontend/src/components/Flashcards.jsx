import React, { useState, useEffect } from 'react'
import { fetchAllFlashcards, fetchFilteredFlashcards } from '../services/flashcardService';
import { Flashcard } from './flashcard'


const Flashcards = () => {
    const [cards, setCards] = useState([])
    const [filters, setFilters] = useState({ 'category': ['Math'], 'level': ['Medium'] });

    useEffect(() => {
      fetchAllFlashcards()
        .then(data => setCards(data))
        .catch(err => console.error(err));
    }, []);
  
    // 2b. Load filtered flashcards when filters change
    useEffect(() => {
      fetchFilteredFlashcards(filters)
        .then(data => setCards(data))
        .catch(err => console.error(err));
    }, [filters]);

    const categories = ['ALL', ... new Set(cards.map(card => card.category))]
    const levels = ['ALL', ... new Set(cards.map(card => card.level))]

    const handleCheckBoxChange_filter = (category, filter_name) => {
      if (filters[filter_name].includes(category)) {
        filters[filter_name].filter(c => c !== category)
        setFilters(filters)
      } else {
        filters[filter_name] = [...filters[filter_name], category]
        setFilters(filters)
      }
    }

    
  return (
    <div>
      <h2> Flashcards</h2>
      <label>
        Filter by Category
      </label>
          {categories.map(cat => (
          <label key = {cat} style={{ display: 'block' }}>
          <input type = 'checkbox' value={cat} checked = {filters['category'].includes(cat)} onChange={() => handleCheckBoxChange_filter(cat, 'category')}/>
          {cat}
          </label>
          ))}
      <label>
        Filter by level
      </label>
          {levels.map(cat => (
          <label key = {cat} style={{ display: 'block' }}>
          <input type = 'checkbox' value={cat} checked = {filters['level'].includes(cat)} onChange={() => handleCheckBoxChange_filter(cat, 'level')}/>
          {cat}
          </label>
          ))}
      <div>
      {
        cards.map((card, index) => (
            <Flashcard key = {index} question = {card.question} answer = {card.answer} category={card.category} level = {card.level} />
        ))
      }
      </div>
    </div>
  )
}

export default Flashcards
