
import React from 'react';

const DashboardNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <nav>
        <ul>
          <li>
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeTab === 'overview'
                  ? 'bg-advance-light-purple text-advance-dark-purple font-medium'
                  : 'hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('new-application')}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeTab === 'new-application'
                  ? 'bg-advance-light-purple text-advance-dark-purple font-medium'
                  : 'hover:bg-gray-100'
              }`}
            >
              New Loan Application
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('loan-history')}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeTab === 'loan-history'
                  ? 'bg-advance-light-purple text-advance-dark-purple font-medium'
                  : 'hover:bg-gray-100'
              }`}
            >
              Loan History
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardNavigation;
