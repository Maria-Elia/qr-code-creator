import PalettePresets from '../PalettePresets.jsx';
import HexColorInput from '../HexColorInput.jsx';
import SwapIcon from './SwapIcon.jsx';

export default function DotColorField({ qrOptions, onChange }) {
  const gradient = qrOptions.dotsOptions.gradient;
  const isGradient = Boolean(gradient);

  function setMode(mode) {
    if (mode === 'gradient' && !gradient) {
      onChange((prev) => ({
        ...prev,
        dotsOptions: {
          ...prev.dotsOptions,
          gradient: {
            type: 'linear',
            rotation: 0,
            colorStops: [
              { offset: 0, color: prev.dotsOptions.color },
              { offset: 1, color: '#5540a5' },
            ],
          },
        },
      }));
    } else if (mode === 'solid' && gradient) {
      onChange((prev) => ({
        ...prev,
        dotsOptions: {
          ...prev.dotsOptions,
          color: prev.dotsOptions.gradient.colorStops[0].color,
          gradient: null,
        },
      }));
    }
  }

  function setSolidColor(hex) {
    onChange((prev) => ({ ...prev, dotsOptions: { ...prev.dotsOptions, color: hex } }));
  }

  function setStopColor(index, hex) {
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

  function swapStops() {
    onChange((prev) => {
      if (!prev.dotsOptions.gradient) return prev;
      const [a, b] = prev.dotsOptions.gradient.colorStops;
      return {
        ...prev,
        dotsOptions: {
          ...prev.dotsOptions,
          gradient: { ...prev.dotsOptions.gradient, colorStops: [{ ...a, color: b.color }, { ...b, color: a.color }] },
        },
      };
    });
  }

  return (
    <div className="field">
      Dot color
      <div className="preset-row">
        <button
          type="button"
          className={!isGradient ? 'preset-button active' : 'preset-button'}
          onClick={() => setMode('solid')}
        >
          Solid
        </button>
        <button
          type="button"
          className={isGradient ? 'preset-button active' : 'preset-button'}
          onClick={() => setMode('gradient')}
        >
          Gradient
        </button>
      </div>
      {isGradient ? (
        <div className="gradient-editor">
          <div
            className="gradient-preview"
            style={{ background: `linear-gradient(90deg, ${gradient.colorStops[0].color}, ${gradient.colorStops[1].color})` }}
          />
          <div className="gradient-stop">
            <span className="gradient-stop-label">Start</span>
            <PalettePresets onPick={(hex) => setStopColor(0, hex)} />
            <HexColorInput value={gradient.colorStops[0].color} onChange={(hex) => setStopColor(0, hex)} />
          </div>
          <button type="button" className="swap-button" title="Swap start/end colors" onClick={swapStops}>
            <SwapIcon />
            Swap
          </button>
          <div className="gradient-stop">
            <span className="gradient-stop-label">End</span>
            <PalettePresets onPick={(hex) => setStopColor(1, hex)} />
            <HexColorInput value={gradient.colorStops[1].color} onChange={(hex) => setStopColor(1, hex)} />
          </div>
        </div>
      ) : (
        <>
          <PalettePresets onPick={setSolidColor} />
          <HexColorInput value={qrOptions.dotsOptions.color} onChange={setSolidColor} />
        </>
      )}
    </div>
  );
}
