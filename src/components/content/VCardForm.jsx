import { useState, useEffect } from 'react';
import { buildVCardPayload } from '../../lib/payloadBuilders.js';

export default function VCardForm({ onPayloadChange }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');

  useEffect(() => {
    onPayloadChange(buildVCardPayload({ name, phone, email, org }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, phone, email, org]);

  return (
    <div className="field-group">
      <label className="field">
        Full name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="field">
        Phone
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>
      <label className="field">
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="field">
        Organization
        <input type="text" value={org} onChange={(e) => setOrg(e.target.value)} />
      </label>
    </div>
  );
}
