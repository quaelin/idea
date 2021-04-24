import React from 'react';
import { CID } from './CID';

export function Or({ A, B }) {
  return (
    <div className="relation relation-or">
      <CID cid={A} /> <strong>OR</strong> <CID cid={B} />
    </div>
  );
};
