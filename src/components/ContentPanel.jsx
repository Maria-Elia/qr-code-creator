import { useState } from 'react';
import UrlTextForm from './content/UrlTextForm.jsx';
import WifiForm from './content/WifiForm.jsx';
import VCardForm from './content/VCardForm.jsx';
import EmailForm from './content/EmailForm.jsx';

const TABS = [
  { id: 'url', label: 'URL / Text', Form: UrlTextForm },
  { id: 'wifi', label: 'WiFi', Form: WifiForm },
  { id: 'vcard', label: 'vCard', Form: VCardForm },
  { id: 'email', label: 'Email', Form: EmailForm },
];

export default function ContentPanel({ onPayloadChange }) {
  const [activeTab, setActiveTab] = useState('url');
  const ActiveForm = TABS.find((t) => t.id === activeTab).Form;

  return (
    <div className="content-panel">
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
      <ActiveForm onPayloadChange={onPayloadChange} />
    </div>
  );
}
