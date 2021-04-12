import React, { useState } from 'react';

async function saveIdea(text) {
  const response = await fetch('/api/idea', {
    method: 'POST',
    headers: { 'content-type': 'text/plain' },
    body: text,
  });
  return response.text();
}

export function IdeaEntry({ onIdeaAdded }) {
  const [textAreaValue, setTextAreaValue] = useState('');

  const handleTextChange = ({ target: { value }}) => setTextAreaValue(value);
  const handleButtonClick = async () => {
    const icid = await saveIdea(textAreaValue);
    onIdeaAdded(icid);
  };

  return (
    <>
      <textarea value={textAreaValue} onChange={handleTextChange} />
      <button onClick={handleButtonClick}>Save</button>
    </>
  );
}
