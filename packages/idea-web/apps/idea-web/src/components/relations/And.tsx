import React from 'react';
import { CIDOrPhrase } from './CIDOrPhrase';
import { SideBySide } from './SideBySide';
import { SideBySideOperand } from './SideBySideOperand';

export function And({ A, B, layout, onSelected }) {
  layout = layout || 'sentence';

  function select(cid) {
    if (onSelected) return onSelected(cid);
  }

  return (
    <div className={`relation relation-and relation-${layout}`}>
      {layout === 'side-by-side' ? (
        <SideBySide>
          <SideBySideOperand cid={A} onClick={() => select(A)} />
          <strong>AND</strong>
          <SideBySideOperand cid={B} onClick={() => select(B)} />
        </SideBySide>
      ) : ''}
      {layout === 'sentence' ? (
        <>
          <CIDOrPhrase cid={A} /> <strong>AND</strong> <CIDOrPhrase cid={B} />
        </>
      ) : ''}
    </div>
  );
}
