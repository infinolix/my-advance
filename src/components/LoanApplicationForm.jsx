
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const LoanApplicationForm = ({ onSubmit }) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState(1);
  const [purpose, setPurpose] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate max eligible amount (50% of monthly salary)
  const maxEligibleAmount = user?.salary ? user.salary * 0.5 : 0;
  
  // Calculate estimated monthly payment (simple calculation)
  const estimatedPayment = amount ? parseFloat(amount) / duration : 0;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid loan amount');
      setIsLoading(false);
      return;
    }
    
    if (parseFloat(amount) > maxEligibleAmount) {
      toast.error(`Loan amount cannot exceed your maximum eligible amount of $${maxEligibleAmount}`);
      setIsLoading(false);
      return;
    }
    
    if (!purpose.trim()) {
      toast.error('Please provide a purpose for the loan');
      setIsLoading(false);
      return;
    }
    
    // Create loan application object
    const loanApplication = {
      id: Date.now().toString(),
      employeeId: user.id,
      employeeName: user.name,
      amount: parseFloat(amount),
      duration,
      purpose,
      status: 'pending',
      applicationDate: new Date().toISOString(),
      monthlyPayment: estimatedPayment,
    };
    
    // Call parent's onSubmit function
    onSubmit(loanApplication);
    
    // Reset form
    setAmount('');
    setDuration(1);
    setPurpose('');
    setIsLoading(false);
    
    toast.success('Loan application submitted successfully!');
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Apply for Salary Advance</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-md">
        <h3 className="font-medium text-blue-800">Loan Eligibility</h3>
        <p className="text-sm text-blue-600 mt-1">
          Based on your monthly salary (${user?.salary || 0}), you are eligible for an advance up to:
        </p>
        <p className="text-2xl font-bold text-blue-800 mt-2">
          ${maxEligibleAmount.toFixed(2)}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Loan Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="100"
            max={maxEligibleAmount}
            step="100"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-advance-purple focus:ring focus:ring-advance-light-purple focus:ring-opacity-50"
            required
          />
        </div>
        
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Repayment Duration (months)
          </label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-advance-purple focus:ring focus:ring-advance-light-purple focus:ring-opacity-50"
            required
          >
            {[1, 2, 3, 6, 12].map((month) => (
              <option key={month} value={month}>
                {month} {month === 1 ? 'month' : 'months'}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
            Purpose of Loan
          </label>
          <textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-advance-purple focus:ring focus:ring-advance-light-purple focus:ring-opacity-50"
            rows="3"
            placeholder="Please briefly explain why you need this advance..."
            required
          ></textarea>
        </div>
        
        {amount && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium">Payment Summary</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-sm text-gray-500">Loan Amount:</div>
              <div className="text-sm font-medium">${parseFloat(amount).toFixed(2)}</div>
              
              <div className="text-sm text-gray-500">Duration:</div>
              <div className="text-sm font-medium">{duration} {duration === 1 ? 'month' : 'months'}</div>
              
              <div className="text-sm text-gray-500">Monthly Payment:</div>
              <div className="text-sm font-medium">${estimatedPayment.toFixed(2)}</div>
            </div>
          </div>
        )}
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-advance-purple text-white py-2 px-4 rounded-md hover:bg-advance-dark-purple transition duration-200 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Processing...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
