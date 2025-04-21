
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!email || !password) {
      alert('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    // Attempt login
    const success = login(email, password);
    
    if (success) {
      // Navigate based on user role (handled in useEffect in AuthContext)
      navigate('/dashboard');
    }
    
    setIsLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh-4rem)]">
        <div className="w-full bg-white rounded-lg shadow max-w-md card-shadow">
          <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Login to Your Account
            </h1>
            
            <div className="space-y-2 text-sm text-center text-gray-500">
              <p>For employee login, use:</p>
              <div className="bg-gray-50 p-2 rounded-md">
                <div>Email: john@example.com</div>
                <div>Password: password</div>
              </div>
              
              <p className="mt-2">For admin login, use:</p>
              <div className="bg-gray-50 p-2 rounded-md">
                <div>Email: admin@example.com</div>
                <div>Password: admin123</div>
              </div>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-advance-purple focus:border-advance-purple block w-full p-2.5"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-advance-purple focus:border-advance-purple block w-full p-2.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                {isLoading ? 'Please wait...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
