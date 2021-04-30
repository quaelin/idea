import React from 'react';
import { CIDOrPhrase } from './CIDOrPhrase';
import { SideBySideOperand } from './SideBySideOperand';

export function Negation({ A, layout }) {
  return (
    <div className="relation relation-negation">
      <div className="relation-negation-not">NOT</div>
      {layout === 'side-by-side' ? (
        <SideBySideOperand cid={A} />
      ) : (
        <CIDOrPhrase cid={A} />
      )}
    </div>
  );
};
