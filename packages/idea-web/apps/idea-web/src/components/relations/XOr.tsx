import React from 'react';
import { CID } from './CID';

export function XOr({ A, B }) {
  return (
    <div className="relation relation-xor">
      <CID cid={A} /> <strong>OR</strong> <CID cid={B} /> <strong>BUT NOT BOTH</strong>
    </div>
  );
};
