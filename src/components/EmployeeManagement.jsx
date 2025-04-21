
import React, { useState } from 'react';
import { toast } from 'sonner';

// Mock data for employees
const initialEmployees = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john@example.com', 
    position: 'Software Developer',
    department: 'Engineering',
    salary: 5000,
    joinDate: '2023-05-15',
    status: 'active'
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    position: 'Marketing Specialist',
    department: 'Marketing',
    salary: 6000,
    joinDate: '2023-04-10',
    status: 'active'
  },
  { 
    id: '3', 
    name: 'Robert Johnson', 
    email: 'robert@example.com', 
    position: 'Sales Representative',
    department: 'Sales',
    salary: 4800,
    joinDate: '2023-06-22',
    status: 'inactive'
  }
];

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
    joinDate: '',
    status: 'active'
  });

  // Filter employees by search term
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const openModal = (employee = null) => {
    if (employee) {
      setCurrentEmployee(employee);
      setFormData({
        id: employee.id,
        name: employee.name,
        email: employee.email,
        position: employee.position,
        department: employee.department,
        salary: employee.salary,
        joinDate: employee.joinDate,
        status: employee.status
      });
    } else {
      setCurrentEmployee(null);
      setFormData({
        id: (employees.length + 1).toString(),
        name: '',
        email: '',
        position: '',
        department: '',
        salary: '',
        joinDate: new Date().toISOString().split('T')[0],
        status: 'active'
      });
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentEmployee(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.salary) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (isNaN(formData.salary) || parseFloat(formData.salary) <= 0) {
      toast.error('Please enter a valid salary amount');
      return;
    }

    if (currentEmployee) {
      // Update existing employee
      setEmployees(
        employees.map(emp => 
          emp.id === currentEmployee.id ? { ...formData, salary: parseFloat(formData.salary) } : emp
        )
      );
      toast.success(`Employee ${formData.name} updated successfully`);
    } else {
      // Add new employee
      setEmployees([
        ...employees,
        { ...formData, salary: parseFloat(formData.salary) }
      ]);
      toast.success(`Employee ${formData.name} added successfully`);
    }
    
    closeModal();
  };

  const toggleEmployeeStatus = (id) => {
    setEmployees(
      employees.map(emp => {
        if (emp.id === id) {
          const newStatus = emp.status === 'active' ? 'inactive' : 'active';
          toast.info(`Employee ${emp.name} is now ${newStatus}`);
          return { ...emp, status: newStatus };
        }
        return emp;
      })
    );
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      {/* Search and Add Employee */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-advance-purple focus:border-advance-purple sm:text-sm"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => openModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-advance-purple hover:bg-advance-dark-purple"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Employee
        </button>
      </div>
      
      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salary
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-advance-light-purple flex items-center justify-center">
                        <span className="text-advance-dark-purple font-medium">{employee.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${employee.salary.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(employee.joinDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openModal(employee)}
                      className="text-advance-purple hover:text-advance-dark-purple mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleEmployeeStatus(employee.id)}
                      className={employee.status === 'active' ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                    >
                      {employee.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {currentEmployee ? 'Edit Employee' : 'Add New Employee'}
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name *
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="shadow-sm focus:ring-advance-purple focus:border-advance-purple block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address *
                          </label>
                          <div className="mt-1">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="shadow-sm focus:ring-advance-purple focus:border-advance-purple block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                            Position
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="position"
                              id="position"
                              value={formData.position}
                              onChange={handleInputChange}
                              className="shadow-sm focus:ring-advance-purple focus:border-advance-purple block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                            Department
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="department"
                              id="department"
                              value={formData.department}
                              onChange={handleInputChange}
                              className="shadow-sm focus:ring-advance-purple focus:border-advance-purple block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                            Monthly Salary ($) *
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              name="salary"
                              id="salary"
                              value={formData.salary}
                              onChange={handleInputChange}
                              min="0"
                              step="100"
                              required
                              className="shadow-sm focus:ring-advance-purple focus:border-advance-purple block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">
                            Join Date
                          </label>
                          <div className="mt-1">
                            <input
                              type="date"
                              name="joinDate"
                              id="joinDate"
                              value={formData.joinDate}
                              onChange={handleInputChange}
                              className="shadow-sm focus:ring-advance-purple focus:border-advance-purple block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                          </label>
                          <div className="mt-1">
                            <select
                              id="status"
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                              className="shadow-sm focus:ring-advance-purple focus:border-advance-purple block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-advance-purple text-base font-medium text-white hover:bg-advance-dark-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-advance-purple sm:col-start-2 sm:text-sm"
                        >
                          {currentEmployee ? 'Save Changes' : 'Add Employee'}
                        </button>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-advance-purple sm:mt-0 sm:col-start-1 sm:text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
