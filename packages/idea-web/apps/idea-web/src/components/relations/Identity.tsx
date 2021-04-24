import React from 'react';
import { CID } from './CID';

export function Identity({ A, B }) {
  return (
    <div className="relation relation-identity">
      <CID cid={A} /> <strong>IS THE SAME AS</strong> <CID cid={B} />
    </div>
  );
};
