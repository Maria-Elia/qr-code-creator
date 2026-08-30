export default function ExportButton({ onExport, disabled }) {
  return (
    <button type="button" className="primary-button" onClick={onExport} disabled={disabled}>
      Download PNG
    </button>
  );
}
