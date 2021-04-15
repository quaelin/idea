import { filter, includes, uniq } from 'lodash';
import React, { useEffect, useState } from 'react';
import { IdeaEntry } from './IdeaEntry';
import { IdeaWellItem } from './IdeaWellItem';

import './IdeaWell.css';

export function IdeaWell({ namespace, sharedTrashKey }) {
  const key = `iw:${namespace || 'default'}:items`;
  const trashKey = sharedTrashKey || `${key}:trash`;

  const [initialEntryText, setInitialEntryText] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [selected, setSelected] = useState([]);
  const [trash, setTrash] = useState([]);

  useEffect(() => {
    const lsIdeas = localStorage.getItem(key);
    const savedIdeas = lsIdeas ? lsIdeas.split(',') : [];
    setIdeas(uniq([...ideas, ...savedIdeas]));
    const ssTrash = sessionStorage.getItem(trashKey);
    const sessionTrash = ssTrash ? ssTrash.split(',') : [];
    setTrash(sessionTrash);
  }, []);

  function saveIdeas(newIdeas) {
    if (newIdeas.length) {
      localStorage.setItem(key, newIdeas.join(','));
    } else {
      localStorage.removeItem(key);
    }
    setIdeas(newIdeas);
  }

  function saveTrash(newTrash) {
    if (newTrash.length) {
      sessionStorage.setItem(trashKey, newTrash.join(','));
    } else {
      sessionStorage.removeItem(trashKey);
    }
    setTrash(newTrash);
  }

  function onIdeaAdded(icid) {
    saveIdeas(uniq([icid, ...ideas]));
  }

  function handleItemClick(icid) {
    setSelected([icid]);
  }

  function populateEditor(icid) {
    fetch(`/api/idea/${icid}`)
      .then(response => response.text())
      .then(setInitialEntryText)
      .then(() => trashIdea(icid));
  }

  function trashIdea(icid) {
    saveIdeas(filter(ideas, idea => idea !== icid));
    saveTrash(uniq([icid, ...trash]));
  }

  function moveToTop(icid) {
    saveIdeas(uniq([icid, ...ideas]));
  }

  return (
    <div className="idea-well">
      <div className="idea-well-key">{key}</div>
      <IdeaEntry initialText={initialEntryText} onIdeaAdded={onIdeaAdded}/>
      <ol>
        {ideas.map((icid) => (
          <IdeaWellItem
            icid={icid}
            key={icid}
            namespace={namespace}
            onClick={() => handleItemClick(icid)}
            onClickEdit={() => populateEditor(icid)}
            onClickTrash={() => trashIdea(icid)}
            onClickTop={() => moveToTop(icid)}
            selected={includes(selected, icid)}
          />
        ))}
      </ol>
    </div>
  );
}
