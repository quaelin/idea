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

export function Relation({ relation, onSelected }) {
  const arity = relationArity[relation.Relation];
  const operands = { A: relation.A, onSelected };
  if (arity >= 2) operands.B = relation.B;
  if (arity === 4) {
    operands.C = relation.C;
    operands.D = relation.D;
  }

  function pickComponent() {
    switch (relation.Relation) {
      case 'Analogy': return <Analogy {...operands} />;
      case 'And': return <And {...operands} layout="side-by-side" />;
      case 'Identity': return <Identity {...operands} layout="side-by-side" />;
      case 'Implies': return <Implies {...operands} layout="side-by-side" />;
      case 'Improves': return <Improves {...operands} layout="side-by-side" />;
      case 'IsA': return <IsA {...operands} layout="side-by-side" />;
      case 'Negation': return <Negation {...operands} layout="side-by-side" />;
      case 'Or': return <Or {...operands} layout="side-by-side" />;
      case 'XOr': return <XOr {...operands} layout="side-by-side" />;
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
