
import React from 'react';

const UserProfileCard = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full bg-advance-light-purple flex items-center justify-center">
          <span className="text-advance-dark-purple font-medium text-lg">
            {user?.name?.charAt(0)}
          </span>
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <p className="text-gray-500 text-sm">Employee ID: {user?.id}</p>
        </div>
      </div>
      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between">
          <span className="text-gray-500">Monthly Salary</span>
          <span className="font-medium">${user?.salary || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
