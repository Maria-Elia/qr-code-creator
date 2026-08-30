import { useState, useEffect } from 'react';

const HEX_PATTERN = /^#([0-9A-Fa-f]{6})$/;

export default function HexColorInput({ value, onChange, disabled = false }) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  function handleTextChange(e) {
    const next = e.target.value;
    setText(next);
    if (HEX_PATTERN.test(next)) {
      onChange(next);
    }
  }

  function handlePickerChange(e) {
    setText(e.target.value);
    onChange(e.target.value);
  }

  return (
    <span className="hex-color-input">
      <input
        type="text"
        className="hex-input"
        value={text}
        onChange={handleTextChange}
        placeholder="#000000"
        spellCheck={false}
        disabled={disabled}
      />
      <input
        type="color"
        className="color-swatch-input"
        value={value}
        onChange={handlePickerChange}
        disabled={disabled}
      />
    </span>
  );
}
