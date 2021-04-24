import React from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { SideBySide } from './SideBySide';
import { CID } from './CID';

export function And({ A, B, layout }) {
  const atLeast500px = useMediaPredicate(
    '(min-width: 500px)'
  );

  return (
    <div className={`relation relation-and relation-${layout}`}>
      {layout === 'side-by-side' ? (
        <SideBySide>
          <CID cid={A} />
          <strong>AND</strong>
          <CID cid={B} />
        </SideBySide>
      ) : (
        <>
          <CID cid={A} /> <strong>{atLeast500px ? 'AND' : '&'}</strong> <CID cid={B} />
        </>
      )}
    </div>
  );
};
