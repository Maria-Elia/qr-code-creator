import PalettePresets from './PalettePresets.jsx';

const DOT_TYPES = ['square', 'rounded', 'dots', 'classy', 'extra-rounded'];
const CORNER_SQUARE_TYPES = ['square', 'dot', 'extra-rounded'];
const CORNER_DOT_TYPES = ['square', 'dot'];

export default function DesignPanel({ qrOptions, onChange }) {
  function setDotType(type) {
    onChange((prev) => ({
      ...prev,
      dotsOptions: { ...prev.dotsOptions, type },
    }));
  }

  function setCornerSquareType(type) {
    onChange((prev) => ({
      ...prev,
      cornersSquareOptions: { ...prev.cornersSquareOptions, type },
    }));
  }

  function setCornerDotType(type) {
    onChange((prev) => ({
      ...prev,
      cornersDotOptions: { ...prev.cornersDotOptions, type },
    }));
  }

  function setDotColor(hex) {
    onChange((prev) => ({
      ...prev,
      dotsOptions: { ...prev.dotsOptions, color: hex, gradient: null },
    }));
  }

  function setBackgroundColor(hex) {
    onChange((prev) => ({
      ...prev,
      backgroundOptions: { ...prev.backgroundOptions, color: hex },
    }));
  }

  function toggleGradient(enabled) {
    onChange((prev) => ({
      ...prev,
      dotsOptions: {
        ...prev.dotsOptions,
        gradient: enabled
          ? {
              type: 'linear',
              rotation: 0,
              colorStops: [
                { offset: 0, color: prev.dotsOptions.color },
                { offset: 1, color: '#5540a5' },
              ],
            }
          : null,
      },
    }));
  }

  function setGradientStop(index, hex) {
    onChange((prev) => {
      if (!prev.dotsOptions.gradient) return prev;
      const colorStops = prev.dotsOptions.gradient.colorStops.map((stop, i) =>
        i === index ? { ...stop, color: hex } : stop
      );
      return {
        ...prev,
        dotsOptions: { ...prev.dotsOptions, gradient: { ...prev.dotsOptions.gradient, colorStops } },
      };
    });
  }

  return (
    <div className="design-panel">
      <label className="field">
        Dot style
        <select value={qrOptions.dotsOptions.type} onChange={(e) => setDotType(e.target.value)}>
          {DOT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>
      <label className="field">
        Corner square style
        <select
          value={qrOptions.cornersSquareOptions.type}
          onChange={(e) => setCornerSquareType(e.target.value)}
        >
          {CORNER_SQUARE_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>
      <label className="field">
        Corner dot style
        <select
          value={qrOptions.cornersDotOptions.type}
          onChange={(e) => setCornerDotType(e.target.value)}
        >
          {CORNER_DOT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>
      <div className="field">
        Dot color presets
        <PalettePresets onPick={setDotColor} />
      </div>
      <label className="field">
        Dot color (custom)
        <input
          type="color"
          value={qrOptions.dotsOptions.gradient ? qrOptions.dotsOptions.gradient.colorStops[0].color : qrOptions.dotsOptions.color}
          onChange={(e) =>
            qrOptions.dotsOptions.gradient
              ? setGradientStop(0, e.target.value)
              : setDotColor(e.target.value)
          }
        />
      </label>
      <label className="field checkbox-field">
        <input
          type="checkbox"
          checked={Boolean(qrOptions.dotsOptions.gradient)}
          onChange={(e) => toggleGradient(e.target.checked)}
        />
        Use gradient
      </label>
      {qrOptions.dotsOptions.gradient && (
        <label className="field">
          Gradient end color
          <input
            type="color"
            value={qrOptions.dotsOptions.gradient.colorStops[1].color}
            onChange={(e) => setGradientStop(1, e.target.value)}
          />
        </label>
      )}
      <label className="field">
        Background color
        <input
          type="color"
          value={qrOptions.backgroundOptions.color}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </label>
    </div>
  );
}
