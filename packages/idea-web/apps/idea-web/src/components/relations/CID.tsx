import React, { useEffect, useState } from 'react';
import { fetchIdea } from '../../fetcher';

export function CID({ cid }) {
  const [tooltip, setTooltip] = useState(cid);

  async function setContentAsTooltip() {
    const content = await fetchIdea(cid);
    if (typeof content === 'string') {
      setTooltip(content.substr(0, 100));
    } else {
      setTooltip(`R:${content.Relation}`);
    }
  }

  useEffect(() => {
    setContentAsTooltip();
  }, []);

  return (
    <span className="relation-cid" title={tooltip}>
      {`${cid.substr(0, 4)}...${cid.substr(-4)}`}
    </span>
  );
};
