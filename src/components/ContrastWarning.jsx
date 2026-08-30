import { checkQrContrast } from "../lib/contrastChecker.js";

export default function ContrastWarning({ qrOptions }) {
  const result = checkQrContrast(qrOptions);

  if (result.skipped) {
    return (
      <p className="field-error field-error-caution">
        Transparent background, make sure it still reads clearly on the surface you place it on.
      </p>
    );
  }

  if (result.level === "good") {
    return null;
  }

  const ratioLabel = result.ratio.toFixed(1);

  if (result.level === "poor") {
    return (
      <p className="field-error">
        Very low contrast, this QR code likely won't scan. Use a much darker or lighter color.
      </p>
    );
  }

  return (
    <p className="field-error field-error-caution">
      Low contrast, this QR code may not scan reliably on some phones.
    </p>
  );
}
