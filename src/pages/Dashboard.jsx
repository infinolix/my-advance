
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoanApplicationForm from '../components/LoanApplicationForm';
import LoanHistoryTable from '../components/LoanHistoryTable';
import UserProfileCard from '../components/dashboard/UserProfileCard';
import DashboardNavigation from '../components/dashboard/DashboardNavigation';
import DashboardStats from '../components/dashboard/DashboardStats';
import QuickApplyCard from '../components/dashboard/QuickApplyCard';
import { useAuth } from '../context/AuthContext';
import { formatINRCurrency } from '../utils/formatters';

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

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }
  
  if (user?.role === 'admin') {
    return <Navigate to="/admin" />;
  }

  const handleLoanApplication = (newLoan) => {
    setLoans([newLoan, ...loans]);
  };

  const pendingLoans = loans.filter((loan) => loan.status === 'pending');
  const activeLoans = loans.filter((loan) => loan.status === 'approved');
  const completedLoans = loans.filter((loan) => loan.status === 'completed');
  
  const totalOutstanding = activeLoans.reduce((sum, loan) => sum + loan.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
        
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <UserProfileCard user={user} />
              <DashboardNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <>
                <DashboardStats 
                  pendingLoans={pendingLoans} 
                  activeLoans={activeLoans} 
                  totalOutstanding={totalOutstanding}
                  formatINRCurrency={formatINRCurrency}
                />
                
                {activeLoans.length > 0 && (
                  <LoanHistoryTable loans={activeLoans} title="Active Loans" />
                )}
                
                {pendingLoans.length > 0 && (
                  <div className="mt-6">
                    <LoanHistoryTable loans={pendingLoans} title="Pending Requests" />
                  </div>
                )}
                
                {activeLoans.length === 0 && pendingLoans.length === 0 && (
                  <QuickApplyCard setActiveTab={setActiveTab} />
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
