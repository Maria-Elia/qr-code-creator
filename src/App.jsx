import { useState, useRef } from 'react';
import { createDefaultQrOptions } from './lib/defaultQrOptions.js';
import FramePreview from './components/FramePreview.jsx';
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
      <div className="workspace">
        <div className="controls-column">
          <ContentPanel onPayloadChange={handlePayloadChange} />
          <DesignPanel qrOptions={qrOptions} onChange={setQrOptions} />
        </div>
        <div className="preview-column">
          {!hasContent && <p className="field-error">Enter some content above to generate a QR code.</p>}
          <FramePreview ref={qrPreviewRef} options={qrOptions} />
          <ExportButton onExport={handleExport} disabled={!hasContent} />
        </div>
      </div>
    </div>
  );
}
