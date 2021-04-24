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

export function Relation({ relation }) {
  const arity = relationArity[relation.Relation];
  const operands = { A: relation.A };
  if (arity >= 2) operands.B = relation.B;
  if (arity === 4) {
    operands.C = relation.C;
    operands.D = relation.D;
  }

  function pickComponent() {
    switch (relation.Relation) {
      case 'Analogy': return <Analogy {...operands} />;
      case 'And': return <And {...operands} layout="side-by-side" />;
      case 'Identity': return <Identity {...operands} />;
      case 'Implies': return <Implies {...operands} />;
      case 'Improves': return <Improves {...operands} />;
      case 'IsA': return <IsA {...operands} />;
      case 'Negation': return <Negation {...operands} />;
      case 'Or': return <Or {...operands} />;
      case 'XOr': return <XOr {...operands} />;
      default: return (
        <>
          <div>NOT A RELATION</div>
          <pre>{JSON.stringify(relation)}</pre>
        </>
      );
    }
  }

  return pickComponent();
};
