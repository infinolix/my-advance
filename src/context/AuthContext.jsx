
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// Mock user data
const MOCK_USERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password', role: 'employee', salary: 50000 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password', role: 'employee', salary: 60000 },
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
    // Check if email already exists
    const existingUser = MOCK_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      toast.error('Email already registered');
      return false;
    }
    
    // In a real app, you would send this to your backend
    // For now, we'll just add it to our mock users
    const newUser = {
      id: (MOCK_USERS.length + 1).toString(),
      ...userData,
      role: 'employee'
    };
    
    // Add to mock users (in a real app, this would be a database operation)
    MOCK_USERS.push(newUser);
    
    toast.success('Registration successful!');
    
    // Simulate successful registration by logging in
    const { email, password } = userData;
    return login(email, password);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register, 
      loading,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
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
