import React from 'react';

export function Improves({ A, B }) {
  return (
    <div className="relation relation-improves">
      {A} <strong>IS BETTER THAN</strong> {B}
    </div>
  );
};
