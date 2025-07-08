import React, { useState, useEffect, useRef } from "react";
import { fetchFilteredFlashcards } from "../services/flashcardService";
import { Flashcard } from './flashcard';
import "./CardCarousel.css";

const CardCarousel = () => {
  const [filters, setFilters] = useState(null);
  const [filteredCards, setFilteredCards] = useState([]);
  const [transition, setTransition] = useState("transform 0.5s ease");
  const [transform, setTransform] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

  const trackRef = useRef(null);

  // Set filters once on mount
  useEffect(() => {
    const filters_sample = { filters: { category: ["ALL"], level: ["ALL"] } };
    setFilters(filters_sample);
  }, []);

  // Fetch flashcards when filters are set
  useEffect(() => {
    if (!filters) return;
    fetchFilteredFlashcards(filters)
      .then((data) => {
        setFilteredCards(data);
        setCurrentIndex(1); // reset index after data is loaded
      })
      .catch((err) => console.error(err));
  }, [filters]);

  const extendedFilteredFlashcards =
    filteredCards.length > 0
      ? [filteredCards[filteredCards.length - 1], ...filteredCards, filteredCards[0]]
      : [];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransition("transform 0.5s ease");
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransition("transform 0.5s ease");
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (!isTransitioning || extendedFilteredFlashcards.length === 0) return;

    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      if (currentIndex === extendedFilteredFlashcards.length - 1) {
        // Clone of first → jump to real first
        setTransition("none");
        setCurrentIndex(1);
      } else if (currentIndex === 0) {
        // Clone of last → jump to real last
        setTransition("none");
        setCurrentIndex(extendedFilteredFlashcards.length - 2);
      }
    };

    const track = trackRef.current;
    track.addEventListener("transitionend", handleTransitionEnd);
    return () => track.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex, isTransitioning, extendedFilteredFlashcards.length]);

  // Update transform style on index/transition change
  useEffect(() => {
    setTransform(`translateX(-${currentIndex * 100}%)`);
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <button className="nav left" onClick={prevSlide}>
        ◀
      </button>
      <div className="carousel">
        <div className="carousel-window">
          <div
            className="carousel-track"
            ref={trackRef}
            style={{ transform, transition }}
          >
            {extendedFilteredFlashcards.map((card, index) => (
              <div key={index}>
                <Flashcard
                  className="carousel-slide"
                  id={card.id}
                  question={card.question}
                  answer={card.answer}
                  category={card.category}
                  level={card.level}
                />
                <p>
                  {(index % filteredCards.length) + 1} / {filteredCards.length}
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
