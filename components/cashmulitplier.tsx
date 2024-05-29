import React, { useState, ChangeEvent, useEffect } from 'react';

interface CashMultiplierProps {
  multipliers: number[];
}

const CashMultiplier: React.FC<CashMultiplierProps> = ({ multipliers }) => {
  const [inputValues, setInputValues] = useState<string[]>(Array(multipliers.length).fill(''));
  const [results, setResults] = useState<string[]>(Array(multipliers.length).fill(''));
  const [total, setTotal] = useState<string>('0.00');

  const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target;
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    const newResults = [...results];
    newResults[index] = value ? (multipliers[index] * parseFloat(value)).toFixed(2) : '';
    setResults(newResults);
  };

  useEffect(() => {
    const totalSum = results.reduce((sum, result) => sum + (parseFloat(result) || 0), 0);
    setTotal(totalSum.toFixed(2));
  }, [results]);

  return (
    <div>
      {multipliers.map((multiplier, index) => (
        <div key={index} className="grid grid-cols-2 gap-4 mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label htmlFor={`multiplier-${index}`}>{multiplier} @:</label>
            <input
              type="text"
              id={`multiplier-${index}`}
              className="border-b border-black text-center mx-1 w-full"
              value={inputValues[index]}
              onChange={(event) => handleChange(event, index)}
            />
          </div>
          <input
            type="text"
            placeholder="Amount"
            className="border-b border-black text-center mx-1 w-full"
            value={results[index]}
            readOnly
          />
        </div>
      ))}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label htmlFor="total">TOTAL:</label>
        <input
          type="text"
          id="total"
          className="border-b border-black text-center mx-1 w-full"
          value={total}
          readOnly
        />
      </div>
    </div>
  );
};

export default CashMultiplier;

// Usage example
// <CashMultiplier multipliers={[1000, 500, 2000]} />
