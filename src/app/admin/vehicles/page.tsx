'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';

// Mock data for vehicles
const mockVehicles = [
  {
    id: '1',
    number: 'KA01AB1234',
    route: 'Route 1: City Center - Airport',
    capacity: 45,
    is_active: true,
    current_driver_id: '1',
    driver_name: 'Raj Kumar',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2', 
    number: 'KA01AB1235',
    route: 'Route 2: Railway Station - IT Park',
    capacity: 50,
    is_active: true,
    current_driver_id: '2',
    driver_name: 'Priya Sharma',
    created_at: '2024-01-16T09:15:00Z'
  },
  {
    id: '3',
    number: 'KA01AB1236', 
    route: 'Route 3: Bus Stand - University',
    capacity: 40,
    is_active: false,
    current_driver_id: null,
    driver_name: null,
    created_at: '2024-01-17T14:20:00Z'
  },
  {
    id: '4',
    number: 'KA01AB1237',
    route: 'Route 4: Market - Hospital',
    capacity: 42,
    is_active: true,
    current_driver_id: '4',
    driver_name: 'Rahul Verma',
    created_at: '2024-01-18T11:45:00Z'
  }
];

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    number: '',
    route: '',
    capacity: 50
  });

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && vehicle.is_active) ||
                         (filterStatus === 'inactive' && !vehicle.is_active);
    return matchesSearch && matchesFilter;
  });

  const handleAddVehicle = () => {
    if (newVehicle.number && newVehicle.route) {
      const vehicle = {
        id: String(vehicles.length + 1),
        ...newVehicle,
        is_active: true,
        current_driver_id: null,
        driver_name: null,
        created_at: new Date().toISOString()
      };
      setVehicles([...vehicles, vehicle]);
      setNewVehicle({ number: '', route: '', capacity: 50 });
      setShowAddForm(false);
    }
  };

  const toggleVehicleStatus = (id: string) => {
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === id 
        ? { ...vehicle, is_active: !vehicle.is_active }
        : vehicle
    ));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your fleet of vehicles
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
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
                placeholder="Search vehicles..."
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
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Add Vehicle Form */}
      {showAddForm && (
        <div className="bg-white shadow rounded-lg mb-6 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Vehicle</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Number
              </label>
              <input
                type="text"
                placeholder="e.g., KA01AB1234"
                value={newVehicle.number}
                onChange={(e) => setNewVehicle({...newVehicle, number: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Route
              </label>
              <input
                type="text"
                placeholder="e.g., Route 5: Airport - City Center"
                value={newVehicle.route}
                onChange={(e) => setNewVehicle({...newVehicle, route: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={newVehicle.capacity}
                onChange={(e) => setNewVehicle({...newVehicle, capacity: parseInt(e.target.value)})}
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
              onClick={handleAddVehicle}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Add Vehicle
            </button>
          </div>
        </div>
      )}

      {/* Vehicles Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {vehicle.number}
                      </div>
                      <div className="text-sm text-gray-500">
                        Added {new Date(vehicle.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{vehicle.route}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicle.driver_name ? (
                      <div className="text-sm text-gray-900">{vehicle.driver_name}</div>
                    ) : (
                      <span className="text-sm text-gray-500">Not assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.capacity} passengers
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleVehicleStatus(vehicle.id)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vehicle.is_active
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {vehicle.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-sm text-gray-500">No vehicles found</div>
        </div>
      )}
    </div>
  );
}