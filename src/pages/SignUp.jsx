
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from "sonner";
import AccountCredentials from '../components/signup/AccountCredentials';
import MobileInput from '../components/signup/MobileInput';
import SalaryInput from '../components/signup/SalaryInput';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [mobile, setMobile] = useState('');
  const [includeSalary, setIncludeSalary] = useState(false);
  const [salary, setSalary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!name || !email || !password || !confirm || !mobile) {
      toast.error('Please fill all required fields');
      setIsLoading(false);
      return;
    }
    
    if (password !== confirm) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const userData = {
      name,
      email,
      password,
      mobile,
      role: 'employee'
    };
    
    if (includeSalary && salary) {
      userData.salary = Number(salary);
    }

    const success = register(userData);
    setIsLoading(false);
    if (success) {
      toast.success('Account created successfully');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Create Your Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <AccountCredentials
            name={name}
            email={email}
            password={password}
            confirm={confirm}
            onNameChange={setName}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onConfirmChange={setConfirm}
          />
          
          <MobileInput
            mobile={mobile}
            onMobileChange={setMobile}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="includeSalary"
              className="h-4 w-4 text-advance-purple focus:ring-advance-purple border-gray-300 rounded"
              checked={includeSalary}
              onChange={() => setIncludeSalary(!includeSalary)}
            />
            <label htmlFor="includeSalary" className="ml-2 block text-sm text-gray-900">
              Include Monthly Salary?
            </label>
          </div>

          <SalaryInput
            includeSalary={includeSalary}
            salary={salary}
            onSalaryChange={setSalary}
          />
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-advance-purple hover:bg-advance-dark-purple text-white font-medium rounded-lg text-center transition-colors"
          >
            {isLoading ? "Please wait..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-advance-purple hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
