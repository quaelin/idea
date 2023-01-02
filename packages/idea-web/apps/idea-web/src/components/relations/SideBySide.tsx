import React from 'react';

export function SideBySide({ children }) {
  const [left, center, right] = children;

  return (
    <>
      <div className="relation-side-by-side-operand relation-left-operand">
        {left}
      </div>
      <div className="relation-operator">
        {center}
      </div>
      <div className="relation-side-by-side-operand relation-right-operand">
        {right}
      </div>
    </>
  );
}
