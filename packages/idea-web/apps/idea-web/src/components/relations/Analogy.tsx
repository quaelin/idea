import React from 'react';

export function Analogy({ A, B, C, D }) {
  return (
    <div className="relation relation-analogy">
      <strong>Analogy:</strong> {A} <strong>is to</strong> {B}
      <strong>as</strong> {C} <strong>is to</strong> {D}
    </div>
  );
};
