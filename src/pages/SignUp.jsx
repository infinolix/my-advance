
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formatINR = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value));
};

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [mobile, setMobile] = useState('');
  const [includeSalary, setIncludeSalary] = useState(false);
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [pan, setPan] = useState('');
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
    
    if (department) userData.department = department;
    if (position) userData.position = position;
    if (pan) userData.pan = pan;
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
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Full Name</label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="confirm" className="block mb-2 text-sm font-medium">Confirm Password</label>
            <Input
              id="confirm"
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="mobile" className="block mb-2 text-sm font-medium">Mobile Number</label>
            <Input
              id="mobile"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              required
            />
          </div>

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

          {includeSalary && (
            <div>
              <label htmlFor="salary" className="block mb-2 text-sm font-medium">Monthly Salary (INR)</label>
              <Input
                id="salary"
                type="number"
                min="0"
                placeholder="e.g. 40000"
                value={salary}
                onChange={e => setSalary(e.target.value.replace(/[^\d]/g, ""))}
              />
              {salary && (
                <span className="text-sm text-green-600 font-semibold">
                  {formatINR(salary)}
                </span>
              )}
            </div>
          )}
          
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
