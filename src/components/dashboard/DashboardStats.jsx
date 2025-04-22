
import React from 'react';

const DashboardStats = ({ pendingLoans, activeLoans, totalOutstanding, formatINRCurrency }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
        <p className="text-2xl font-bold">{pendingLoans.length}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-500">Active Loans</h3>
        <p className="text-2xl font-bold">{activeLoans.length}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-500">Outstanding Balance</h3>
        <p className="text-2xl font-bold">{formatINRCurrency(totalOutstanding)}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
