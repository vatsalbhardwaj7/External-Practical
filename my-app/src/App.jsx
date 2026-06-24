import React, { useState } from "react";

function App() {
  const [currentInput, setCurrentInput] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAdd = () => {
    if (!currentInput.trim()) return;
    const parts = currentInput.split(/[\s,]+/).filter((p) => /^\d+$/.test(p));
    if (parts.length === 0) return;
    setNumbers((prev) => [...prev, ...parts]);
    setCurrentInput("");
    setResult(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index) => {
    setNumbers((prev) => prev.filter((_, i) => i !== index));
    setResult(null);
  };

  const handleClear = () => {
    setNumbers([]);
    setCurrentInput("");
    setResult(null);
  };

  const findLargestDigit = () => {
    const combined = numbers.join("") + currentInput;
    const digits = combined.match(/\d/g);
    if (!digits) {
      setResult("No digits to check yet");
      return;
    }
    const largest = Math.max(...digits.map(Number));
    setResult(largest);
  };

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6e8efb, #a777e3);
          font-family: 'Poppins', sans-serif;
          padding: 20px;
        }

        .card {
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .title {
          margin: 0 0 8px;
          font-size: 24px;
          font-weight: 700;
          color: #2d2d3a;
          text-align: center;
        }

        .subtitle {
          margin: 0 0 24px;
          font-size: 13px;
          color: #6b6b76;
          text-align: center;
          line-height: 1.4;
        }

        .input-row {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }

        .text-input {
          flex: 1;
          padding: 10px 12px;
          border: 1px solid #d7d7e0;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }

        .text-input:focus {
          border-color: #6e8efb;
        }

        .btn {
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: transform 0.15s, opacity 0.15s;
        }

        .btn:hover {
          opacity: 0.9;
        }

        .btn:active {
          transform: scale(0.97);
        }

        .btn-add {
          background: #2d2d3a;
          color: #fff;
        }

        .chip-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .chip {
          background: #f1f1fb;
          color: #2d2d3a;
          border-radius: 20px;
          padding: 6px 10px 6px 14px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .chip-remove {
          background: none;
          border: none;
          color: #9494a3;
          font-size: 15px;
          cursor: pointer;
          line-height: 1;
          padding: 0;
        }

        .chip-remove:hover {
          color: #e1483f;
        }

        .action-row {
          display: flex;
          gap: 8px;
        }

        .btn-primary {
          flex: 1;
          background: linear-gradient(135deg, #6e8efb, #a777e3);
          color: #fff;
        }

        .btn-clear {
          background: #f1f1fb;
          color: #6b6b76;
        }

        .result {
          margin-top: 24px;
          background: #f8f8fc;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }

        .result-label {
          display: block;
          font-size: 12px;
          color: #9494a3;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .result-value {
          display: block;
          font-size: 36px;
          font-weight: 700;
          color: #2d2d3a;
        }

        .result-empty {
          font-size: 14px;
          color: #9494a3;
        }

        @media (max-width: 480px) {
          .card {
            padding: 24px;
          }
        }
      `}</style>

      <div className="card">
        <h1 className="title">Largest Digit Finder</h1>
        <p className="subtitle">
          Add one or more numbers, then find the largest digit among them all.
        </p>

        <div className="input-row">
          <input
            type="text"
            className="text-input"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 4829 or 12, 348, 905"
          />
          <button className="btn btn-add" onClick={handleAdd}>
            Add
          </button>
        </div>

        {numbers.length > 0 && (
          <div className="chip-list">
            {numbers.map((num, i) => (
              <span className="chip" key={i}>
                {num}
                <button
                  className="chip-remove"
                  onClick={() => handleRemove(i)}
                  aria-label="Remove number"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="action-row">
          <button className="btn btn-primary" onClick={findLargestDigit}>
            Find Largest Digit
          </button>
          <button className="btn btn-clear" onClick={handleClear}>
            Clear All
          </button>
        </div>

        {result !== null && (
          <div className="result">
            {typeof result === "number" ? (
              <>
                <span className="result-label">Largest Digit</span>
                <span className="result-value">{result}</span>
              </>
            ) : (
              <span className="result-empty">{result}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;