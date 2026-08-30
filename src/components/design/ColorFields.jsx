import DotColorField from './DotColorField.jsx';
import HexColorInput from '../HexColorInput.jsx';

export default function ColorFields({ qrOptions, onChange }) {
  function setEyesColorMode(mode) {
    onChange((prev) => ({ ...prev, eyesColorMode: mode }));
  }

  function setCornerSquareColor(hex) {
    onChange((prev) => ({
      ...prev,
      cornersSquareOptions: { ...prev.cornersSquareOptions, color: hex },
    }));
  }

  function setCornerDotColor(hex) {
    onChange((prev) => ({
      ...prev,
      cornersDotOptions: { ...prev.cornersDotOptions, color: hex },
    }));
  }

  function setBackgroundColor(hex) {
    onChange((prev) => ({
      ...prev,
      backgroundOptions: { ...prev.backgroundOptions, color: hex },
    }));
  }

  return (
    <>
      <DotColorField qrOptions={qrOptions} onChange={onChange} />
      <div className="section-divider" />
      <div className="field">
        Eyes color
        <div className="preset-row">
          <button
            type="button"
            className={qrOptions.eyesColorMode === 'same' ? 'preset-button active' : 'preset-button'}
            onClick={() => setEyesColorMode('same')}
          >
            Same as pattern
          </button>
          <button
            type="button"
            className={qrOptions.eyesColorMode === 'custom' ? 'preset-button active' : 'preset-button'}
            onClick={() => setEyesColorMode('custom')}
          >
            Custom
          </button>
        </div>
      </div>
      {qrOptions.eyesColorMode === 'custom' && (
        <>
          <div className="field">
            Outer ring
            <HexColorInput value={qrOptions.cornersSquareOptions.color} onChange={setCornerSquareColor} />
          </div>
          <div className="field">
            Inner dot
            <HexColorInput value={qrOptions.cornersDotOptions.color} onChange={setCornerDotColor} />
          </div>
        </>
      )}
      <div className="section-divider" />
      <div className="field">
        Background color
        <HexColorInput value={qrOptions.backgroundOptions.color} onChange={setBackgroundColor} />
      </div>
    </>
  );
}
