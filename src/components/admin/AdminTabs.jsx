
import React from 'react';

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'loans', label: 'Loan Applications' },
  { key: 'employees', label: 'Employee Management' },
  { key: 'reports', label: 'Reports' },
];

const AdminTabs = ({ activeTab, setActiveTab }) => (
  <div className="mt-6 border-b border-gray-200">
    <nav className="-mb-px flex space-x-8">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`${
            activeTab === tab.key
              ? 'border-advance-purple text-advance-purple'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  </div>
);

export default AdminTabs;
