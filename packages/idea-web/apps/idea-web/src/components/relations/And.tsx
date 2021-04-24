import React from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { CID } from './CID';

export function And({ A, B }) {
  const atLeast500px = useMediaPredicate(
    '(min-width: 500px)'
  );

  return (
    <div className="relation relation-and">
      <CID cid={A} /> <strong>{atLeast500px ? 'AND' : '&'}</strong> <CID cid={B} />
    </div>
  );
};
