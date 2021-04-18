import React, { useEffect, useState } from 'react';
import { Draggable } from "react-beautiful-dnd";

export function IdeaWellItem({
  icid,
  index,
  onClick,
  onClickEdit,
  onClickTrash,
  onClickTop,
  selected
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
          onClick={onClick}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {selected ? <div className="idea-well-icid">{icid}</div> : ''}
          <pre>{idea}</pre>
          {selected ? (
            <div className="idea-well-item-actions">
              <a href="#" title="Top" onClick={onClickTop}>⬆️</a>
              <a href="#" title="Edit" onClick={onClickEdit}>✎</a>
              <a href="#" title="Trash" onClick={onClickTrash}>🗑</a>
            </div>
          ) : ''}
        </li>
      )}
    </Draggable>
  );
}
