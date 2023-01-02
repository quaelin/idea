import React from 'react';
import { CIDOrPhrase } from './CIDOrPhrase';
import { SideBySide } from './SideBySide';
import { SideBySideOperand } from './SideBySideOperand';

export type IdentityProps = {
  A: string;
  B: string;
  layout?: 'sentence' | 'side-by-side';
  onSelected?: (cid: string) => void;
}

export function Identity({ A, B, layout, onSelected }: IdentityProps) {
  layout = layout || 'sentence';

  function select(cid) {
    if (onSelected) return onSelected(cid);
  }

  return (
    <div className={`relation relation-identity relation-${layout}`}>
      {layout === 'side-by-side' ? (
        <SideBySide>
          <SideBySideOperand cid={A} onClick={() => select(A)} />
          <strong>IS THE SAME AS</strong>
          <SideBySideOperand cid={B} onClick={() => select(B)} />
        </SideBySide>
      ) : ''}
      {layout === 'sentence' ? (
        <>
          <CIDOrPhrase cid={A} /> <strong>=</strong> <CIDOrPhrase cid={B} />
        </>
      ) : ''}
    </div>
  );
}
