import { useState } from 'react';
import { createDefaultQrOptions } from './lib/defaultQrOptions.js';
import QrPreview from './components/QrPreview.jsx';

export default function App() {
  const [qrOptions, setQrOptions] = useState(createDefaultQrOptions);

  return (
    <div className="app">
      <h1>QR Code Generator</h1>
      <QrPreview options={qrOptions} />
    </div>
  );
}
