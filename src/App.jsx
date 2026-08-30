import { useState } from 'react';
import { createDefaultQrOptions } from './lib/defaultQrOptions.js';
import QrPreview from './components/QrPreview.jsx';
import ContentPanel from './components/ContentPanel.jsx';
import DesignPanel from './components/DesignPanel.jsx';

export default function App() {
  const [qrOptions, setQrOptions] = useState(createDefaultQrOptions);
  const hasContent = Boolean(qrOptions.data && qrOptions.data.trim());

  function handlePayloadChange(payload) {
    setQrOptions((prev) => ({ ...prev, data: payload }));
  }

  return (
    <div className="app">
      <h1>QR Code Generator</h1>
      <ContentPanel onPayloadChange={handlePayloadChange} />
      <DesignPanel qrOptions={qrOptions} onChange={setQrOptions} />
      {!hasContent && <p className="field-error">Enter some content above to generate a QR code.</p>}
      <QrPreview options={qrOptions} />
    </div>
  );
}
