import React, { useEffect, useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Relation } from './Relation';
import { fetchIdea } from '../fetcher';
import { IdeaWellValuation as Valuation } from './IdeaWellValuation';

export function IdeaWellItem({
  icid,
  index,
  namespace,
  onClickEdit,
  onClickTrash,
  onSelected,
  selected,
  relationLabel,
  relationLabelRef,
  valuation,
  onValuationChange,
}) {
  const [idea, setIdea] = useState();
  const classNames = ['idea-well-item'];
  if (selected) classNames.push('selected');

  useEffect(() => {
    fetchIdea(icid).then(setIdea);
  }, [icid]);

  console.log(idea);
  return (
    <Draggable key={icid} draggableId={icid} index={index}>
      {(provided) => (
        <li
          className={classNames.join(' ')}
          key={icid}
          onDoubleClick={() => onSelected(icid)}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <article data-icid={icid}>
            <header>
              <div className="idea-well-item-grip" {...provided.dragHandleProps}>
                <div className="idea-well-item-icon">
                  <span role="img" aria-label="Idea">💡</span>
                </div>
                <div className="idea-well-item-grip-inner" />
              </div>
              <Valuation valuation={valuation} onChange={onValuationChange} />
              <div className="idea-well-item-icid">{
                selected ? icid : `${icid.substr(0, 10)}...`
              }</div>
              {selected ? (
                <>
                  <div className="idea-well-item-border" />
                  <div className="idea-well-item-actions">
                    <button title="Edit" onClick={onClickEdit}>
                      <img src="assets/pencil-icon.png" alt="edit" />
                    </button>
                    <button title="Trash" onClick={onClickTrash}>X</button>
                  </div>
                </>
              ) : ''}
            </header>
            <div className="idea-well-item-body">
              {idea ? (
                typeof idea === 'string' ? (
                  <pre>{idea}</pre>
                ) : (
                  <Relation relation={idea} onSelected={onSelected} />
                )
              ) : (
                <em>Loading...</em>
              )}
            </div>
            {relationLabel ? (
              <div ref={relationLabelRef} className="idea-well-item-relation-label-wrapper">
                <div className="idea-well-item-relation-label">{relationLabel}</div>
              </div>
            ) : ''}
          </article>
        </li>
      )}
    </Draggable>
  );
}
