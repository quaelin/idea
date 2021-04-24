import React from 'react';
import { CID } from './CID';

export function Negation({ A }) {
  return (
    <div className="relation relation-negation">
      <strong>NOT</strong> <CID cid={A} />
    </div>
  );
};
