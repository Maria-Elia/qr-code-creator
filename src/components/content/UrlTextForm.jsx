import { useState } from 'react';
import { buildUrlTextPayload } from '../../lib/payloadBuilders.js';

export default function UrlTextForm({ onPayloadChange }) {
  const [value, setValue] = useState('https://example.com');

  function handleChange(e) {
    const next = e.target.value;
    setValue(next);
    onPayloadChange(buildUrlTextPayload(next));
  }

  return (
    <label className="field">
      URL or text
      <input type="text" value={value} onChange={handleChange} />
    </label>
  );
}
