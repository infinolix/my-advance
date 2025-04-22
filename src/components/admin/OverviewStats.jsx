
import React from 'react';

const OverviewStats = ({
  pendingLoans,
  approvedLoans,
  totalOutstanding,
  totalRequested,
  averageLoanAmount,
  totalEmployees
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-sm font-medium text-gray-500">Pending Requests</div>
        <div className="mt-1 text-3xl font-semibold text-gray-900">{pendingLoans.length}</div>
        <div className="mt-1 text-sm text-gray-600">₹{totalRequested.toLocaleString('en-IN')} requested</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-sm font-medium text-gray-500">Active Loans</div>
        <div className="mt-1 text-3xl font-semibold text-gray-900">{approvedLoans.length}</div>
        <div className="mt-1 text-sm text-gray-600">₹{totalOutstanding.toLocaleString('en-IN')} outstanding</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-sm font-medium text-gray-500">Avg. Loan Amount</div>
        <div className="mt-1 text-3xl font-semibold text-gray-900">₹{averageLoanAmount.toLocaleString('en-IN')}</div>
        <div className="mt-1 text-sm text-gray-600">Per application</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-sm font-medium text-gray-500">Total Employees</div>
        <div className="mt-1 text-3xl font-semibold text-gray-900">{totalEmployees}</div>
        <div className="mt-1 text-sm text-gray-600">2 active, 1 inactive</div>
      </div>
    </div>
  );
};

export default OverviewStats;
