import React, { useRef, useState } from 'react';

async function saveIdea(text) {
  const response = await fetch('/api/idea', {
    method: 'POST',
    headers: { 'content-type': 'text/plain' },
    body: text,
  });
  return response.text();
}

function useFocus() {
  const htmlElRef = useRef(null);
  function setFocus() {
    htmlElRef.current && htmlElRef.current.focus();
  }
  return [ htmlElRef, setFocus ];
}

export function IdeaEntry({ onIdeaAdded }) {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [textAreaRef, setTextAreaFocus] = useFocus();

  const handleTextChange = ({ target: { value }}) => setTextAreaValue(value);
  const handleButtonClick = async () => {
    const icid = await saveIdea(textAreaValue);
    setTextAreaValue('');
    setTextAreaFocus();
    onIdeaAdded(icid);
  };

  return (
    <div className="idea-entry">
      <textarea ref={textAreaRef} value={textAreaValue} onChange={handleTextChange} />
      <button onClick={handleButtonClick}>Save</button>
    </div>
  );
}
