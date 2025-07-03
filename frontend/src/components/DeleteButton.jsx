import React from 'react';

export function DeleteButton( {handleClick} ) {
  return (
    <button onClick={handleClick}
      style={{
        background: 'transparent',
        border: 'none',
        color: 'black',
        fontSize: '24px',
        cursor: 'pointer'
      }}
      aria-label="Delete"
    >
      ❌
    </button>
  );
}
