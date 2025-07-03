// src/components/flashcard.jsx
import { useState } from 'react';
import { DeleteButton } from './DeleteButton';
import './flashcard.css'; // for styles

export function Flashcard({ question, answer, category, level}) {
  const [flipped, setFlipped] = useState(false);
  const onDeleteCard = () => {
    console.log('deleting')
  }

  return (
    <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
        <div className="front">
        <div className='category-label'> {category}
        </div>
          <p>{level}</p>
          <p>{question}</p>
          <div>
            <DeleteButton handleClick = {onDeleteCard} />
          </div>
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
