import { useState, useEffect } from 'react';
import { buildWifiPayload } from '../../lib/payloadBuilders.js';

export default function WifiForm({ onPayloadChange }) {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');

  useEffect(() => {
    onPayloadChange(buildWifiPayload({ ssid, password, encryption }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ssid, password, encryption]);

  return (
    <div className="field-group">
      <label className="field">
        Network name (SSID)
        <input type="text" value={ssid} onChange={(e) => setSsid(e.target.value)} />
      </label>
      <label className="field">
        Password
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label className="field">
        Encryption
        <select value={encryption} onChange={(e) => setEncryption(e.target.value)}>
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">None</option>
        </select>
      </label>
    </div>
  );
}
