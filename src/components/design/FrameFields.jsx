import HexColorInput from '../HexColorInput.jsx';
import PalettePresets from '../PalettePresets.jsx';
import FrameShapeIcon from './FrameShapeIcon.jsx';

const FRAME_STYLES = [
  { value: 'none', label: 'No frame' },
  { value: 'border', label: 'Border' },
  { value: 'corner-marks', label: 'Corner marks' },
  { value: 'circle-viewfinder', label: 'Circle viewfinder' },
  { value: 'text-only', label: 'Text only' },
  { value: 'bottom-bar', label: 'Bottom bar' },
  { value: 'top-bar', label: 'Top bar' },
  { value: 'pill', label: 'Pill label' },
  { value: 'ribbon-bottom', label: 'Ribbon' },
  { value: 'circle-badge', label: 'Circle badge' },
  { value: 'circle-band', label: 'Circle band' },
];

const FRAME_FONTS = ['Arial', 'Times New Roman', 'Courier New', 'Helvetica', 'Georgia'];

const NO_TEXT_STYLES = new Set(['none', 'border']);
const NO_FILL_STYLES = new Set(['none', 'border', 'corner-marks', 'circle-viewfinder', 'text-only']);
const NO_BORDER_STYLES = new Set(['none', 'circle-badge', 'circle-band', 'text-only']);
const MONOCHROME_TEXT_STYLES = new Set(['corner-marks', 'circle-viewfinder']);
const TEXT_COLOR_FIELD = {
  'text-only': 'plainTextColor',
  'circle-band': 'bandTextColor',
};

export default function FrameFields({ qrOptions, onChange }) {
  const { frame } = qrOptions;

  function setFrameField(field, value) {
    onChange((prev) => ({ ...prev, frame: { ...prev.frame, [field]: value } }));
  }

  const borderDisabled = NO_BORDER_STYLES.has(frame.style);
  const fillDisabled = NO_FILL_STYLES.has(frame.style);
  const textDisabled = NO_TEXT_STYLES.has(frame.style);
  const textColorDisabled = textDisabled || MONOCHROME_TEXT_STYLES.has(frame.style);
  const textColorField = TEXT_COLOR_FIELD[frame.style] || 'textColor';

  return (
    <>
      <div className="field">
        Frame
        <div className="preset-row preset-row-icons">
          {FRAME_STYLES.map((style) => (
            <button
              key={style.value}
              type="button"
              title={style.label}
              aria-label={style.label}
              className={
                frame.style === style.value ? 'preset-button icon-button active' : 'preset-button icon-button'
              }
              onClick={() => setFrameField('style', style.value)}
            >
              <FrameShapeIcon style={style.value} />
            </button>
          ))}
        </div>
      </div>

      <div className={borderDisabled ? 'field field-disabled' : 'field'}>
        Border color
        <div className="color-row">
          <PalettePresets onPick={(hex) => setFrameField('borderColor', hex)} disabled={borderDisabled} />
          <HexColorInput
            value={frame.borderColor}
            onChange={(hex) => setFrameField('borderColor', hex)}
            disabled={borderDisabled}
          />
        </div>
      </div>

      <div className={fillDisabled ? 'field field-disabled' : 'field'}>
        Fill color
        <div className="color-row">
          <PalettePresets onPick={(hex) => setFrameField('fillColor', hex)} disabled={fillDisabled} />
          <HexColorInput
            value={frame.fillColor}
            onChange={(hex) => setFrameField('fillColor', hex)}
            disabled={fillDisabled}
          />
        </div>
      </div>

      <label className={textDisabled ? 'field field-disabled' : 'field'}>
        Frame text (max 15 characters)
        <input
          type="text"
          maxLength={15}
          value={frame.text}
          onChange={(e) => setFrameField('text', e.target.value)}
          disabled={textDisabled}
        />
      </label>

      <label className={textDisabled ? 'field field-disabled' : 'field'}>
        Frame font
        <select
          value={frame.font}
          onChange={(e) => setFrameField('font', e.target.value)}
          disabled={textDisabled}
        >
          {FRAME_FONTS.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </label>

      <div className={textColorDisabled ? 'field field-disabled' : 'field'}>
        Text color
        <div className="color-row">
          <PalettePresets onPick={(hex) => setFrameField(textColorField, hex)} disabled={textColorDisabled} />
          <HexColorInput
            value={frame[textColorField]}
            onChange={(hex) => setFrameField(textColorField, hex)}
            disabled={textColorDisabled}
          />
        </div>
      </div>
    </>
  );
}
