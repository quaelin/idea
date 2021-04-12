import React, { useEffect, useState } from 'react';

export function IdeaWellItem({ icid }) {
  const [idea, setIdea] = useState();

  useEffect(() => {
    fetch(`/api/idea/${icid}`)
      .then(response => response.text())
      .then(setIdea);
  }, []);

  return (
    <div className="idea-well-item" data-icid={icid}>{idea}</div>
  );
}
