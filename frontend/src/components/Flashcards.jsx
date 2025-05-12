import React, { useState, useEffect } from 'react'
import { Flashcard } from './flashcard'


const Flashcards = () => {
    const [cards, setCards] = useState([])
    const [chosen_categories, setChosenCategories] = useState([])
    const sample_cards = [{question:'q1', answer:'a1', category:'c1'}, {question:'q2', answer:'a2', category:'c1'}, {question:'q3', answer:'a3', category:'c2'}, {question:'q3', answer:'a3', category:'c5'}]
    useEffect(() => {
        setCards(sample_cards);
      }, []); // Empty dependency array means it runs only once
    const categories = ['ALL', ... new Set(cards.map(card => card.category))]
    const FilteredCards = chosen_categories.includes('ALL') ? cards : cards.filter(card => chosen_categories.includes(card.category))
    const handleCheckBoxChange_Category = (category) => {
      setChosenCategories(chosen_categories.includes(category) ? chosen_categories.filter(c => c !== category) : [...chosen_categories, category])

    }
  return (
    <div>
      <h2> Flashcards</h2>
      <label>
        Filter by Category
      </label>
          {categories.map(cat => (
          <label key = {cat} style={{ display: 'block' }}>
          <input type = 'checkbox' value={cat} checked = {chosen_categories.includes(cat)} onChange={() => handleCheckBoxChange_Category(cat)}/>
          {cat}
          </label>
          ))}
      <div>
      {
        FilteredCards.map((card, index) => (
            <Flashcard key = {index} question = {card.question} answer = {card.answer} category={card.category} />
        ))
      }
      </div>
    </div>
  )
}

export default Flashcards
