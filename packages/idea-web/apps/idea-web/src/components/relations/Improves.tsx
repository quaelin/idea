import React from 'react';
import { CIDOrPhrase } from './CIDOrPhrase';
import { SideBySide } from './SideBySide';
import { SideBySideOperand } from './SideBySideOperand';

type Props = {
  A: string;
  B: string;
  layout?: 'sentence' | 'side-by-side';
  onSelected?: (cid: string) => void;
}

export function Improves({ A, B, layout, onSelected }: Props) {
  layout = layout || 'sentence';

  function select(cid) {
    if (onSelected) return onSelected(cid);
  }

  return (
    <div className={`relation relation-improves relation-${layout}`}>
      {layout === 'side-by-side' ? (
        <SideBySide>
          <SideBySideOperand cid={A} onClick={() => select(A)} />
          <strong>IS BETTER THAN</strong>
          <SideBySideOperand cid={B} onClick={() => select(B)} />
        </SideBySide>
      ) : ''}
      {layout === 'sentence' ? (
        <>
          <CIDOrPhrase cid={A} /> <strong>IS BETTER THAN</strong> <CIDOrPhrase cid={B} />
        </>
      ) : ''}
    </div>
  );
}
