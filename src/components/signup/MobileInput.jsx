
import React from 'react';
import { Input } from "@/components/ui/input";

const MobileInput = ({ mobile, onMobileChange }) => {
  return (
    <div>
      <label htmlFor="mobile" className="block mb-2 text-sm font-medium">Mobile Number</label>
      <Input
        id="mobile"
        type="tel"
        placeholder="Enter 10-digit mobile number"
        value={mobile}
        onChange={e => onMobileChange(e.target.value)}
        required
      />
    </div>
  );
};

export default MobileInput;
