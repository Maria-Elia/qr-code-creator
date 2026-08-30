import { useState } from 'react';
import PatternEyesFields from './design/PatternEyesFields.jsx';
import ColorFields from './design/ColorFields.jsx';
import LogoField from './design/LogoField.jsx';

const TABS = [
  { id: 'shape', label: 'Shape', Fields: PatternEyesFields },
  { id: 'colors', label: 'Colors', Fields: ColorFields },
  { id: 'logo', label: 'Logo', Fields: LogoField },
];

export default function DesignPanel({ qrOptions, onChange }) {
  const [activeTab, setActiveTab] = useState('shape');
  const ActiveFields = TABS.find((tab) => tab.id === activeTab).Fields;

  return (
    <div className="design-panel">
      <div className="tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <ActiveFields qrOptions={qrOptions} onChange={onChange} />
    </div>
  );
}
