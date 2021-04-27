import React, { useEffect, useState } from 'react';
import { fetchIdea } from '../../fetcher';

export function CID({ cid }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchIdea(cid).then(setContent);
  }, []);

  return (
    <span className="relation-cid" title={content}>
      {`${cid.substr(0, 4)}...${cid.substr(-4)}`}
    </span>
  );
};
