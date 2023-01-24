import filter from 'lodash/filter';
import has from 'lodash/has';
import includes from 'lodash/includes';
import omit from 'lodash/omit';
import uniq from 'lodash/uniq';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Xarrow from 'react-xarrows';
import { IdeaEntry } from './IdeaEntry';
import { IdeaWellItem } from './IdeaWellItem';
import { RelationEntry } from './RelationEntry';
import { relationArity } from '../relationArity';

import type { ICID, PCID, Perspective, Relation } from '@quaelin/idea-api';

import './IdeaWell.css';

const relationTypesOrder = ['Negation', 'And', 'Identity', 'Implies', 'Improves', 'IsA', 'Or', 'XOr', 'Analogy'];

function clearHTMLSelection() {
  if (window.getSelection) window.getSelection().removeAllRanges();
}

// helper function to reorder the list after a drag operation
function reorder(list: ICID[], startIndex: number, endIndex: number): ICID[] {
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
  const [ideas, setIdeas] = useState<ICID[]>([]);
  const [selected, setSelected] = useState([]);
  const [trash, setTrash] = useState<ICID[]>([]);
  const [editRelation, setEditRelation] = useState<Relation | null>(null);
  const [currentPerspective, setCurrentPerspective] = useState<Perspective>({});

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
    const { hash, pathname: path } = document.location;
    const iCid: ICID = hash && hash.length > 1 && hash.substring(1);

    const lsIdeas = localStorage.getItem(key);
    const savedIdeas = lsIdeas ? lsIdeas.split(',') : [];
    setIdeas(uniq(filter([iCid, ...ideas, ...savedIdeas])));

    const ssTrash = sessionStorage.getItem(trashKey);
    const sessionTrash = ssTrash ? ssTrash.split(',') : [];
    setTrash(sessionTrash);

    const pCid: PCID = path && path.length > 1 && path.charAt(0) === '/' && path.substring(1);
    if (pCid) {
      fetch(`/api/perspective/${pCid}`, { cache: 'force-cache' }).then(async (response) => {
        const perspective: Perspective = await response.json()
        const iCidsFromPerspective: ICID[] = Object.keys(perspective);
        setCurrentPerspective(perspective);
        setIdeas(uniq(filter([iCid, ...iCidsFromPerspective, ...ideas])));
      });
    }

    document.addEventListener('keydown', escFunction);
    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, [document, escFunction, key]);

  useEffect(() => {
    if (ideas.length >= 1) {
      const { pathname } = window.location;
      window.history.replaceState(null, 'Oops', `${pathname}#${ideas[0]}`);
    }
  }, [ideas]);

  function saveIdeas(newIdeas: ICID[]) {
    const deDuped = uniq(filter(newIdeas));
    if (deDuped.length) {
      localStorage.setItem(key, deDuped.join(','));
    } else {
      localStorage.removeItem(key);
    }
    setIdeas(deDuped);
  }

  function saveTrash(newTrash: ICID[]) {
    const deDuped = filter(uniq(newTrash));
    if (deDuped.length) {
      sessionStorage.setItem(trashKey, deDuped.join(','));
    } else {
      sessionStorage.removeItem(trashKey);
    }
    setTrash(deDuped);
  }

  function moveToTop(iCid: ICID) {
    saveIdeas([iCid, ...ideas]);
    clearHTMLSelection();
  }

  function onIdeaAdded(iCid: ICID) {
    moveToTop(iCid);
  }

  function onRelationAdded(rCid: ICID) {
    moveToTop(rCid);
    setEditRelation(null);
  }

  function handleItemSelected(iCid: ICID) {
    setSelected([iCid]);
    moveToTop(iCid);
  }

  function populateEditor(iCid: ICID) {
    fetch(`/api/idea/${iCid}`, { cache: 'force-cache' })
      .then(response => response.text())
      .then(setInitialEntryText)
      .then(() => trashIdea(iCid));
  }

  function trashIdea(iCid: ICID) {
    saveIdeas(filter(ideas, idea => idea !== iCid));
    saveTrash([iCid, ...trash]);
    if (has(currentPerspective, iCid)) {
      newPerspective(omit(currentPerspective, [iCid]));
    }
  }

  function onDragEnd({ source, destination }) {
    // dropped outside the list
    if (!destination) return;

    saveIdeas(reorder(ideas, source.index, destination.index));
  }

  async function newPerspective(perspective) {
    const response = await fetch('/api/perspective', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(perspective),
    })
    setCurrentPerspective({ ...perspective });
    const pCid = await response.text();
    window.history.replaceState(null, pCid, `/${pCid}`);
  }

  const onClick = {
    Analogy: () => {
      if (ideas.length < 4) return;
      const [A, B, C, D] = ideas;
      setEditRelation({ Relation: 'Analogy', A, B, C, D });
    },

    And: () => {
      if (ideas.length < 2) return;
      const [A, B] = ideas;
      setEditRelation({ Relation: 'And', A, B });
    },

    Identity: () => {
      if (ideas.length < 2) return;
      const [A, B] = ideas;
      setEditRelation({ Relation: 'Identity', A, B });
    },

    Implies: () => {
      if (ideas.length < 2) return;
      const [A, B] = ideas;
      setEditRelation({ Relation: 'Implies', A, B });
    },

    Improves: () => {
      if (ideas.length < 2) return;
      const [A, B] = ideas;
      setEditRelation({ Relation: 'Improves', A, B });
    },

    IsA: () => {
      if (ideas.length < 2) return;
      const [A, B] = ideas;
      setEditRelation({ Relation: 'IsA', A, B });
    },

    Negation: () => {
      if (!ideas.length) return;
      const [A] = ideas;
      setEditRelation({ Relation: 'Negation', A });
    },

    Or: () => {
      if (ideas.length < 2) return;
      const [A, B] = ideas;
      setEditRelation({ Relation: 'Or', A, B });
    },

    XOr: () => {
      if (ideas.length < 2) return;
      const [A, B] = ideas;
      setEditRelation({ Relation: 'XOr', A, B });
    },
  };

  const operands = editRelation && ['A', 'B', 'C', 'D'].slice(0, relationArity[editRelation.Relation])
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
                {ideas.map((iCid, index) => {
                  const relationLabelProps = {} as { relationLabel: string; relationLabelRef: any; };
                  if (editRelation && index < relationArity[editRelation.Relation]) {
                    relationLabelProps.relationLabel = ['A', 'B', 'C', 'D'][index];
                    relationLabelProps.relationLabelRef = [refs.A, refs.B, refs.C, refs.D][index];
                  }
                  return (
                    <IdeaWellItem
                      iCid={iCid}
                      index={index}
                      key={iCid}
                      namespace={namespace}
                      onClickEdit={() => populateEditor(iCid)}
                      onClickTrash={() => trashIdea(iCid)}
                      onSelected={(selectedCid) => handleItemSelected(selectedCid || iCid)}
                      selected={includes(selected, iCid)}
                      valuation={has(currentPerspective, iCid) ? currentPerspective[iCid] : '??'}
                      onValuationChange={(newValue: number) => {
                        currentPerspective[iCid] = newValue;
                        newPerspective(currentPerspective);
                      }}
                      // perspective={currentPerspective}
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
                className={editRelation?.Relation === type ? 'selected' : ''}>
                <button onClick={onClick[type]}>{type}</button>
              </li>
            ))}
          </ul>
        </aside>
        {editRelation ? (operands.map((operand) => (
          <Xarrow
            start={refs[editRelation.Relation]}
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
