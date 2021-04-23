import React, { useEffect, useState } from 'react';
import { Draggable } from "react-beautiful-dnd";

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
    fetch(`/api/idea/${icid}`)
      .then(response => response.text())
      .then(setIdea);
  }, []);

  return (
    <Draggable key={icid} draggableId={icid} index={index}>
      {(provided) => (
        <li
          className={classNames.join(' ')}
          data-icid={icid}
          key={icid}
          onDoubleClick={onSelected}
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
          <pre>{idea}</pre>
          {relationLabel ? (
            <div ref={relationLabelRef} className="idea-well-item-relation-label">{relationLabel}</div>
          ) : ''}
        </li>
      )}
    </Draggable>
  );
}
