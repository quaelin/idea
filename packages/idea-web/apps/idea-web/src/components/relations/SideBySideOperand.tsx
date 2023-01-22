import React, { useEffect, useState } from 'react';
import { Analogy } from './Analogy';
import { And } from './And';
import { Identity } from './Identity';
import { Implies } from './Implies';
import { Improves } from './Improves';
import { IsA } from './IsA';
import { Negation } from './Negation';
import { Or } from './Or';
import { XOr } from './XOr';
import { CID } from './CID';

import { fetchIdea } from '../../fetcher';

type Props = {
  cid: string;
  onClick?: () => void;
}

export function SideBySideOperand({ cid, onClick }: Props) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchIdea(cid).then(setContent);
  }, [cid]);

  function pickComponent() {
    const { A, B, C, D } = content;
    switch (content.Relation) {
      case 'Analogy': return <Analogy A={A} B={B} C={C} D={D} layout="stacked" />;
      case 'And': return <And A={A} B={B} />;
      case 'Identity': return <Identity A={A} B={B} />;
      case 'Implies': return <Implies A={A} B={B} />;
      case 'Improves': return <Improves A={A} B={B} />;
      case 'IsA': return <IsA A={A} B={B} />;
      case 'Negation': return <Negation A={A} layout="side-by-side" />;
      case 'Or': return <Or A={A} B={B} />;
      case 'XOr': return <XOr A={A} B={B} />;
      default: return (
        <>
          <div>NOT A RELATION</div>
          <pre className="idea-well-json">{JSON.stringify(content)}</pre>
        </>
      );
    }
  }

  return (
    <div className="side-by-side-operand" onClick={onClick}>
      {content ? (
        typeof content === 'string' ? (
          <pre>{content}</pre>
        ) : (
          pickComponent()
        )
      ) : (
        <CID cid={cid} />
      )}
    </div>
  );
}
