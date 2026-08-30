import { useState } from 'react';
import { readImageFile } from '../../lib/readImageFile.js';

export default function LogoField({ qrOptions, onChange }) {
  const [logoError, setLogoError] = useState('');

  async function handleLogoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readImageFile(file);
      setLogoError('');
      onChange((prev) => ({ ...prev, image: dataUrl }));
    } catch (err) {
      setLogoError(err.message);
    }
  }

  function clearLogo() {
    setLogoError('');
    onChange((prev) => ({ ...prev, image: null }));
  }

  return (
    <>
      <label className="field">
        Logo (optional)
        <input type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" onChange={handleLogoChange} />
      </label>
      {logoError && <p className="field-error">{logoError}</p>}
      {qrOptions.image && (
        <button type="button" className="secondary-button" onClick={clearLogo}>
          Remove logo
        </button>
      )}
    </>
  );
}
