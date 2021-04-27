import React from 'react';
import { SideBySide } from './SideBySide';
import { SideBySideOperand } from './SideBySideOperand';
import { CID } from './CID';

export function Identity({ A, B, layout, onSelected }) {
  function select(cid) {
    if (onSelected) return onSelected(cid);
  }

  return (
    <div className="relation relation-identity">
      {layout === 'side-by-side' ? (
        <SideBySide>
          <SideBySideOperand cid={A} position="left" onClick={() => select(A)} />
          <strong>=</strong>
          <SideBySideOperand cid={B} position="right" onClick={() => select(B)} />
        </SideBySide>
      ) : ''}
      {!layout || layout === 'cids' ? (
        <>
          <CID cid={A} /> <strong>IS THE SAME AS</strong> <CID cid={B} />
        </>
      ) : ''}
    </div>
  );
};
