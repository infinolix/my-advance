import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from "sonner";

const formatINR = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value));
};

const SignUp = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [pan, setPan] = useState('');
  const [salary, setSalary] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name || !department || !position || !pan || !email || !password || !confirm || !mobile) {
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
      department,
      position,
      pan,
      mobile,
      role: 'employee'
    };
    if (salary) {
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
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh-4rem)]">
        <div className="w-full bg-white rounded-lg shadow max-w-md card-shadow">
          <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl text-center">Create Your Account</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Full Name <span className="text-red-500">*</span></label>
                <input
                  id="name"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-advance-purple focus:border-advance-purple block w-full p-2.5"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900">Department <span className="text-red-500">*</span></label>
                <input
                  id="department"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-advance-purple focus:border-advance-purple block w-full p-2.5"
                  placeholder="Department"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900">Position <span className="text-red-500">*</span></label>
                <input
                  id="position"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-advance-purple focus:border-advance-purple block w-full p-2.5"
                  placeholder="Position"
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="pan" className="block mb-2 text-sm font-medium text-gray-900">PAN Number <span className="text-red-500">*</span></label>
                <input
                  id="pan"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-advance-purple focus:border-advance-purple block w-full p-2.5"
                  placeholder="PAN Number"
                  value={pan}
                  onChange={e => setPan(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="salary" className="block mb-2 text-sm font-medium text-gray-900">Monthly Salary (INR)</label>
                <input
                  id="salary"
                  type="number"
                  min="0"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-advance-purple focus:border-advance-purple block w-full p-2.5"
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
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email <span className="text-red-500">*</span></label>
                <input
                  id="email"
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-advance-purple focus:border-advance-purple block w-full p-2.5"
                  placeholder="name@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900">Mobile Number <span className="text-red-500">*</span></label>
                <input
                  id="mobile"
                  type="tel"
                  pattern="[0-9]{10}"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-advance-purple focus:border-advance-purple block w-full p-2.5"
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password <span className="text-red-500">*</span></label>
                <input
                  id="password"
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-advance-purple focus:border-advance-purple block w-full p-2.5"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirm" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password <span className="text-red-500">*</span></label>
                <input
                  id="confirm"
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-advance-purple focus:border-advance-purple block w-full p-2.5"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white bg-advance-purple hover:bg-advance-dark-purple focus:ring-4 focus:outline-none focus:ring-advance-light-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? "Please wait..." : "Sign Up"}
              </button>
            </form>
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-advance-purple hover:underline">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
