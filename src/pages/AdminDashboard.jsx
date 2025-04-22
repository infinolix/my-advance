import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AdminLoanTable from '../components/AdminLoanTable';
import EmployeeManagement from '../components/EmployeeManagement';
import { useAuth } from '../context/AuthContext';

import OverviewStats from '../components/admin/OverviewStats';
import RecentLoanApplications from '../components/admin/RecentLoanApplications';
import AdminTabs from '../components/admin/AdminTabs';
import ReportsGrid from '../components/admin/ReportsGrid';

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

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }
  if (user && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

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

  const pendingLoans = loans.filter(loan => loan.status === 'pending');
  const approvedLoans = loans.filter(loan => loan.status === 'approved');
  const totalOutstanding = approvedLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalRequested = pendingLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const averageLoanAmount = loans.length > 0
    ? loans.reduce((sum, loan) => sum + loan.amount, 0) / loans.length
    : 0;
  const totalEmployees = 3;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="py-6">
          {activeTab === 'overview' && (
            <div>
              <OverviewStats 
                pendingLoans={pendingLoans}
                approvedLoans={approvedLoans}
                totalOutstanding={totalOutstanding}
                totalRequested={totalRequested}
                averageLoanAmount={averageLoanAmount}
                totalEmployees={totalEmployees}
              />
              <RecentLoanApplications
                loans={loans}
                updateLoanStatus={updateLoanStatus}
                onViewAll={() => setActiveTab('loans')}
              />
            </div>
          )}
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
          {activeTab === 'reports' && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Reports</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Generate and view system reports
                </p>
              </div>
              <div className="p-6">
                <ReportsGrid />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
