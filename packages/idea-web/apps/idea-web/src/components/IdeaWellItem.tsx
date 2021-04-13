import React, { useEffect, useState } from 'react';

export function IdeaWellItem({
  icid,
  onClick,
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
    <li
      className={classNames.join(' ')}
      data-icid={icid}
      onClick={onClick}
    >
      {selected ? <div className="idea-well-icid">{icid}</div> : ''}
      <pre>{idea}</pre>
      {selected ? (
        <div className="idea-well-item-actions">
          <a href="#" title="Trash" onClick={onClickTrash}>🗑</a>
          <a href="#" title="Top" onClick={onClickTop}>⬆️</a>
        </div>
      ) : ''}
    </li>
  );
}
