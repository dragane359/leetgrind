const API_BASE = 'http://localhost:3000';

export const fetchAllFlashcards = async () => {
  const res = await fetch(`${API_BASE}/flashcards`);
  if (!res.ok) throw new Error('Failed to fetch flashcards');
  return res.json();
};

export const fetchFilteredFlashcards = async (filters) => {
  console.log(filters)
  const res = await fetch(`${API_BASE}/filtered_flashcards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters)
  });
  if (!res.ok) throw new Error('Failed to fetch filtered flashcards');
  return res.json();
};

export const addNewFlashCard = async (new_card_info) => {

  const res = await fetch(`${API_BASE}/add_flashcard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(new_card_info)
  });
  if (!res.ok) throw new Error('Failed to add new flashcard');
  return res.json();
}

export const deleteFlashcard = async (card_id) => {
    const res = await fetch(`${API_BASE}/flashcards/${card_id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete flashcard');
    return res.json();
}
