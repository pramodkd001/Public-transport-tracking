'use client';

import { useState } from 'react';
import { Truck, Users, MapPin, Activity, Plus } from 'lucide-react';
import Link from 'next/link';

// Mock data for demonstration
const mockStats = {
  totalVehicles: 12,
  activeVehicles: 8,
  totalDrivers: 15,
  activeDrivers: 8,
  totalRoutes: 6,
  liveTracking: 8
};

const mockRecentAllocations = [
  { id: 1, driverName: 'Raj Kumar', vehicleNumber: 'KA01AB1234', route: 'Route 1: City Center - Airport', status: 'Active', time: '2 hours ago' },
  { id: 2, driverName: 'Priya Sharma', vehicleNumber: 'KA01AB1235', route: 'Route 2: Railway Station - IT Park', status: 'Active', time: '3 hours ago' },
  { id: 3, driverName: 'Amit Singh', vehicleNumber: 'KA01AB1236', route: 'Route 3: Bus Stand - University', status: 'Completed', time: '5 hours ago' },
];

const mockLiveVehicles = [
  { id: 1, number: 'KA01AB1234', driver: 'Raj Kumar', route: 'Route 1', status: 'Moving', lastUpdate: '2 min ago', passengers: 23 },
  { id: 2, number: 'KA01AB1235', driver: 'Priya Sharma', route: 'Route 2', status: 'Stopped', lastUpdate: '1 min ago', passengers: 15 },
  { id: 3, number: 'KA01AB1237', driver: 'Rahul Verma', route: 'Route 4', status: 'Moving', lastUpdate: '30 sec ago', passengers: 32 },
];

export default function AdminDashboard() {
  const [stats] = useState(mockStats);
  const [recentAllocations] = useState(mockRecentAllocations);
  const [liveVehicles] = useState(mockLiveVehicles);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your transport system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Vehicles
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.activeVehicles} / {stats.totalVehicles}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Drivers
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.activeDrivers} / {stats.totalDrivers}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Routes
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalRoutes}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Live Tracking
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.liveTracking}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Allocations */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Allocations
              </h3>
              <Link 
                href="/admin/allocations"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentAllocations.map((allocation) => (
                <div key={allocation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {allocation.driverName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {allocation.vehicleNumber} - {allocation.route}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      allocation.status === 'Active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {allocation.status}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">{allocation.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link 
                href="/admin/allocations/new"
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Allocation
              </Link>
            </div>
          </div>
        </div>

        {/* Live Vehicle Status */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Live Vehicle Status
              </h3>
              <Link 
                href="/admin/tracking"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                View map
              </Link>
            </div>
            <div className="space-y-3">
              {liveVehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {vehicle.number}
                    </p>
                    <p className="text-sm text-gray-500">
                      {vehicle.driver} • {vehicle.route}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        vehicle.status === 'Moving' ? 'bg-green-400' : 'bg-yellow-400'
                      }`}></div>
                      <span className="text-xs text-gray-500">{vehicle.status}</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{vehicle.lastUpdate}</span>
                    <span className="text-xs text-blue-600 mt-1">{vehicle.passengers} passengers</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}