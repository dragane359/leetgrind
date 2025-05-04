// src/components/flashcard.jsx
import { useState } from 'react';
import './flashcard.css'; // for styles

export function Flashcard({ question, answer, category }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
        <div className="front">
        <div className='category-label'> {category}
        </div>
          <p>{question}</p>
        </div>
        <div className="back">
            <div className='category-label'> {category}
            </div>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}
