
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/signup');
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Financial freedom with</span>
                  <span className="block text-transparent bg-clip-text advance-gradient">MyAdvance</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Access the salary you've already earned without waiting for payday. MyAdvance provides employees with quick and convenient access to their earned wages.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={handleGetStarted}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white advance-gradient hover:opacity-90 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#features"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-advance-purple bg-white border-advance-purple hover:bg-advance-light-purple md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-advance-purple sm:h-72 md:h-96 lg:w-full lg:h-full advance-gradient"></div>
        </div>
      </section>
      
      {/* Features */}
      <section id="features" className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose MyAdvance?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our platform offers a range of benefits for both employees and employers.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-md bg-advance-purple text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Instant Access to Earned Wages</h3>
              <p className="mt-2 text-base text-gray-500">
                Access the money you've already earned when you need it, without waiting for payday.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-md bg-advance-purple text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Secure & Transparent</h3>
              <p className="mt-2 text-base text-gray-500">
                Our platform ensures secure handling of all transactions with full transparency of terms.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-md bg-advance-purple text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Quick Approval Process</h3>
              <p className="mt-2 text-base text-gray-500">
                Simple application process with quick approval and instant disbursement.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-md bg-advance-purple text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No Hidden Fees</h3>
              <p className="mt-2 text-base text-gray-500">
                Transparent fee structure with no hidden charges or predatory interest rates.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-md bg-advance-purple text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Easy for Employers</h3>
              <p className="mt-2 text-base text-gray-500">
                Simple integration with existing payroll systems and easy administration.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-md bg-advance-purple text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Comprehensive Reports</h3>
              <p className="mt-2 text-base text-gray-500">
                Detailed reporting and analytics for both employees and administrators.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Get access to your earned wages in just a few simple steps.
            </p>
          </div>
          
          <div className="mt-16">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-advance-light-purple text-advance-purple mx-auto">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Register & Verify</h3>
                <p className="mt-2 text-base text-gray-500">
                  Create an account and verify your employment details with your organization.
                </p>
              </div>

              <div className="mt-10 lg:mt-0 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-advance-light-purple text-advance-purple mx-auto">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Apply for Advance</h3>
                <p className="mt-2 text-base text-gray-500">
                  Submit your salary advance request specifying the amount and repayment period.
                </p>
              </div>

              <div className="mt-10 lg:mt-0 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-advance-light-purple text-advance-purple mx-auto">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Receive Funds</h3>
                <p className="mt-2 text-base text-gray-500">
                  Once approved, receive funds directly in your bank account within minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-advance-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-advance-light-purple">Sign up today and access your earned salary.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-advance-purple bg-white hover:bg-advance-light-purple hover:text-advance-dark-purple"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text advance-gradient">MyAdvance</h2>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center md:text-right text-base text-gray-500">
                &copy; 2025 MyAdvance. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
