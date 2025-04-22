
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext();

// Mock user data
const MOCK_USERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password', role: 'employee', salary: 5000 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password', role: 'employee', salary: 6000 },
  { id: '3', name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('myAdvanceUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      // Remove password before storing
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('myAdvanceUser', JSON.stringify(userWithoutPassword));
      toast.success('Login successful!');
      return true;
    }
    toast.error('Invalid email or password');
    return false;
  };

  const logout = () => {
    localStorage.removeItem('myAdvanceUser');
    setUser(null);
    toast.info('Logged out successfully');
  };

  const register = (userData) => {
    // In a real app, you would send this to your backend
    toast.success('Registration successful!');
    // Simulate successful registration by logging in
    const { email, password } = userData;
    return login(email, password);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
