
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from '@/context/AuthContext';
import AccountCredentials from '@/components/signup/AccountCredentials';
import MobileInput from '@/components/signup/MobileInput';
import SalaryInput from '@/components/signup/SalaryInput';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

const SignUp = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("account");
  
  // Account info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Contact info
  const [mobile, setMobile] = useState('');
  
  // Employment info
  const [includeSalary, setIncludeSalary] = useState(false);
  const [salary, setSalary] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentStep === "account") {
      // Validate account info
      if (!name || !email || !password || !confirmPassword) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return;
      }
      
      setCurrentStep("contact");
    } else if (currentStep === "contact") {
      // Validate contact info
      if (!mobile || mobile.length !== 10) {
        toast.error('Please enter a valid 10-digit mobile number');
        return;
      }
      
      setCurrentStep("employment");
    }
  };

  const handlePrevious = () => {
    if (currentStep === "contact") {
      setCurrentStep("account");
    } else if (currentStep === "employment") {
      setCurrentStep("contact");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation
    if (includeSalary && !salary) {
      toast.error('Please enter your salary');
      return;
    }
    
    setLoading(true);
    try {
      // Register the user
      const userData = {
        name,
        email,
        password,
        mobile,
        salary: includeSalary ? parseInt(salary, 10) : null
      };
      
      const success = register(userData);
      
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Create your account</CardTitle>
          <CardDescription className="text-center">
            Start accessing your earned salary today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={currentStep} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="account" disabled>Account</TabsTrigger>
              <TabsTrigger value="contact" disabled>Contact</TabsTrigger>
              <TabsTrigger value="employment" disabled>Employment</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <TabsContent value="account">
                <AccountCredentials
                  name={name}
                  email={email}
                  password={password}
                  confirm={confirmPassword}
                  onNameChange={setName}
                  onEmailChange={setEmail}
                  onPasswordChange={setPassword}
                  onConfirmChange={setConfirmPassword}
                />
                
                <div className="pt-4">
                  <Button 
                    type="button" 
                    onClick={handleNext}
                    className="w-full"
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="contact">
                <MobileInput
                  mobile={mobile}
                  onMobileChange={setMobile}
                />
                
                <div className="pt-4 flex justify-between">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={handlePrevious}
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="employment">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-salary">Include salary information</Label>
                    <Switch 
                      id="include-salary" 
                      checked={includeSalary} 
                      onCheckedChange={setIncludeSalary}
                    />
                  </div>
                  
                  <SalaryInput
                    includeSalary={includeSalary}
                    salary={salary}
                    onSalaryChange={setSalary}
                  />
                  
                  <div className="pt-4 flex justify-between">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={handlePrevious}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-advance-purple hover:text-advance-dark-purple font-medium">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
