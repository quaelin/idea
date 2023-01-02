import React from 'react';
import { CIDOrPhrase } from './CIDOrPhrase';
import { SideBySide } from './SideBySide';
import { SideBySideOperand } from './SideBySideOperand';

export type OrProps = {
  A: string;
  B: string;
  layout?: 'sentence' | 'side-by-side';
  onSelected?: (cid: string) => void;
}

export function Or({ A, B, layout, onSelected }: OrProps) {
  layout = layout || 'sentence';

  function select(cid) {
    if (onSelected) return onSelected(cid);
  }

  return (
    <div className={`relation relation-or relation-${layout}`}>
      {layout === 'side-by-side' ? (
        <SideBySide>
          <SideBySideOperand cid={A} onClick={() => select(A)} />
          <strong>OR</strong>
          <SideBySideOperand cid={B} onClick={() => select(B)} />
        </SideBySide>
      ) : ''}
      {layout === 'sentence' ? (
        <>
          <CIDOrPhrase cid={A} /> <strong>OR</strong> <CIDOrPhrase cid={B} />
        </>
      ) : ''}
    </div>
  );
}
