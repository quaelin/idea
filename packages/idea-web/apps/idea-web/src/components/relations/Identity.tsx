import React from 'react';

export function Identity({ A, B }) {
  return (
    <div className="relation relation-identity">
      {A} <strong>IS THE SAME AS</strong> {B}
    </div>
  );
};
