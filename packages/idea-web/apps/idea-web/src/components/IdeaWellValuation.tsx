import { useEffect, useState } from 'react';
import { Range } from 'react-range';

import type { Valuation } from '@quaelin/idea-api';

import './IdeaWellValuation.css';

type Props = {
    valuation: Valuation | '??';
    onChange: (newValuation: number) => void;
}

export function valuationColor(val: number | string) {
    const num = Number(val);
    const red = 200 + ((num < 0) ? 0 : (num * -200));
    const green = 200 + ((num > 0) ? 0 : (num * 200));
    const blue = 200 - Math.min(Math.abs(num) * 300, 200);
    return `rgb(${red},${green},${blue})`;
}

function characterize(valuation: number) {
    if (valuation < -1) return 'ERROR';
    if (valuation === -1) return 'Totally disagree';
    if (valuation < -0.05) return 'Disagree';
    if (valuation <= 0.05) return 'Neutral';
    if (valuation < 1) return 'Agree';
    if (valuation === 1) return 'Totally agree';
    return 'ERROR';
}

export function IdeaWellValuation({ valuation, onChange }: Props) {
    const [editing, setEditing] = useState<boolean>(false);
    const [newValue, setNewValue] = useState<Valuation>(0);

    const newValueCharacterization = characterize(newValue);

    useEffect(() => {
        setNewValue(Number(valuation === '??' ? 0 : valuation));
    }, [valuation]);

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
                        className="idea-well-item-valuation-slider-thumb"
                        style={{
                            ...props.style,
                            background: valuationColor(newValue),
                        }}
                    >
                        {(Math.round(newValue * 100) / 100).toFixed(2)}
                        <div
                            className="idea-well-item-valuation-floating-text"
                            style={{ color: valuationColor(newValue) }}
                        >
                            <span>{newValueCharacterization}</span>
                        </div>
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
