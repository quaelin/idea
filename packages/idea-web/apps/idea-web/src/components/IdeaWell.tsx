import { filter, includes, uniq } from 'lodash';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { IdeaEntry } from './IdeaEntry';
import { IdeaWellItem } from './IdeaWellItem';

import './IdeaWell.css';

function clearHTMLSelection() {
  if (window.getSelection) window.getSelection().removeAllRanges();
  else if (document.selection) document.selection.empty();
}

// helper function to reorder the list after a drag operation
function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

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

  function moveToTop(icid) {
    saveIdeas(uniq([icid, ...ideas]));
    clearHTMLSelection();
  }

  function onIdeaAdded(icid) {
    moveToTop(icid);
  }

  function handleItemSelected(icid) {
    setSelected([icid]);
    moveToTop(icid);
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

  function onDragEnd({ source, destination }) {
    // dropped outside the list
    if (!destination) return;

    saveIdeas(reorder(ideas, source.index, destination.index));
  }

  return (
    <div className="idea-well">
      <div className="idea-well-key">{key}</div>
      <IdeaEntry initialText={initialEntryText} onIdeaAdded={onIdeaAdded}/>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="idea-well-droppable">
          {(provided, snapshot) => (
            <ol className="idea-well-droppable" {...provided.droppableProps} ref={provided.innerRef}>
              {ideas.map((icid, index) => (
                <IdeaWellItem
                  icid={icid}
                  index={index}
                  key={icid}
                  namespace={namespace}
                  onClickEdit={() => populateEditor(icid)}
                  onClickTrash={() => trashIdea(icid)}
                  onSelected={() => handleItemSelected(icid)}
                  selected={includes(selected, icid)}
                />
              ))}
              {provided.placeholder}
            </ol>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
