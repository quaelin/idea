import { startsWith } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Relation } from './Relation';
import { fetchIdea } from '../fetcher';

export function IdeaWellItem({
  icid,
  index,
  onClickEdit,
  onClickTrash,
  onSelected,
  selected,
  relationLabel,
  relationLabelRef,
}) {
  const [idea, setIdea] = useState();
  const classNames = ['idea-well-item'];
  if (selected) classNames.push('selected');

  useEffect(() => {
    fetchIdea(icid).then(setIdea);
  }, []);

  console.log(idea);
  return (
    <Draggable key={icid} draggableId={icid} index={index}>
      {(provided) => (
        <li
          className={classNames.join(' ')}
          data-icid={icid}
          key={icid}
          onDoubleClick={() => onSelected(icid)}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="idea-well-item-grip" {...provided.dragHandleProps}>
            <div className="idea-well-item-icon">💡</div>
            <div className="idea-well-item-grip-inner" />
          </div>
          <div className="idea-well-item-icid">{
            selected ? icid : `${icid.substr(0, 10)}...`
          }</div>
          {selected ? (
            <>
              <div className="idea-well-item-border" />
              <div className="idea-well-item-actions">
                <a href="#" title="Edit" onClick={onClickEdit}>
                  <img src="assets/pencil-icon.png" alt="edit" />
                </a>
                <a href="#" title="Trash" onClick={onClickTrash}>X</a>
              </div>
            </>
          ) : ''}
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
        </li>
      )}
    </Draggable>
  );
};
