import React from 'react';
import { CIDOrPhrase } from './CIDOrPhrase';

import './Analogy.css';

type Props = {
  A: string;
  B: string;
  C: string;
  D: string;
  layout?: 'sentence' | 'stacked';
}

export function Analogy({ A, B, C, D, layout }: Props) {
  layout = layout || 'sentence';

  return (
    <div className="relation relation-analogy">
      <div className={`relation-${layout}`}>
        <strong className="relation-analogy-label">Analogy:</strong>
        <CIDOrPhrase cid={A} className="relation-operand-a" />
        <strong className="relation-analogy-is-to-1">IS TO</strong>
        <CIDOrPhrase cid={B} className="relation-operand-b" />
        <strong className="relation-analogy-as">AS</strong>
        <CIDOrPhrase cid={C} className="relation-operand-c" />
        <strong className="relation-analogy-is-to-2">IS TO</strong>
        <CIDOrPhrase cid={D} className="relation-operand-d" />
      </div>
    </div>
  );
}
