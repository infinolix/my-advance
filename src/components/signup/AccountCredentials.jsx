
import React from 'react';
import { Input } from "@/components/ui/input";

const AccountCredentials = ({ name, email, password, confirm, onNameChange, onEmailChange, onPasswordChange, onConfirmChange }) => {
  return (
    <>
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium">Full Name</label>
        <Input
          id="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => onNameChange(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
        <Input
          id="email"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={e => onEmailChange(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={e => onPasswordChange(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="confirm" className="block mb-2 text-sm font-medium">Confirm Password</label>
        <Input
          id="confirm"
          type="password"
          value={confirm}
          onChange={e => onConfirmChange(e.target.value)}
          required
        />
      </div>
    </>
  );
};

export default AccountCredentials;
