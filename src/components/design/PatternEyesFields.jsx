import DotShapeIcon from './DotShapeIcon.jsx';
import EyeShapeIcon from './EyeShapeIcon.jsx';

const PATTERN_PRESETS = [
  { label: 'Classic', dotType: 'square' },
  { label: 'Smooth', dotType: 'rounded' },
  { label: 'Dots', dotType: 'dots' },
  { label: 'Sharp', dotType: 'classy' },
  { label: 'Elegant', dotType: 'classy-rounded' },
  { label: 'Bubble', dotType: 'extra-rounded' },
];

const EYE_PRESETS = [
  { label: 'Classic', cornerSquareType: 'square', cornerDotType: 'square' },
  { label: 'Circle', cornerSquareType: 'dot', cornerDotType: 'dot' },
  { label: 'Bubble', cornerSquareType: 'extra-rounded', cornerDotType: 'dot' },
  { label: 'Smooth', cornerSquareType: 'extra-rounded', cornerDotType: 'square' },
  { label: 'Elegant', cornerSquareType: 'square', cornerDotType: 'dot' },
  { label: 'Dotted', cornerSquareType: 'dot', cornerDotType: 'square' },
];

export default function PatternEyesFields({ qrOptions, onChange }) {
  function applyPattern(dotType) {
    onChange((prev) => ({ ...prev, dotsOptions: { ...prev.dotsOptions, type: dotType } }));
  }

  function applyEyes(cornerSquareType, cornerDotType) {
    onChange((prev) => ({
      ...prev,
      cornersSquareOptions: { ...prev.cornersSquareOptions, type: cornerSquareType },
      cornersDotOptions: { ...prev.cornersDotOptions, type: cornerDotType },
    }));
  }

  return (
    <>
      <div className="field">
        Pattern
        <div className="preset-row preset-row-icons">
          {PATTERN_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              title={preset.label}
              aria-label={preset.label}
              className={
                qrOptions.dotsOptions.type === preset.dotType ? 'preset-button icon-button active' : 'preset-button icon-button'
              }
              onClick={() => applyPattern(preset.dotType)}
            >
              <DotShapeIcon type={preset.dotType} />
            </button>
          ))}
        </div>
      </div>
      <div className="field">
        Eyes
        <div className="preset-row preset-row-icons">
          {EYE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              title={preset.label}
              aria-label={preset.label}
              className={
                qrOptions.cornersSquareOptions.type === preset.cornerSquareType &&
                qrOptions.cornersDotOptions.type === preset.cornerDotType
                  ? 'preset-button icon-button active'
                  : 'preset-button icon-button'
              }
              onClick={() => applyEyes(preset.cornerSquareType, preset.cornerDotType)}
            >
              <EyeShapeIcon cornerSquareType={preset.cornerSquareType} cornerDotType={preset.cornerDotType} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
