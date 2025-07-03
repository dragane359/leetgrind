import React, { useState, useEffect } from 'react'
import { fetchAllFlashcards, fetchFilteredFlashcards } from '../services/flashcardService';
import { Flashcard } from './flashcard'


const Flashcards = () => {
    const [cards, setCards] = useState([])
    const [filteredCards, setFilteredCards] = useState([])
    const [filters, setFilters] = useState({ "filters" : { "category": ["ALL"], "level": ["ALL"] } });

    useEffect(() => {
      fetchAllFlashcards()
        .then(data => setCards(data))
        .catch(err => console.error(err)); 
    }, []);
  
    // 2b. Load filtered flashcards when filters change
    useEffect(() => {
      fetchFilteredFlashcards(filters)
        .then(data => setFilteredCards(data))
        .catch(err => console.error(err));
    }, [filters]);

    const categories = ['ALL', ... new Set(cards.map(card => card.category))]
    const levels = ['ALL', ... new Set(cards.map(card => card.level))]   

    const handleCheckBoxChange_filter = (category, filter_name) => {
      const updatedFilters = { ...filters };
      if (updatedFilters['filters'][filter_name].includes(category)) {
        updatedFilters['filters'][filter_name] = updatedFilters['filters'][filter_name].filter(c => c !== category)
        setFilters(updatedFilters)
      } else {
        updatedFilters['filters'][filter_name] = [...updatedFilters['filters'][filter_name], category]
        setFilters(updatedFilters)
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
          <input type = 'checkbox' value={cat} checked = {filters['filters']['category'].includes(cat)} onChange={() => handleCheckBoxChange_filter(cat, 'category')}/>
          {cat}
          </label>
          ))}
      <label>
        Filter by level 
      </label>
          {levels.map(cat => (
          <label key = {cat} style={{ display: 'block' }}>
          <input type = 'checkbox' value={cat} checked = {filters['filters']['level'].includes(cat)} onChange={() => handleCheckBoxChange_filter(cat, 'level')}/>
          {cat}
          </label>
          ))} 
      <div>
      {
        filteredCards.map((card, index) => (
            <Flashcard key = {index} id = {card.id} question = {card.question} answer = {card.answer} category={card.category} level = {card.level} />
        ))
      }
      </div>
    </div>
  )
}

export default Flashcards
