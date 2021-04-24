import React from 'react';

export function XOr({ A, B }) {
  return (
    <div className="relation relation-xor">
      {A} <strong>OR</strong> {B} <strong>BUT NOT BOTH</strong>
    </div>
  );
};
