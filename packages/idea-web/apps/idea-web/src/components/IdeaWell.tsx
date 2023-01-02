import filter from 'lodash/filter';
import includes from 'lodash/includes';
import uniq from 'lodash/uniq';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Xarrow from "react-xarrows";
import { IdeaEntry } from './IdeaEntry';
import { IdeaWellItem } from './IdeaWellItem';
import { RelationEntry } from './RelationEntry';
import { relationArity } from '../relationArity';

import './IdeaWell.css';

const relationTypesOrder = ['Negation', 'And', 'Identity', 'Implies', 'Improves', 'IsA', 'Or', 'XOr', 'Analogy'];

function clearHTMLSelection() {
  if (window.getSelection) window.getSelection().removeAllRanges();
}

// helper function to reorder the list after a drag operation
function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

type Props = {
  namespace?: string;
  sharedTrashKey?: string;
}

export function IdeaWell({ namespace, sharedTrashKey }: Props) {
  const name = namespace || 'default';
  const key = `iw:${name}:items`;
  const trashKey = sharedTrashKey || `${key}:trash`;

  const [initialEntryText, setInitialEntryText] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [selected, setSelected] = useState([]);
  const [trash, setTrash] = useState([]);
  const [editRelation, setEditRelation] = useState(null);

  const refs = {
    A: useRef(null),
    B: useRef(null),
    C: useRef(null),
    D: useRef(null),
    Analogy: useRef(null),
    And: useRef(null),
    Identity: useRef(null),
    Implies: useRef(null),
    Improves: useRef(null),
    IsA: useRef(null),
    Negation: useRef(null),
    Or: useRef(null),
    XOr: useRef(null),
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) { // Esc
      setSelected([]);
      setEditRelation(null);
    }
  }, []);

  useEffect(() => {
    const lsIdeas = localStorage.getItem(key);
    const savedIdeas = lsIdeas ? lsIdeas.split(',') : [];
    setIdeas(uniq([...ideas, ...savedIdeas]));

    const ssTrash = sessionStorage.getItem(trashKey);
    const sessionTrash = ssTrash ? ssTrash.split(',') : [];
    setTrash(sessionTrash);

    document.addEventListener('keydown', escFunction);

    return () => {
      document.removeEventListener('keydown', escFunction);
    };
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

  function onRelationAdded(rcid) {
    moveToTop(rcid);
    setEditRelation(null);
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

  const onClick = {
    Analogy: () => {
      if (ideas.length < 4) return;
      const [A, B, C, D] = ideas;
      setEditRelation({ R: 'Analogy', A, B, C, D });
    },

    And: () => {
      if (ideas.length < 2) return;
      const [A, B] = ideas;
      setEditRelation({ R: 'And', A, B });
    },

    Identity: () => {
      if (ideas.length < 2) return;
      const [A, B] = ideas;
      setEditRelation({ R: 'Identity', A, B });
    },

    Implies: () => {
      if (ideas.length < 2) return;
      const [A, B] = ideas;
      setEditRelation({ R: 'Implies', A, B });
    },

    Improves: () => {
      if (ideas.length < 2) return;
      const [A, B] = ideas;
      setEditRelation({ R: 'Improves', A, B });
    },

    IsA: () => {
      if (ideas.length < 2) return;
      const [A, B] = ideas;
      setEditRelation({ R: 'IsA', A, B });
    },

    Negation: () => {
      if (!ideas.length) return;
      const [A] = ideas;
      setEditRelation({ R: 'Negation', A });
    },

    Or: () => {
      if (ideas.length < 2) return;
      const [A, B] = ideas;
      setEditRelation({ R: 'Or', A, B });
    },

    XOr: () => {
      if (ideas.length < 2) return;
      const [A, B] = ideas;
      setEditRelation({ R: 'XOr', A, B });
    },
  };

  const operands = editRelation && ['A', 'B', 'C', 'D'].slice(0, relationArity[editRelation.R])
  const rightBuffer = editRelation ? 'idea-well-relation-buffer' : '';

  return (
    <section className="idea-well">
      <header className="idea-well-head">
        <nav className="idea-well-key">{name}</nav>
        {editRelation ? (
          <RelationEntry relation={editRelation} onRelationAdded={onRelationAdded} />
        ) : (
          <IdeaEntry initialText={initialEntryText} onIdeaAdded={onIdeaAdded} />
        )}
      </header>
      <div className="idea-well-body">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="idea-well-droppable">
            {(provided, snapshot) => (
              <ol className={`idea-well-droppable ${rightBuffer}`} {...provided.droppableProps} ref={provided.innerRef}>
                {ideas.map((icid, index) => {
                  const relationLabelProps = {} as { relationLabel: string; relationLabelRef: any; };
                  if (editRelation && index < relationArity[editRelation.R]) {
                    relationLabelProps.relationLabel = ['A', 'B', 'C', 'D'][index];
                    relationLabelProps.relationLabelRef = [refs.A, refs.B, refs.C, refs.D][index];
                  }
                  return (
                    <IdeaWellItem
                      icid={icid}
                      index={index}
                      key={icid}
                      namespace={namespace}
                      onClickEdit={() => populateEditor(icid)}
                      onClickTrash={() => trashIdea(icid)}
                      onSelected={(selectedCid) => handleItemSelected(selectedCid || icid)}
                      selected={includes(selected, icid)}
                      {...relationLabelProps}
                    />
                  );
                })}
                {provided.placeholder}
              </ol>
            )}
          </Droppable>
        </DragDropContext>
        <aside className="relation-selector">
          <ul>
            {relationTypesOrder.map((type) => (
              <li
                key={type}
                ref={refs[type]}
                className={editRelation?.R === type ? 'selected' : ''}>
                <a href="#" onClick={onClick[type]}>{type}</a>
              </li>
            ))}
          </ul>
        </aside>
        {editRelation ? (operands.map((operand) => (
          <Xarrow
            start={refs[editRelation.R]}
            end={refs[operand]}
            curveness={0.5}
            strokeWidth={3}
            headSize={4}
            path="straight"
          />
        ))) : ''}
      </div>
    </section>
  );
}
