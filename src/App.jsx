import { useState } from 'react';
import { createDefaultQrOptions } from './lib/defaultQrOptions.js';
import QrPreview from './components/QrPreview.jsx';
import ContentPanel from './components/ContentPanel.jsx';

export default function App() {
  const [qrOptions, setQrOptions] = useState(createDefaultQrOptions);

  function handlePayloadChange(payload) {
    setQrOptions((prev) => ({ ...prev, data: payload }));
  }

  return (
    <div className="app">
      <h1>QR Code Generator</h1>
      <ContentPanel onPayloadChange={handlePayloadChange} />
      <QrPreview options={qrOptions} />
    </div>
  );
}
