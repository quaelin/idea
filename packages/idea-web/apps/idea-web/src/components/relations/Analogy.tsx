import React from 'react';
import { CID } from './CID';

export function Analogy({ A, B, C, D }) {
  return (
    <div className="relation relation-analogy">
      <strong>Analogy:</strong> <CID cid={A} /> <strong>is to</strong> <CID cid={B} />
      <strong>as</strong> <CID cid={C} /> <strong>is to</strong> <CID cid={D} />
    </div>
  );
};
