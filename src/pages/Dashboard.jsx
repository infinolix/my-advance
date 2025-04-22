
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoanApplicationForm from '../components/LoanApplicationForm';
import LoanHistoryTable from '../components/LoanHistoryTable';
import { useAuth } from '../context/AuthContext';

// Mock data for active loans and loan history
const initialLoans = [
  {
    id: 'loan-001',
    employeeId: '1',
    employeeName: 'John Doe',
    amount: 2000,
    duration: 6,
    purpose: 'Emergency medical expenses',
    status: 'approved',
    applicationDate: '2025-03-20T12:00:00Z',
    monthlyPayment: 333.33,
  },
  {
    id: 'loan-002',
    employeeId: '1',
    employeeName: 'John Doe',
    amount: 1000,
    duration: 2,
    purpose: 'Car repair',
    status: 'completed',
    applicationDate: '2025-02-15T12:00:00Z',
    monthlyPayment: 500,
  },
];

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [loans, setLoans] = useState(initialLoans);
  const [activeTab, setActiveTab] = useState('overview');

  // If not logged in, redirect to login
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }
  
  // If user is admin, redirect to admin dashboard
  if (user?.role === 'admin') {
    return <Navigate to="/admin" />;
  }

  const handleLoanApplication = (newLoan) => {
    setLoans([newLoan, ...loans]);
  };

  // Filter loans by status
  const pendingLoans = loans.filter((loan) => loan.status === 'pending');
  const activeLoans = loans.filter((loan) => loan.status === 'approved');
  const completedLoans = loans.filter((loan) => loan.status === 'completed');
  
  // Calculate total outstanding
  const totalOutstanding = activeLoans.reduce((sum, loan) => sum + loan.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
        
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {/* User profile summary */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-advance-light-purple flex items-center justify-center">
                    <span className="text-advance-dark-purple font-medium text-lg">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{user?.name}</h2>
                    <p className="text-gray-500 text-sm">Employee ID: {user?.id}</p>
                  </div>
                </div>
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monthly Salary</span>
                    <span className="font-medium">${user?.salary || 0}</span>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
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
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <>
                {/* Summary Cards */}
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
                    <p className="text-2xl font-bold">${totalOutstanding.toFixed(2)}</p>
                  </div>
                </div>
                
                {/* Active Loans */}
                {activeLoans.length > 0 && (
                  <LoanHistoryTable loans={activeLoans} title="Active Loans" />
                )}
                
                {/* Pending Loans */}
                {pendingLoans.length > 0 && (
                  <div className="mt-6">
                    <LoanHistoryTable loans={pendingLoans} title="Pending Requests" />
                  </div>
                )}
                
                {/* Quick Apply Button */}
                {activeLoans.length === 0 && pendingLoans.length === 0 && (
                  <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold mb-3">Need a Salary Advance?</h2>
                    <p className="text-gray-500 mb-4">
                      You currently have no active or pending loan requests
                    </p>
                    <button
                      onClick={() => setActiveTab('new-application')}
                      className="bg-advance-purple text-white py-2 px-6 rounded-md hover:bg-advance-dark-purple transition duration-200"
                    >
                      Apply Now
                    </button>
                  </div>
                )}
              </>
            )}
            
            {activeTab === 'new-application' && (
              <LoanApplicationForm onSubmit={handleLoanApplication} />
            )}
            
            {activeTab === 'loan-history' && (
              <LoanHistoryTable loans={loans} title="Complete Loan History" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
