
import React from 'react';
import { CreditCard, Shield, Clock, Building, BarChart2, FileText } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="h-12 w-12 rounded-md bg-advance-purple text-white flex items-center justify-center">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
    <p className="mt-2 text-base text-gray-500">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: CreditCard,
      title: "Instant Access to Earned Wages",
      description: "Access the money you've already earned when you need it, without waiting for payday."
    },
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "Our platform ensures secure handling of all transactions with full transparency of terms."
    },
    {
      icon: Clock,
      title: "Quick Approval Process",
      description: "Simple application process with quick approval and instant disbursement."
    },
    {
      icon: Building,
      title: "Easy for Employers",
      description: "Simple integration with existing payroll systems and easy administration."
    },
    {
      icon: BarChart2,
      title: "Comprehensive Reports",
      description: "Detailed reporting and analytics for both employees and administrators."
    },
    {
      icon: FileText,
      title: "No Hidden Fees",
      description: "Transparent fee structure with no hidden charges or predatory interest rates."
    }
  ];

  return (
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
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
