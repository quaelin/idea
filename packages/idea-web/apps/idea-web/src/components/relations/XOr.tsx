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

export function XOr({ A, B, layout, onSelected }: Props) {
  layout = layout || 'sentence';

  function select(cid) {
    if (onSelected) return onSelected(cid);
  }

  return (
    <div className={`relation relation-xor relation-${layout}`}>
      {layout === 'side-by-side' ? (
        <SideBySide>
          <SideBySideOperand cid={A} onClick={() => select(A)} />
          <strong>XOR</strong>
          <SideBySideOperand cid={B} onClick={() => select(B)} />
        </SideBySide>
      ) : ''}
      {layout === 'sentence' ? (
        <>
          <CIDOrPhrase cid={A} /> <strong>OR</strong> <CIDOrPhrase cid={B} /> <strong>BUT NOT BOTH</strong>
        </>
      ) : ''}
    </div>
  );
}
