
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AdminLoanTable from '../components/AdminLoanTable';
import EmployeeManagement from '../components/EmployeeManagement';
import { useAuth } from '../context/AuthContext';

// Mock data for loans
const initialLoans = [
  {
    id: 'loan-001',
    employeeId: '1',
    employeeName: 'John Doe',
    amount: 2000,
    duration: 6,
    purpose: 'Emergency medical expenses',
    status: 'pending',
    applicationDate: '2025-04-15T12:00:00Z',
    monthlyPayment: 333.33,
  },
  {
    id: 'loan-002',
    employeeId: '1',
    employeeName: 'John Doe',
    amount: 1000,
    duration: 2,
    purpose: 'Car repair',
    status: 'approved',
    applicationDate: '2025-03-10T12:00:00Z',
    monthlyPayment: 500,
  },
  {
    id: 'loan-003',
    employeeId: '2',
    employeeName: 'Jane Smith',
    amount: 3000,
    duration: 3,
    purpose: 'Home renovation',
    status: 'completed',
    applicationDate: '2025-02-01T12:00:00Z',
    monthlyPayment: 1000,
  },
  {
    id: 'loan-004',
    employeeId: '2',
    employeeName: 'Jane Smith',
    amount: 1500,
    duration: 3,
    purpose: 'Education expenses',
    status: 'pending',
    applicationDate: '2025-04-18T12:00:00Z',
    monthlyPayment: 500,
  },
];

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const [loans, setLoans] = useState(initialLoans);
  const [activeTab, setActiveTab] = useState('overview');

  // If not logged in, redirect to login
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  // If user is not admin, redirect to employee dashboard
  if (user && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  // Update loan status
  const updateLoanStatus = (id, status, reason = '') => {
    setLoans(loans.map(loan => {
      if (loan.id === id) {
        return {
          ...loan,
          status,
          rejectionReason: status === 'rejected' ? reason : undefined
        };
      }
      return loan;
    }));
  };

  // Calculate statistics
  const pendingLoans = loans.filter(loan => loan.status === 'pending');
  const approvedLoans = loans.filter(loan => loan.status === 'approved');
  const totalOutstanding = approvedLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalRequested = pendingLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const averageLoanAmount = loans.length > 0
    ? loans.reduce((sum, loan) => sum + loan.amount, 0) / loans.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        
        {/* Tab Navigation */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-advance-purple text-advance-purple'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('loans')}
              className={`${
                activeTab === 'loans'
                  ? 'border-advance-purple text-advance-purple'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Loan Applications
            </button>
            <button
              onClick={() => setActiveTab('employees')}
              className={`${
                activeTab === 'employees'
                  ? 'border-advance-purple text-advance-purple'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Employee Management
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`${
                activeTab === 'reports'
                  ? 'border-advance-purple text-advance-purple'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Reports
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-sm font-medium text-gray-500">Pending Requests</div>
                  <div className="mt-1 text-3xl font-semibold text-gray-900">{pendingLoans.length}</div>
                  <div className="mt-1 text-sm text-gray-600">${totalRequested.toFixed(2)} requested</div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-sm font-medium text-gray-500">Active Loans</div>
                  <div className="mt-1 text-3xl font-semibold text-gray-900">{approvedLoans.length}</div>
                  <div className="mt-1 text-sm text-gray-600">${totalOutstanding.toFixed(2)} outstanding</div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-sm font-medium text-gray-500">Avg. Loan Amount</div>
                  <div className="mt-1 text-3xl font-semibold text-gray-900">${averageLoanAmount.toFixed(2)}</div>
                  <div className="mt-1 text-sm text-gray-600">Per application</div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-sm font-medium text-gray-500">Total Employees</div>
                  <div className="mt-1 text-3xl font-semibold text-gray-900">3</div>
                  <div className="mt-1 text-sm text-gray-600">2 active, 1 inactive</div>
                </div>
              </div>
              
              {/* Recent Loan Applications */}
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
                      onClick={() => setActiveTab('loans')}
                      className="text-sm text-advance-purple hover:text-advance-dark-purple font-medium"
                    >
                      View All Applications →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Loan Applications Tab */}
          {activeTab === 'loans' && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">All Loan Applications</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Review and manage all salary advance requests
                </p>
              </div>
              <div className="p-6">
                <AdminLoanTable 
                  loans={loans}
                  updateLoanStatus={updateLoanStatus}
                />
              </div>
            </div>
          )}
          
          {/* Employee Management Tab */}
          {activeTab === 'employees' && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Employee Management</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Add, edit, and manage employee information
                </p>
              </div>
              <div className="p-6">
                <EmployeeManagement />
              </div>
            </div>
          )}
          
          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Reports</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Generate and view system reports
                </p>
              </div>
              
              <div className="p-6">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
