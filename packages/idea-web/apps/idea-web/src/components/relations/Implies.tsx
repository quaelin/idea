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

export function Implies({ A, B, layout, onSelected }: Props) {
  layout = layout || 'sentence';

  function select(cid: string) {
    if (onSelected) return onSelected(cid);
  }

  return (
    <div className={`relation relation-implies relation-${layout}`}>
      {layout === 'side-by-side' ? (
        <SideBySide>
          <SideBySideOperand cid={A} onClick={() => select(A)} />
          <strong>IMPLIES</strong>
          <SideBySideOperand cid={B} onClick={() => select(B)} />
        </SideBySide>
      ) : ''}
      {layout === 'sentence' ? (
        <>
          <strong>IF</strong> <CIDOrPhrase cid={A} /> <strong>THEN</strong> <CIDOrPhrase cid={B} />
        </>
      ) : ''}
    </div>
  );
}
