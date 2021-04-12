import React, { useEffect, useState } from 'react';
import { IdeaEntry } from './IdeaEntry';
import { IdeaWellItem } from './IdeaWellItem';

export function IdeaWell({ namespace }) {
  const key = `iw:${namespace}:items`;

  const [ideas, setIdeas] = useState([]);

  console.log({ ideas });

  useEffect(() => {
    const lsIdeas = localStorage.getItem(key);
    const savedIdeas = lsIdeas ? lsIdeas.split(',') : [];
    setIdeas([...ideas, ...savedIdeas]);
  }, []);

  function onIdeaAdded(icid) {
    const newIdeas = [icid, ...ideas];
    localStorage.setItem(key, newIdeas.join(','));
    setIdeas(newIdeas);
  }

  return (
    <div className="idea-well">
      <IdeaEntry onIdeaAdded={onIdeaAdded}/>
      <>
        {ideas.map((icid) => (
          <IdeaWellItem namespace={namespace} key={icid} icid={icid} />
        ))}
      </>
    </div>
  );
}
