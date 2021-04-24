import React from 'react';

export function SideBySide({ children }) {
  const [left, center, right] = children;

  return (
    <>
      <div className="relation-left-operand">
        {left}
      </div>
      <div className="relation-operator">
        {center}
      </div>
      <div className="relation-right-operand">
        {right}
      </div>
    </>
  );
};
