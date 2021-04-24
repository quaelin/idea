import React from 'react';
import { CID } from './CID';

export function Improves({ A, B }) {
  return (
    <div className="relation relation-improves">
      <CID cid={A} /> <strong>IS BETTER THAN</strong> <CID cid={B} />
    </div>
  );
};
