
import React from 'react';

const QuickApplyCard = ({ setActiveTab }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-3">Need a Salary Advance?</h2>
      <p className="text-gray-500 mb-4">
        You currently have no active or pending loan requests
      </p>
      <button
        onClick={() => setActiveTab('new-application')}
        className="bg-advance-purple text-white py-2 px-6 rounded-md hover:bg-advance-dark-purple transition duration-200"
      >
        Apply Now
      </button>
    </div>
  );
};

export default QuickApplyCard;
