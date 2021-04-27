import React from 'react';
import { SideBySide } from './SideBySide';
import { SideBySideOperand } from './SideBySideOperand';
import { CID } from './CID';

export function Implies({ A, B, layout }) {
  return (
    <div className="relation relation-implies">
      {layout === 'side-by-side' ? (
        <SideBySide>
          <SideBySideOperand cid={A} position="left" />
          <strong>=</strong>
          <SideBySideOperand cid={B} position="right" />
        </SideBySide>
      ) : ''}
      {!layout || layout === 'cids' ? (
        <>
          <strong>IF</strong> <CID cid={A} /> <strong>THEN</strong> <CID cid={B} />
        </>
      ) : ''}
    </div>
  );
};
