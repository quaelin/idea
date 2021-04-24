import React from 'react';
import { CID } from './CID';

export function IsA({ A, B }) {
  return (
    <div className="relation relation-isa">
      <CID cid={A} /> <strong>IS A</strong> <CID cid={B} />
    </div>
  );
};
