import React, { useEffect, useState } from 'react';
import { CID } from './CID';
import { fetchIdea } from '../../fetcher';

function isShortEnoughPhrase(phrase) {
  return phrase.length < 120 && phrase.split(' ').length < 10;
}

export function CIDOrPhrase({ cid }) {
  const [phrase, setPhrase] = useState(null);

  async function loadContentAndCheckLength() {
    const content = await fetchIdea(cid);
    if (typeof content === 'string' && isShortEnoughPhrase(content)) {
      setPhrase(content);
    }
  }

  useEffect(() => {
    loadContentAndCheckLength();
  }, []);

  return (
    phrase ? (
      <span className="relation-cid-phrase">{phrase}</span>
    ) : (
      <CID cid={cid} />
    )
  );
};
