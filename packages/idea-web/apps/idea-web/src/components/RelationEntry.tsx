import React from 'react';

import './RelationEntry.css';

async function saveRelation(relation) {
  const response = await fetch('/api/relation', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(relation),
  });
  return response.text();
}

export function RelationEntry({ relation, onRelationAdded }) {
  async function handleButtonClick() {
    const rCid = await saveRelation(relation);
    onRelationAdded(rCid);
  }

  return (
    <div className="relation-entry">
      <pre>{JSON.stringify(relation, null, 3)}</pre>
      <div className="relation-entry-buttons">
        <button onClick={handleButtonClick}>Save</button>
      </div>
    </div>
  );
}
