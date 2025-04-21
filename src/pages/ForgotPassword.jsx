
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send a reset link or message in a real app
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh-4rem)]">
        <div className="w-full bg-white rounded-lg shadow max-w-md card-shadow">
          <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl text-center">Forgot Password?</h1>
            {!sent ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Enter your email to reset password
                  </label>
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
                <button
                  type="submit"
                  className="w-full text-white bg-advance-purple hover:bg-advance-dark-purple focus:ring-4 focus:outline-none focus:ring-advance-light-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Send Reset Link
                </button>
              </form>
            ) : (
              <div className="text-green-700 text-center space-y-2">
                <div>We have sent a password reset link to your email if it exists in our system.</div>
                <Link to="/login" className="block text-advance-purple hover:underline mt-4">Back to Login</Link>
              </div>
            )}
            <div className="text-center text-sm text-gray-600 mt-6">
              <Link to="/login" className="text-advance-purple hover:underline">Back to Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
