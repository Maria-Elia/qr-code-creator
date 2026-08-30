import { useState, useEffect } from 'react';
import { buildEmailPayload } from '../../lib/payloadBuilders.js';

export default function EmailForm({ onPayloadChange }) {
  const [address, setAddress] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    onPayloadChange(buildEmailPayload({ address, subject, body }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, subject, body]);

  return (
    <div className="field-group">
      <label className="field">
        Email address
        <input type="email" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <label className="field">
        Subject
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </label>
      <label className="field">
        Body
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      </label>
    </div>
  );
}
