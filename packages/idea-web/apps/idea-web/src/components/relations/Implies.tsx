import React from 'react';

export function Implies({ A, B }) {
  return (
    <div className="relation relation-implies">
      <strong>IF</strong> {A} <strong>THEN</strong> {B}
    </div>
  );
};
