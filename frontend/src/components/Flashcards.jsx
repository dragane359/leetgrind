import React, { useState, useEffect } from 'react'
import { Flashcard } from './flashcard'


const Flashcards = () => {
    const [cards, setCards] = useState([])
    const sample_cards = [{question:'q1', answer:'a1', category:'c'}, {question:'q2', answer:'a2', category:'c'}, {question:'q3', answer:'a3', category:'c'}]
    useEffect(() => {
        setCards(sample_cards);
      }, []); // Empty dependency array means it runs only once
  return (
    <div>
      {
        cards.map((card, index) => (
            <Flashcard key = {index} question = {card.question} answer = {card.answer} category={card.category} />
        ))
      }
    </div>
  )
}

export default Flashcards
