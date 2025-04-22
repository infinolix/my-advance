
import React from 'react';
import AdminLoanTable from '../AdminLoanTable';

const RecentLoanApplications = ({ loans, updateLoanStatus, onViewAll }) => (
  <div className="mt-8">
    <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Loan Applications</h2>
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <AdminLoanTable
        loans={loans.slice(0, 5)}
        updateLoanStatus={updateLoanStatus}
      />
    </div>
    {loans.length > 5 && (
      <div className="mt-4 text-right">
        <button
          onClick={onViewAll}
          className="text-sm text-advance-purple hover:text-advance-dark-purple font-medium"
        >
          View All Applications →
        </button>
      </div>
    )}
  </div>
);
export default RecentLoanApplications;
