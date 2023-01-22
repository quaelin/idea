import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Relation } from './Relation';
import { fetchIdea } from '../fetcher';
import { IdeaWellValuation } from './IdeaWellValuation';

import type { AbstractIdea, ICID, Valuation } from '@quaelin/idea-api';

import './IdeaWellItem.css';

type Props = {
  iCid: ICID;
  index: number;
  namespace?: string;
  onClickEdit: () => void;
  onClickTrash: () => void;
  onSelected: () => void;
  selected: boolean;
  relationLabel: string;
  relationLabelRef: React.MutableRefObject<any>;
  valuation: Valuation | '??';
  onValuationChange: (newVal: Valuation) => void;
};

export function IdeaWellItem({
  iCid,
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
}: Props) {
  const [idea, setIdea] = useState<AbstractIdea>();
  const classNames = ['idea-well-item'];
  if (selected) classNames.push('selected');

  useEffect(() => {
    fetchIdea(iCid).then(setIdea);
  }, [iCid]);

  return (
    <Draggable key={iCid} draggableId={iCid} index={index}>
      {(provided) => (
        <li
          className={classNames.join(' ')}
          key={iCid}
          onDoubleClick={() => onSelected()}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <article data-icid={iCid}>
            <header>
              <div className="idea-well-item-grip" {...provided.dragHandleProps}>
                <div className="idea-well-item-icon">
                  <span role="img" aria-label="Idea">💡</span>
                </div>
                <div className="idea-well-item-grip-inner" />
              </div>
              <IdeaWellValuation valuation={valuation} onChange={onValuationChange} />
              <div className="idea-well-item-icid">{iCid}</div>
              {selected && <div className="idea-well-item-border" />}
              <div className="idea-well-item-actions">
                {selected && (
                  <button title="Edit" onClick={onClickEdit}>
                    <img src="assets/pencil-icon.png" alt="edit" />
                  </button>
                )}
                <button title="Trash" onClick={onClickTrash}>X</button>
              </div>
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
