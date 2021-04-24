import React from 'react';

export function IsA({ A, B }) {
  return (
    <div className="relation relation-isa">
      {A} <strong>IS A</strong> {B}
    </div>
  );
};
