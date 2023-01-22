import React, { useEffect, useState } from 'react';
import { CID } from './CID';
import { fetchIdea } from '../../fetcher';

function isShortEnoughPhrase(phrase) {
  return phrase.length < 140 && phrase.split(' ').length < 20;
}

type Props = {
  cid: string;
  className?: string;
};

export function CIDOrPhrase({ cid, className }: Props) {
  const [phrase, setPhrase] = useState(null);

  async function loadContentAndCheckLength() {
    const content = await fetchIdea(cid);
    if (typeof content === 'string' && isShortEnoughPhrase(content)) {
      setPhrase(content);
    }
  }

  useEffect(() => {
    loadContentAndCheckLength();
  });

  return (
    phrase ? (
      <span className={`relation-cid-phrase ${className}`}>{phrase}</span>
    ) : (
      <CID cid={cid} className={className} />
    )
  );
}
