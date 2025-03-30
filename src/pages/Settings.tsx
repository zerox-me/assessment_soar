import React, { useState } from 'react';
import EditProfile from '../components/settings/EditProfile';
import Preferences from '../components/settings/Preferences';
import Security from '../components/settings/Security';

const Settings: React.FC = () => {
  const tabs = [
    { id: 'edit-profile', label: 'Edit Profile', component: EditProfile },
    { id: 'preferences', label: 'Preferences', component: Preferences },
    { id: 'security', label: 'Security', component: Security },
  ];

  const [activeTab, setActiveTab] = useState('edit-profile');
  const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);
  const [hoveredIndex, setHoveredIndex] = useState<number>(activeTabIndex);
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="max-w-7xl bg-white rounded-3xl p-8">
      {/* Tabs */}
      <div className="mb-10 border-b border-label-icon relative">
        <nav className="-mb-px flex space-x-8 mb-2">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(activeTabIndex)}
              className={`
                whitespace-nowrap px-1 font-medium text-base transition-all duration-300 w-24
                ${activeTab === tab.id
                  ? 'text-label-primary'
                  : 'text-label-secondary hover:text-gray-700'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        {/* Black line indicator */}
        <div className={`absolute bottom-0 h-[6px] w-24 bg-label-primary transition-all duration-300 ease-in-out rounded-t-lg`}
          style={{left: `${(hoveredIndex ?? 0) * 128}px`}}
        />
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg p-6">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default Settings; 