import React, { useEffect, useState } from 'react';
import { fetchIdea } from '../../fetcher';

type Props = {
  cid: string;
  className?: string;
};

export function CID({ cid, className }: Props) {
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
  });

  return (
    <span className={`relation-cid ${className}`} title={tooltip}>
      {`${cid.substr(0, 4)}...${cid.substr(-4)}`}
    </span>
  );
}
