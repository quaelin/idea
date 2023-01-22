import React, { useEffect, useRef, useState } from 'react';

import './IdeaEntry.css';

async function saveIdea(text) {
  const response = await fetch('/api/idea', {
    method: 'POST',
    headers: { 'content-type': 'text/plain' },
    body: text,
  });
  return response.text();
}

function useFocus(): [any, () => void] {
  const htmlElRef = useRef(null);
  function setFocus() {
    htmlElRef.current && htmlElRef.current.focus();
  }
  return [ htmlElRef, setFocus ];
}

export function IdeaEntry({ initialText, onIdeaAdded }) {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [textAreaRef, setTextAreaFocus] = useFocus();

  useEffect(() => {
    if (initialText) {
      setTextAreaValue(initialText);
      setTextAreaFocus();
    }
  }, [initialText]);

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
      <div className="idea-entry-buttons">
        <button onClick={handleButtonClick}>Save</button>
      </div>
    </div>
  );
}
