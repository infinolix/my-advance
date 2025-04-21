
import React from 'react';

const Step = ({ number, title, description }) => (
  <div className="text-center">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-advance-light-purple text-advance-purple mx-auto">
      <span className="text-lg font-bold">{number}</span>
    </div>
    <h3 className="mt-6 text-xl font-medium text-gray-900">{title}</h3>
    <p className="mt-2 text-base text-gray-500">{description}</p>
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Register & Verify",
      description: "Create an account and verify your employment details with your organization."
    },
    {
      number: "2",
      title: "Apply for Advance",
      description: "Submit your salary advance request specifying the amount and repayment period."
    },
    {
      number: "3",
      title: "Receive Funds",
      description: "Once approved, receive funds directly in your bank account within minutes."
    }
  ];

  return (
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
            {steps.map((step, index) => (
              <Step key={index} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
