import React from 'react';

export function Or({ A, B }) {
  return (
    <div className="relation relation-or">
      {A} <strong>OR</strong> {B}
    </div>
  );
};
