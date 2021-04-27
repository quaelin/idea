import React from 'react';
import { CIDOrPhrase } from './CIDOrPhrase';
import { SideBySide } from './SideBySide';
import { SideBySideOperand } from './SideBySideOperand';

export function Improves({ A, B, layout, onSelected }) {
  function select(cid) {
    if (onSelected) return onSelected(cid);
  }

  return (
    <div className="relation relation-improves">
      {layout === 'side-by-side' ? (
        <SideBySide>
          <SideBySideOperand cid={A} position="left" onClick={() => select(A)} />
          <strong>=</strong>
          <SideBySideOperand cid={B} position="right" onClick={() => select(B)} />
        </SideBySide>
      ) : ''}
      {!layout || layout === 'cids' ? (
        <>
          <CIDOrPhrase cid={A} /> <strong>IS BETTER THAN</strong> <CIDOrPhrase cid={B} />
        </>
      ) : ''}
    </div>
  );
};
