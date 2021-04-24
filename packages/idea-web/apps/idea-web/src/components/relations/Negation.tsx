import React from 'react';

export function Negation({ A }) {
  return (
    <div className="relation relation-negation">
      <strong>NOT</strong> {A}
    </div>
  );
};
