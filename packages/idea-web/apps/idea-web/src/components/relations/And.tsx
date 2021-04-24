import React from 'react';

export function And({ A, B }) {
  return (
    <div className="relation relation-and">
      {A} <strong>AND</strong> {B}
    </div>
  );
};
