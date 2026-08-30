import { useState, useRef } from 'react';
import { createDefaultQrOptions } from './lib/defaultQrOptions.js';
import QrPreview from './components/QrPreview.jsx';
import ContentPanel from './components/ContentPanel.jsx';
import DesignPanel from './components/DesignPanel.jsx';
import ExportButton from './components/ExportButton.jsx';

export default function App() {
  const [qrOptions, setQrOptions] = useState(createDefaultQrOptions);
  const hasContent = Boolean(qrOptions.data && qrOptions.data.trim());
  const qrPreviewRef = useRef(null);

  function handlePayloadChange(payload) {
    setQrOptions((prev) => ({ ...prev, data: payload }));
  }

  function handleExport() {
    qrPreviewRef.current?.download();
  }

  return (
    <div className="app">
      <h1>QR Code Generator</h1>
      <ContentPanel onPayloadChange={handlePayloadChange} />
      <DesignPanel qrOptions={qrOptions} onChange={setQrOptions} />
      {!hasContent && <p className="field-error">Enter some content above to generate a QR code.</p>}
      <QrPreview ref={qrPreviewRef} options={qrOptions} />
      <ExportButton onExport={handleExport} disabled={!hasContent} />
    </div>
  );
}
