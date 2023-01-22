import React from 'react';
import { Analogy } from './relations/Analogy';
import { And } from './relations/And';
import { Identity } from './relations/Identity';
import { Implies } from './relations/Implies';
import { Improves } from './relations/Improves';
import { IsA } from './relations/IsA';
import { Negation } from './relations/Negation';
import { Or } from './relations/Or';
import { XOr } from './relations/XOr';
import { relationArity } from '../relationArity';

import './Relation.css';

type Operands = {
  A: string;
  B?: string;
  C?: string;
  D?: string;
}

type Props = {
  relation: Operands & { Relation: string; };
  onSelected?: () => void;
}

export function Relation({ relation, onSelected }: Props) {
  const arity = relationArity[relation.Relation];
  const operands = { A: relation.A, onSelected } as Operands;
  if (arity >= 2) operands.B = relation.B;
  if (arity === 4) {
    operands.C = relation.C;
    operands.D = relation.D;
  }

  function pickComponent() {
    switch (relation.Relation) {
      case 'Analogy': return <Analogy A={operands.A} B={operands.B} C={operands.C} D={operands.D} />;
      case 'And': return <And A={operands.A} B={operands.B} layout="side-by-side" onSelected={onSelected} />;
      case 'Identity': return <Identity A={operands.A} B={operands.B} layout="side-by-side" onSelected={onSelected} />;
      case 'Implies': return <Implies A={operands.A} B={operands.B} layout="side-by-side" onSelected={onSelected} />;
      case 'Improves': return <Improves A={operands.A} B={operands.B} layout="side-by-side" onSelected={onSelected} />;
      case 'IsA': return <IsA A={operands.A} B={operands.B} layout="side-by-side" onSelected={onSelected} />;
      case 'Negation': return <Negation A={operands.A} layout="side-by-side" />;
      case 'Or': return <Or A={operands.A} B={operands.B} layout="side-by-side" onSelected={onSelected} />;
      case 'XOr': return <XOr A={operands.A} B={operands.B} layout="side-by-side" onSelected={onSelected} />;
      default: return (
        <>
          <div>NOT A RELATION</div>
          <pre>{JSON.stringify(relation)}</pre>
        </>
      );
    }
  }

  return pickComponent();
}
