
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [showLoanForm, setShowLoanForm] = useState(false);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Mock data
  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const salaryProgress = Math.min(100, (dayOfMonth / daysInMonth) * 100);
  
  // Mock available withdrawal amount
  const monthlySalary = user?.salary || 50000; // Default if not available
  const availableAmount = Math.floor((monthlySalary / daysInMonth) * dayOfMonth * 0.7); // 70% of earned salary

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
            <p className="text-gray-600">Manage your salary advances here</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Salary Progress</CardTitle>
                <CardDescription>
                  Day {dayOfMonth} of {daysInMonth} in the current month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={salaryProgress} className="h-3 mb-2" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0%</span>
                  <span>{Math.round(salaryProgress)}%</span>
                  <span>100%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available For Advance</CardTitle>
                <CardDescription>
                  You can withdraw up to 70% of your earned salary
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ₹{availableAmount.toLocaleString()}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => setShowLoanForm(!showLoanForm)}
                >
                  {showLoanForm ? 'Cancel' : 'Request Advance'}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {showLoanForm && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Request Salary Advance</CardTitle>
                <CardDescription>
                  Fill out this form to request an advance on your earned salary
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Amount</label>
                    <input
                      type="number"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-advance-purple focus:ring-advance-purple"
                      placeholder="Enter amount"
                      max={availableAmount}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Maximum available: ₹{availableAmount.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Reason (optional)</label>
                    <textarea
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-advance-purple focus:ring-advance-purple"
                      rows={3}
                      placeholder="Why do you need this advance?"
                    ></textarea>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowLoanForm(false)}>
                  Cancel
                </Button>
                <Button>
                  Submit Request
                </Button>
              </CardFooter>
            </Card>
          )}

          <div className="mt-6 grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Mock data - in a real app this would come from an API */}
                {[].length > 0 ? (
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Amount</th>
                        <th className="py-2 px-4 border-b">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Transaction rows would go here */}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center py-8 text-gray-500">
                    No transactions yet. Request your first salary advance above.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
