import React from 'react';
import { CIDOrPhrase } from './CIDOrPhrase';
import { SideBySideOperand } from './SideBySideOperand';

export function Negation({ A, layout }) {
  layout = layout || 'sentence';

  return (
    <div className={`relation relation-negation relation-${layout}`}>
      <div className="relation-negation-not">NOT</div>
      {layout === 'side-by-side' ? (
        <SideBySideOperand cid={A} />
      ) : ''}
      {layout === 'sentence' ? (
        <CIDOrPhrase cid={A} />
      ) : ''}
    </div>
  );
}
