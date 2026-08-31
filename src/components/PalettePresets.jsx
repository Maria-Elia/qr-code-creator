export const BRAND_SWATCHES = [
  { label: 'Teal', hex: '#0f7f88' },
  { label: 'Blue', hex: '#3d5cc4' },
  { label: 'Pink', hex: '#e07fb3' },
  { label: 'Bright pink', hex: '#fc97d1' },
  { label: 'Purple', hex: '#5540a5' },
  { label: 'Ink', hex: '#22343d' },
];

export default function PalettePresets({ onPick, disabled = false }) {
  return (
    <div className="palette-presets">
      {BRAND_SWATCHES.map((swatch) => (
        <button
          key={swatch.hex}
          type="button"
          title={swatch.label}
          className="swatch"
          style={{ backgroundColor: swatch.hex }}
          onClick={() => onPick(swatch.hex)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
