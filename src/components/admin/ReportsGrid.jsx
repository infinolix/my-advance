
import React from 'react';

const ReportsGrid = () => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Report Cards */}
      <div className="border rounded-md p-4 hover:bg-gray-50">
        <h3 className="font-medium">Outstanding Loans Report</h3>
        <p className="text-sm text-gray-500 mt-1">
          View all active loans and their repayment status
        </p>
        <button className="mt-4 text-sm text-advance-purple font-medium">
          Generate Report
        </button>
      </div>
      <div className="border rounded-md p-4 hover:bg-gray-50">
        <h3 className="font-medium">Monthly Disbursement Report</h3>
        <p className="text-sm text-gray-500 mt-1">
          Summary of all loans disbursed in a given month
        </p>
        <button className="mt-4 text-sm text-advance-purple font-medium">
          Generate Report
        </button>
      </div>
      <div className="border rounded-md p-4 hover:bg-gray-50">
        <h3 className="font-medium">Employee Loan History</h3>
        <p className="text-sm text-gray-500 mt-1">
          View loan history for specific employees
        </p>
        <button className="mt-4 text-sm text-advance-purple font-medium">
          Generate Report
        </button>
      </div>
      <div className="border rounded-md p-4 hover:bg-gray-50">
        <h3 className="font-medium">Repayment Analysis</h3>
        <p className="text-sm text-gray-500 mt-1">
          Analysis of loan repayments and delinquencies
        </p>
        <button className="mt-4 text-sm text-advance-purple font-medium">
          Generate Report
        </button>
      </div>
    </div>
    <div className="mt-8 p-6 bg-gray-50 rounded-md text-center">
      <p className="text-gray-500">
        Advanced reporting features will be available in the future updates
      </p>
    </div>
  </div>
);

export default ReportsGrid;
