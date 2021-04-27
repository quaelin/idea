import React from 'react';
import { CIDOrPhrase } from './CIDOrPhrase';

export function Negation({ A }) {
  return (
    <div className="relation relation-negation">
      <strong>NOT</strong> <CIDOrPhrase cid={A} />
    </div>
  );
};
