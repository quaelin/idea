import React from 'react';
import { CIDOrPhrase } from './CIDOrPhrase';

export function Analogy({ A, B, C, D, layout }) {
  layout = layout || 'sentence';

  return (
    <div className={`relation relation-analogy relation-${layout}`}>
      {layout === 'sentence' ? (
        <>
          <strong>Analogy:</strong>
          <CIDOrPhrase cid={A} /> <strong>IS TO</strong> <CIDOrPhrase cid={B} />
          <strong>AS</strong>
          <CIDOrPhrase cid={C} /> <strong>IS TO</strong> <CIDOrPhrase cid={D} />
        </>
      ) : ''}
    </div>
  );
}
