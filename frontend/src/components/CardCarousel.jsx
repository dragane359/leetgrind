import React, { useState, useEffect } from "react";
import { fetchAllFlashcards, fetchFilteredFlashcards } from "../services/flashcardService";
import { Flashcard } from './flashcard'
import "./CardCarousel.css";

const CardCarousel = () => {

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

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredCards.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === filteredCards.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="carousel-container">
        <button className="nav left" onClick={prevSlide}>
            ◀
        </button>
        <div className="carousel">
            <div className="carousel-window">
                <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                    {filteredCards.map((card, index) => (
                        <div>
                            <Flashcard key = {index} className = 'carousel-slide' id = {card.id} question = {card.question} answer = {card.answer} category={card.category} level = {card.level} />
                            <p>
                                {index + 1} / {filteredCards.length}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <button className="nav right" onClick={nextSlide}>
            ▶
        </button>
    </div>
  );
};

export default CardCarousel;
