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
    </div>
  );
}
