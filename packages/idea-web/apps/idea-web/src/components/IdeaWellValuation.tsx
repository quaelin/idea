import { useState } from 'react';
import { Range } from 'react-range';

type Props = {
    valuation: number | string;
    onChange: (newValuation: number) => void;
}

export function valuationColor(val: number | string) {
    const num = Number(val);
    const red = 200 + ((num < 0) ? 0 : (num * -200));
    const green = 200 + ((num > 0) ? 0 : (num * 200));
    const blue = 200 - Math.min(Math.abs(num) * 300, 200);
    return `rgb(${red},${green},${blue})`;
}

export function IdeaWellValuation({ valuation, onChange }: Props) {
    const [editing, setEditing] = useState(false);
    const [newValue, setNewValue] = useState(Number(valuation === '??' ? 0 : valuation));

    if (!editing) return (
        <div
            className="idea-well-item-valuation"
            style={{ background: valuationColor(newValue) }}
            onClick={() => setEditing(true)}
            title="Evaluate this idea"
        >
            <span>{valuation}</span>
        </div>
    );

    return (
        <div className="idea-well-item-valuation editing">
            <Range
                step={0.01}
                min={-1}
                max={1}
                values={[newValue]}
                onChange={(values) => setNewValue(values[0])}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            background: valuationColor(newValue),
                            height: '1em',
                            width: '15em',
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            background: valuationColor(newValue),
                            border: '1px solid black',
                            borderRadius: '3px',
                            height: '1.3em',
                            minWidth: '1.3em',
                            padding: '2px 3px',
                            textAlign: 'center',
                        }}
                    >
                        {(Math.round(newValue * 100) / 100).toFixed(2)}
                    </div>
                )}
                onFinalChange={(values) => {
                    setEditing(false);
                    onChange(values[0]);
                }}
            />
        </div>
    );
}
