import React from 'react';

export function CID({ cid }) {
  return (
    <span className="relation-cid" title={cid}>
      {`${cid.substr(0, 4)}...${cid.substr(-4)}`}
    </span>
  );
};
