
import React from 'react';
import { Input } from "@/components/ui/input";

const formatINR = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value));
};

const SalaryInput = ({ includeSalary, salary, onSalaryChange }) => {
  if (!includeSalary) return null;
  
  return (
    <div>
      <label htmlFor="salary" className="block mb-2 text-sm font-medium">Monthly Salary (INR)</label>
      <Input
        id="salary"
        type="number"
        min="0"
        placeholder="e.g. 40000"
        value={salary}
        onChange={e => onSalaryChange(e.target.value.replace(/[^\d]/g, ""))}
      />
      {salary && (
        <span className="text-sm text-green-600 font-semibold">
          {formatINR(salary)}
        </span>
      )}
    </div>
  );
};

export default SalaryInput;
