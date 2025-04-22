
import React from 'react';
import { Input } from "@/components/ui/input";

const MobileInput = ({ mobile, onMobileChange }) => {
  const handleMobileChange = (value) => {
    // Only allow digits and limit to 10 characters
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
    onMobileChange(sanitizedValue);
  };

  return (
    <div>
      <label htmlFor="mobile" className="block mb-2 text-sm font-medium">Mobile Number</label>
      <Input
        id="mobile"
        type="tel"
        placeholder="Enter 10-digit mobile number"
        value={mobile}
        onChange={e => handleMobileChange(e.target.value)}
        required
        maxLength={10}
        inputMode="numeric"
      />
      {mobile && mobile.length < 10 && (
        <p className="text-xs text-red-500 mt-1">
          Please enter a 10-digit mobile number
        </p>
      )}
    </div>
  );
};

export default MobileInput;
