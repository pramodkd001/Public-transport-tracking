'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, Phone, Mail } from 'lucide-react';

// Mock data for drivers
const mockDrivers = [
  {
    id: '1',
    name: 'Raj Kumar',
    phone: '+919876543210',
    email: 'raj.kumar@email.com',
    assigned_vehicle_id: '1',
    vehicle_number: 'KA01AB1234',
    is_active: true,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    phone: '+919876543211',
    email: 'priya.sharma@email.com',
    assigned_vehicle_id: '2',
    vehicle_number: 'KA01AB1235',
    is_active: true,
    created_at: '2024-01-16T09:15:00Z'
  },
  {
    id: '3',
    name: 'Amit Singh',
    phone: '+919876543212',
    email: 'amit.singh@email.com',
    assigned_vehicle_id: null,
    vehicle_number: null,
    is_active: true,
    created_at: '2024-01-17T14:20:00Z'
  },
  {
    id: '4',
    name: 'Rahul Verma',
    phone: '+919876543213',
    email: 'rahul.verma@email.com',
    assigned_vehicle_id: '4',
    vehicle_number: 'KA01AB1237',
    is_active: false,
    created_at: '2024-01-18T11:45:00Z'
  }
];

export default function DriversPage() {
  const [drivers, setDrivers] = useState(mockDrivers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.phone.includes(searchTerm) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && driver.is_active) ||
                         (filterStatus === 'inactive' && !driver.is_active) ||
                         (filterStatus === 'assigned' && driver.assigned_vehicle_id) ||
                         (filterStatus === 'unassigned' && !driver.assigned_vehicle_id);
    return matchesSearch && matchesFilter;
  });

  const handleAddDriver = () => {
    if (newDriver.name && newDriver.phone) {
      const driver = {
        id: String(drivers.length + 1),
        ...newDriver,
        assigned_vehicle_id: null,
        vehicle_number: null,
        is_active: true,
        created_at: new Date().toISOString()
      };
      setDrivers([...drivers, driver]);
      setNewDriver({ name: '', phone: '', email: '' });
      setShowAddForm(false);
    }
  };

  const toggleDriverStatus = (id: string) => {
    setDrivers(drivers.map(driver => 
      driver.id === id 
        ? { ...driver, is_active: !driver.is_active }
        : driver
    ));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your drivers and their assignments
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Driver
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              >
                <option value="all">All Drivers</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="assigned">Assigned</option>
                <option value="unassigned">Unassigned</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Add Driver Form */}
      {showAddForm && (
        <div className="bg-white shadow rounded-lg mb-6 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Driver</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g., John Doe"
                value={newDriver.name}
                onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g., +919876543210"
                value={newDriver.phone}
                onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                placeholder="e.g., john@email.com"
                value={newDriver.email}
                onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddDriver}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Add Driver
            </button>
          </div>
        </div>
      )}

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((driver) => (
          <div key={driver.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {driver.name}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {driver.phone}
                    </div>
                    {driver.email && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {driver.email}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => toggleDriverStatus(driver.id)}
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      driver.is_active
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {driver.is_active ? 'Active' : 'Inactive'}
                  </button>
                  <div className="flex gap-1">
                    <button className="text-blue-600 hover:text-blue-900 p-1">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm">
                  <span className="text-gray-500">Vehicle Assignment:</span>
                  {driver.vehicle_number ? (
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {driver.vehicle_number}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-1">
                      <span className="text-gray-500">Not assigned</span>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Joined {new Date(driver.created_at).toLocaleDateString()}
                </div>
              </div>

              {!driver.assigned_vehicle_id && (
                <div className="mt-4">
                  <button className="w-full px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
                    Assign Vehicle
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredDrivers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-sm text-gray-500">No drivers found</div>
        </div>
      )}
    </div>
  );
}