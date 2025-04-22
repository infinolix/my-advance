import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/home/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const AdminDashboard = () => {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Manage all aspects of the MyAdvance system</p>
          </div>

          <Tabs defaultValue="advances" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="advances">Advance Requests</TabsTrigger>
              <TabsTrigger value="employees">Manage Employees</TabsTrigger>
              <TabsTrigger value="settings">System Settings</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="advances">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Advance Requests</CardTitle>
                  <CardDescription>
                    Approve or reject salary advance requests from employees
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-gray-500">
                    No pending requests at this time.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="employees">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Management</CardTitle>
                  <CardDescription>
                    Add, edit, or remove employees from the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Salary
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                          <td className="px-6 py-4 whitespace-nowrap">john@example.com</td>
                          <td className="px-6 py-4 whitespace-nowrap">Employee</td>
                          <td className="px-6 py-4 whitespace-nowrap">₹50,000</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                          <td className="px-6 py-4 whitespace-nowrap">jane@example.com</td>
                          <td className="px-6 py-4 whitespace-nowrap">Employee</td>
                          <td className="px-6 py-4 whitespace-nowrap">₹60,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure the MyAdvance platform settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Advance Limits</h3>
                      <p className="text-gray-500 text-sm">
                        Configure the maximum percentage of earned salary that employees can withdraw
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <input
                          type="number"
                          className="w-24 border-gray-300 rounded-md shadow-sm"
                          defaultValue="70"
                        />
                        <span>%</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Processing Fee</h3>
                      <p className="text-gray-500 text-sm">
                        Set the processing fee for each salary advance
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <input
                          type="number"
                          className="w-24 border-gray-300 rounded-md shadow-sm"
                          defaultValue="1"
                        />
                        <span>%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Reports & Analytics</CardTitle>
                  <CardDescription>
                    View and download system reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Advance Distribution</h3>
                      <p className="text-gray-500 text-sm mb-4">Visualize how salary advances are distributed across employees</p>
                      <div className="h-40 bg-gray-100 flex items-center justify-center">
                        [Chart Placeholder]
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Monthly Trends</h3>
                      <p className="text-gray-500 text-sm mb-4">View trends in advance requests over time</p>
                      <div className="h-40 bg-gray-100 flex items-center justify-center">
                        [Chart Placeholder]
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
