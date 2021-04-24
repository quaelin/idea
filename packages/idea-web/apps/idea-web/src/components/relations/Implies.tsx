import React from 'react';
import { CID } from './CID';

export function Implies({ A, B }) {
  return (
    <div className="relation relation-implies">
      <strong>IF</strong> <CID cid={A} /> <strong>THEN</strong> <CID cid={B} />
    </div>
  );
};
