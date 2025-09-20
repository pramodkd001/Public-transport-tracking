'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Calendar, Clock, User, Truck } from 'lucide-react';

// Mock data for allocations
const mockAllocations = [
  {
    id: '1',
    driver_id: '1',
    driver_name: 'Raj Kumar',
    vehicle_id: '1', 
    vehicle_number: 'KA01AB1234',
    route: 'Route 1: City Center - Airport',
    start_time: '2024-01-20T06:00:00Z',
    end_time: null,
    is_active: true,
    created_at: '2024-01-20T05:45:00Z'
  },
  {
    id: '2',
    driver_id: '2',
    driver_name: 'Priya Sharma', 
    vehicle_id: '2',
    vehicle_number: 'KA01AB1235',
    route: 'Route 2: Railway Station - IT Park',
    start_time: '2024-01-20T07:00:00Z',
    end_time: null,
    is_active: true,
    created_at: '2024-01-20T06:45:00Z'
  },
  {
    id: '3',
    driver_id: '3',
    driver_name: 'Amit Singh',
    vehicle_id: '3',
    vehicle_number: 'KA01AB1236', 
    route: 'Route 3: Bus Stand - University',
    start_time: '2024-01-19T08:00:00Z',
    end_time: '2024-01-19T18:00:00Z',
    is_active: false,
    created_at: '2024-01-19T07:45:00Z'
  }
];

const mockDrivers = [
  { id: '1', name: 'Raj Kumar' },
  { id: '2', name: 'Priya Sharma' },
  { id: '3', name: 'Amit Singh' },
  { id: '4', name: 'Rahul Verma' }
];

const mockVehicles = [
  { id: '1', number: 'KA01AB1234', route: 'Route 1: City Center - Airport' },
  { id: '2', number: 'KA01AB1235', route: 'Route 2: Railway Station - IT Park' },
  { id: '3', number: 'KA01AB1236', route: 'Route 3: Bus Stand - University' },
  { id: '4', number: 'KA01AB1237', route: 'Route 4: Market - Hospital' }
];

export default function AllocationsPage() {
  const [allocations, setAllocations] = useState(mockAllocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAllocation, setNewAllocation] = useState({
    driver_id: '',
    vehicle_id: '',
    start_time: ''
  });

  const filteredAllocations = allocations.filter(allocation => {
    const matchesSearch = allocation.driver_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         allocation.vehicle_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         allocation.route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && allocation.is_active) ||
                         (filterStatus === 'completed' && !allocation.is_active);
    return matchesSearch && matchesFilter;
  });

  const handleAddAllocation = () => {
    if (newAllocation.driver_id && newAllocation.vehicle_id) {
      const driver = mockDrivers.find(d => d.id === newAllocation.driver_id);
      const vehicle = mockVehicles.find(v => v.id === newAllocation.vehicle_id);
      
      const allocation = {
        id: String(allocations.length + 1),
        driver_id: newAllocation.driver_id,
        driver_name: driver?.name || '',
        vehicle_id: newAllocation.vehicle_id,
        vehicle_number: vehicle?.number || '',
        route: vehicle?.route || '',
        start_time: newAllocation.start_time || new Date().toISOString(),
        end_time: null,
        is_active: true,
        created_at: new Date().toISOString()
      };
      
      setAllocations([allocation, ...allocations]);
      setNewAllocation({ driver_id: '', vehicle_id: '', start_time: '' });
      setShowAddForm(false);
    }
  };

  const endAllocation = (id: string) => {
    setAllocations(allocations.map(allocation => 
      allocation.id === id 
        ? { ...allocation, is_active: false, end_time: new Date().toISOString() }
        : allocation
    ));
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getDuration = (start: string, end: string | null) => {
    const startTime = new Date(start);
    const endTime = end ? new Date(end) : new Date();
    const diffMs = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vehicle Allocations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage driver-vehicle assignments and schedules
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Allocation
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
                placeholder="Search allocations..."
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
                <option value="all">All Allocations</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Add Allocation Form */}
      {showAddForm && (
        <div className="bg-white shadow rounded-lg mb-6 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Allocation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Driver
              </label>
              <select
                value={newAllocation.driver_id}
                onChange={(e) => setNewAllocation({...newAllocation, driver_id: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              >
                <option value="">Select Driver</option>
                {mockDrivers.map(driver => (
                  <option key={driver.id} value={driver.id}>{driver.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle
              </label>
              <select
                value={newAllocation.vehicle_id}
                onChange={(e) => setNewAllocation({...newAllocation, vehicle_id: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              >
                <option value="">Select Vehicle</option>
                {mockVehicles.map(vehicle => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.number} - {vehicle.route}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="datetime-local"
                value={newAllocation.start_time}
                onChange={(e) => setNewAllocation({...newAllocation, start_time: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
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
              onClick={handleAddAllocation}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Create Allocation
            </button>
          </div>
        </div>
      )}

      {/* Allocations List */}
      <div className="space-y-4">
        {filteredAllocations.map((allocation) => (
          <div key={allocation.id} className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-gray-900">{allocation.driver_name}</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium text-gray-900">{allocation.vehicle_number}</span>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    allocation.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {allocation.is_active ? 'Active' : 'Completed'}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  <strong>Route:</strong> {allocation.route}
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Started: {formatDateTime(allocation.start_time)}
                  </div>
                  {allocation.end_time && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Ended: {formatDateTime(allocation.end_time)}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Duration: {getDuration(allocation.start_time, allocation.end_time)}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                {allocation.is_active && (
                  <button
                    onClick={() => endAllocation(allocation.id)}
                    className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                  >
                    End Shift
                  </button>
                )}
                <button className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAllocations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-sm text-gray-500">No allocations found</div>
        </div>
      )}
    </div>
  );
}