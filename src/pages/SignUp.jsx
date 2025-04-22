import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from "sonner";
import AccountCredentials from '../components/signup/AccountCredentials';
import MobileInput from '../components/signup/MobileInput';
import { Input } from "@/components/ui/input";
import { Briefcase, Badge, IndianRupee } from "lucide-react";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [mobile, setMobile] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [pan, setPan] = useState('');
  const [salary, setSalary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !password || !confirm || !mobile || !department || !position || !pan || !salary) {
      toast.error('Please fill all required fields');
      setIsLoading(false);
      return;
    }

    if (password !== confirm) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      setIsLoading(false);
      return;
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
      toast.error('Please enter a valid PAN number (e.g. ABCDE1234F)');
      setIsLoading(false);
      return;
    }

    if (Number(salary) < 0) {
      toast.error('Salary must be a positive number');
      setIsLoading(false);
      return;
    }

    const userData = {
      name,
      email,
      password,
      mobile,
      department,
      position,
      pan,
      salary: Number(salary),
      role: 'employee'
    };

    try {
      const success = await register(userData);
      setIsLoading(false);
      if (success) {
        toast.success('Account created successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to create account');
      setIsLoading(false);
    }
  };

  const formatINR = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value));
  };

  const loanEligibility = salary ? Math.floor(Number(salary) / 2) : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
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

          <div>
            <label htmlFor="department" className="block mb-2 text-sm font-medium flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Department
            </label>
            <Input
              id="department"
              type="text"
              placeholder="e.g. Finance, HR"
              value={department}
              onChange={e => setDepartment(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="position" className="block mb-2 text-sm font-medium flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Position
            </label>
            <Input
              id="position"
              type="text"
              placeholder="e.g. Manager, Analyst"
              value={position}
              onChange={e => setPosition(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="pan" className="block mb-2 text-sm font-medium flex items-center">
              <Badge className="w-4 h-4 mr-2" />
              PAN Number
            </label>
            <Input
              id="pan"
              type="text"
              maxLength={10}
              placeholder="ABCDE1234F"
              value={pan}
              onChange={e => setPan(e.target.value.toUpperCase().replace(/[^A-Z0-9]/gi, '').slice(0, 10))}
              required
            />
            {pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan) &&
              <p className="text-xs text-red-500 mt-1">
                Please enter a valid PAN number (e.g. ABCDE1234F)
              </p>
            }
          </div>

          <div>
            <label htmlFor="salary" className="block mb-2 text-sm font-medium flex items-center">
              <IndianRupee className="w-4 h-4 mr-2" />
              Monthly Salary (INR)
            </label>
            <Input
              id="salary"
              type="number"
              min="0"
              placeholder="e.g. 40000"
              value={salary}
              onChange={e => setSalary(e.target.value.replace(/[^\d]/g, ""))}
              required
            />
            {salary && (
              <span className="text-sm text-green-600 font-semibold block">
                {formatINR(salary)}
              </span>
            )}
            <div className="mt-1 text-xs text-blue-700 font-medium">
              {salary
                ? `You are eligible for a loan up to ${formatINR(loanEligibility)} (50% of your salary).`
                : 'Enter your monthly salary to see your eligible loan amount.'}
            </div>
          </div>

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
