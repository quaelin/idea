import { filter, includes, uniq } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Xarrow from "react-xarrows";
import { IdeaEntry } from './IdeaEntry';
import { IdeaWellItem } from './IdeaWellItem';
import { RelationEntry } from './RelationEntry';
import { relationArity } from '../relationArity';

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

  function onClickAnalogy() {
    if (ideas.length < 4) return;
    const [A, B, C, D] = ideas;
    setEditRelation({ R: 'Analogy', A, B, C, D });
  }

  function onClickAnd() {
    if (ideas.length < 2) return;
    const [A, B] = ideas;
    setEditRelation({ R: 'And', A, B });
  }

  function onClickIdentity() {
    if (ideas.length < 2) return;
    const [A, B] = ideas;
    setEditRelation({ R: 'Identity', A, B });
  }

  function onClickImplies() {
    if (ideas.length < 2) return;
    const [A, B] = ideas;
    setEditRelation({ R: 'Implies', A, B });
  }

  function onClickImproves() {
    if (ideas.length < 2) return;
    const [A, B] = ideas;
    setEditRelation({ R: 'Improves', A, B });
  }

  function onClickIsA() {
    if (ideas.length < 2) return;
    const [A, B] = ideas;
    setEditRelation({ R: 'IsA', A, B });
  }

  function onClickNegation() {
    if (!ideas.length) return;
    const [A] = ideas;
    setEditRelation({ R: 'Negation', A });
  }

  function onClickOr() {
    if (ideas.length < 2) return;
    const [A, B] = ideas;
    setEditRelation({ R: 'Or', A, B });
  }

  function onClickXOr() {
    if (ideas.length < 2) return;
    const [A, B] = ideas;
    setEditRelation({ R: 'XOr', A, B });
  }

  const operands = editRelation && ['A', 'B', 'C', 'D'].slice(0, relationArity[editRelation.R])

  return (
    <div className="idea-well">
      <div className="idea-well-head">
        <div className="idea-well-key">{key}</div>
        {editRelation ? (
          <RelationEntry relation={editRelation} onRelationAdded={onRelationAdded} />
        ) : (
          <IdeaEntry initialText={initialEntryText} onIdeaAdded={onIdeaAdded} />
        )}
      </div>
      <div className="idea-well-body">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="idea-well-droppable">
            {(provided, snapshot) => (
              <ol className="idea-well-droppable" {...provided.droppableProps} ref={provided.innerRef}>
                {ideas.map((icid, index) => {
                  const relationLabelProps = {};
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
                      onSelected={() => handleItemSelected(icid)}
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
        <div className="idea-well-relation-selector">
          <ul>
            <li key="Negation" ref={refs.Negation}><a href="#" onClick={onClickNegation}>Negation</a></li>
            <li key="And" ref={refs.And}><a href="#" onClick={onClickAnd}>And</a></li>
            <li key="Identity" ref={refs.Identity}><a href="#" onClick={onClickIdentity}>Identity</a></li>
            <li key="Implies" ref={refs.Implies}><a href="#" onClick={onClickImplies}>Implies</a></li>
            <li key="Improves" ref={refs.Improves}><a href="#" onClick={onClickImproves}>Improves</a></li>
            <li key="IsA" ref={refs.IsA}><a href="#" onClick={onClickIsA}>IsA</a></li>
            <li key="Or" ref={refs.Or}><a href="#" onClick={onClickOr}>Or</a></li>
            <li key="XOr" ref={refs.XOr}><a href="#" onClick={onClickXOr}>XOr</a></li>
            <li key="Analogy" ref={refs.Analogy}><a href="#" onClick={onClickAnalogy}>Analogy</a></li>
          </ul>
        </div>
        {editRelation ? (operands.map((operand) => (
          <Xarrow start={refs[editRelation.R]} end={refs[operand]} curveness={0.5} />
        ))) : ''}
      </div>
    </div>
  );
}
