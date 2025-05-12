const API_BASE = 'http://localhost:3000';

export const fetchAllFlashcards = async () => {
  const res = await fetch(`${API_BASE}/flashcards`);
  if (!res.ok) throw new Error('Failed to fetch flashcards');
  return res.json();
};

export const fetchFilteredFlashcards = async (filters) => {
  const res = await fetch(`${API_BASE}/filtered_flashcards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filters })
  });
  if (!res.ok) throw new Error('Failed to fetch filtered flashcards');
  return res.json();
};
