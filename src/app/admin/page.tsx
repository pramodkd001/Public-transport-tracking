'use client';

import { useState, useEffect } from 'react';
import { Truck, Users, Clock, Activity, Bell, BarChart3, TrendingUp, PieChart, RefreshCw, Plus, Leaf, AlertTriangle, MapPin, Fuel, Shield } from 'lucide-react';
import Link from 'next/link';
import { 
  PieChart as RechartsPieChart, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Pie
} from 'recharts';

const mockData = {
  activeVehicles: 18,
  totalVehicles: 24,
  dailyPassengers: 2847,
  onTimePerformance: 78,
  activeTrips: 12,
  co2Saved: 145.7,
  delayedTrips: 3,
  completedTrips: 156
};

const mockRoutes = [
  { id: 'Route 1 - Central', passengers: 85, capacity: 50, status: 'Overcrowded', waitTime: 8, efficiency: 92, delay: 5 },
  { id: 'Route 2 - North', passengers: 32, capacity: 45, status: 'Normal', waitTime: 6, efficiency: 78, delay: 0 },
  { id: 'Route 3 - South', passengers: 28, capacity: 40, status: 'Normal', waitTime: 12, efficiency: 65, delay: 3 },
  { id: 'Route 4 - East', passengers: 41, capacity: 35, status: 'High', waitTime: 9, efficiency: 85, delay: 2 },
  { id: 'Route 5 - West', passengers: 22, capacity: 40, status: 'Normal', waitTime: 7, efficiency: 72, delay: 1 },
  { id: 'Route 6 - Express', passengers: 38, capacity: 45, status: 'Normal', waitTime: 4, efficiency: 88, delay: 0 },
];

const mockDrivers = [
  { name: 'Raj Kumar', punctuality: 92, trips: 28, hours: 8.5, rating: 4.8, experience: '5 years', issues: 0 },
  { name: 'Priya Sharma', punctuality: 88, trips: 25, hours: 8.0, rating: 4.6, experience: '3 years', issues: 1 },
  { name: 'Amit Singh', punctuality: 95, trips: 31, hours: 9.0, rating: 4.9, experience: '7 years', issues: 0 },
  { name: 'Rahul Verma', punctuality: 85, trips: 22, hours: 7.5, rating: 4.4, experience: '2 years', issues: 2 },
  { name: 'Sita Devi', punctuality: 91, trips: 29, hours: 8.2, rating: 4.7, experience: '4 years', issues: 0 },
  { name: 'Mohan Lal', punctuality: 87, trips: 26, hours: 8.1, rating: 4.5, experience: '6 years', issues: 1 },
];

const mockAlerts = [
  { id: 1, type: 'breakdown', message: 'BUS002 reported engine issue on Route 1', time: '5 min ago', severity: 'high', location: 'Central Station' },
  { id: 2, type: 'sos', message: 'Emergency alert from Route 3 - passenger medical emergency', time: '12 min ago', severity: 'critical', location: 'South Terminal' },
  { id: 3, type: 'connectivity', message: 'VAN001 GPS signal lost near Mall Road', time: '20 min ago', severity: 'medium', location: 'Mall Road' },
  { id: 4, type: 'delay', message: 'Route 4 experiencing 10 min delay due to traffic', time: '8 min ago', severity: 'medium', location: 'East Junction' },
  { id: 5, type: 'maintenance', message: 'BUS005 scheduled maintenance reminder', time: '25 min ago', severity: 'low', location: 'Depot' },
  { id: 6, type: 'overcrowding', message: 'Route 1 bus overcrowded - deploy additional vehicle', time: '3 min ago', severity: 'high', location: 'City Center' },
];

const mockVehicles = [
  { id: 'BUS001', route: 'Route 1', status: 'Active', fuel: 85, maintenance: 'Good', lastService: '10 days ago', mileage: 12.5 },
  { id: 'BUS002', route: 'Route 1', status: 'Breakdown', fuel: 65, maintenance: 'Critical', lastService: '45 days ago', mileage: 8.2 },
  { id: 'BUS003', route: 'Route 2', status: 'Active', fuel: 92, maintenance: 'Good', lastService: '5 days ago', mileage: 13.1 },
  { id: 'VAN001', route: 'Route 3', status: 'GPS Lost', fuel: 78, maintenance: 'Fair', lastService: '20 days ago', mileage: 15.2 },
  { id: 'BUS004', route: 'Route 4', status: 'Active', fuel: 55, maintenance: 'Due', lastService: '30 days ago', mileage: 11.8 },
  { id: 'BUS005', route: 'Route 5', status: 'Maintenance', fuel: 0, maintenance: 'Scheduled', lastService: 'Today', mileage: 12.9 },
];

const mockHourlyData = [
  { hour: '6 AM', passengers: 45, trips: 8 },
  { hour: '7 AM', passengers: 120, trips: 12 },
  { hour: '8 AM', passengers: 320, trips: 18 },
  { hour: '9 AM', passengers: 280, trips: 15 },
  { hour: '10 AM', passengers: 150, trips: 12 },
  { hour: '11 AM', passengers: 180, trips: 14 },
  { hour: '12 PM', passengers: 220, trips: 16 },
  { hour: '1 PM', passengers: 200, trips: 15 },
  { hour: '2 PM', passengers: 160, trips: 13 },
  { hour: '3 PM', passengers: 190, trips: 14 },
  { hour: '4 PM', passengers: 250, trips: 17 },
  { hour: '5 PM', passengers: 310, trips: 19 },
  { hour: '6 PM', passengers: 290, trips: 18 },
];

const mockPerformanceMetrics = {
  totalRevenue: 45680,
  avgTripTime: 35,
  customerSatisfaction: 4.3,
  fuelEfficiency: 12.1,
  maintenanceCosts: 8900,
  emergencyResponse: 4.2
};

// Additional data for advanced charts
const mockRoutePerformance = [
  { route: 'Route 1', efficiency: 92, revenue: 12500, satisfaction: 4.6, passengers: 850 },
  { route: 'Route 2', efficiency: 78, revenue: 8900, satisfaction: 4.2, passengers: 650 },
  { route: 'Route 3', efficiency: 65, revenue: 7200, satisfaction: 3.9, passengers: 480 },
  { route: 'Route 4', efficiency: 85, revenue: 10200, satisfaction: 4.4, passengers: 720 },
  { route: 'Route 5', efficiency: 72, revenue: 6800, satisfaction: 4.0, passengers: 420 },
  { route: 'Route 6', efficiency: 88, revenue: 11300, satisfaction: 4.5, passengers: 780 },
];

const mockVehicleTypes = [
  { name: 'Buses', value: 18, color: '#3B82F6' },
  { name: 'Mini Buses', value: 4, color: '#10B981' },
  { name: 'Vans', value: 2, color: '#F59E0B' },
];

const mockAlertDistribution = [
  { name: 'Technical', value: 35, color: '#EF4444' },
  { name: 'Traffic', value: 28, color: '#F59E0B' },
  { name: 'Maintenance', value: 22, color: '#3B82F6' },
  { name: 'Emergency', value: 10, color: '#DC2626' },
  { name: 'Other', value: 5, color: '#6B7280' },
];

const mockFuelConsumption = [
  { vehicle: 'BUS001', efficiency: 12.5, distance: 280, fuel: 22.4 },
  { vehicle: 'BUS002', efficiency: 8.2, distance: 190, fuel: 23.2 },
  { vehicle: 'BUS003', efficiency: 13.1, distance: 310, fuel: 23.7 },
  { vehicle: 'VAN001', efficiency: 15.2, distance: 220, fuel: 14.5 },
  { vehicle: 'BUS004', efficiency: 11.8, distance: 260, fuel: 22.0 },
  { vehicle: 'BUS005', efficiency: 12.9, distance: 290, fuel: 22.5 },
];

const mockDriverPerformance = [
  { name: 'Raj Kumar', punctuality: 92, satisfaction: 4.8, trips: 28 },
  { name: 'Priya Sharma', punctuality: 88, satisfaction: 4.6, trips: 25 },
  { name: 'Amit Singh', punctuality: 95, satisfaction: 4.9, trips: 31 },
  { name: 'Rahul Verma', punctuality: 85, satisfaction: 4.4, trips: 22 },
  { name: 'Sita Devi', punctuality: 91, satisfaction: 4.7, trips: 29 },
  { name: 'Mohan Lal', punctuality: 87, satisfaction: 4.5, trips: 26 },
];

const mockWeeklyTrends = [
  { day: 'Mon', passengers: 2400, revenue: 7200, trips: 145 },
  { day: 'Tue', passengers: 2200, revenue: 6600, trips: 132 },
  { day: 'Wed', passengers: 2600, revenue: 7800, trips: 156 },
  { day: 'Thu', passengers: 2500, revenue: 7500, trips: 150 },
  { day: 'Fri', passengers: 2800, revenue: 8400, trips: 168 },
  { day: 'Sat', passengers: 3200, revenue: 9600, trips: 192 },
  { day: 'Sun', passengers: 2900, revenue: 8700, trips: 174 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  const [liveData, setLiveData] = useState(mockData);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        dailyPassengers: prev.dailyPassengers + Math.floor(Math.random() * 5),
        activeTrips: Math.max(8, prev.activeTrips + (Math.random() > 0.5 ? 1 : -1)),
        onTimePerformance: Math.max(70, Math.min(95, prev.onTimePerformance + (Math.random() - 0.5) * 2))
      }));
      setLastUpdated(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transport Analytics Dashboard</h1>
            <div className="flex items-center mt-1">
              <p className="text-sm text-gray-500">Real-time insights and performance metrics</p>
              <div className="ml-3 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-xs text-green-600 font-medium">LIVE DATA</span>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col items-end">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <div className="mt-2 text-xs text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      <nav className="mb-6">
        <div className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'fleet', label: 'Fleet', icon: Truck },
            { id: 'performance', label: 'Performance', icon: TrendingUp },
            { id: 'alerts', label: 'Alerts', icon: Bell },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <Truck className="h-6 w-6 text-blue-600" />
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Active Fleet</p>
                    <p className="text-lg font-medium text-gray-900">{liveData.activeVehicles}/{liveData.totalVehicles}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-green-600" />
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Daily Passengers</p>
                    <p className="text-lg font-medium text-gray-900">{liveData.dailyPassengers.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">On-Time Performance</p>
                    <p className="text-lg font-medium text-gray-900">{Math.round(liveData.onTimePerformance)}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <Activity className="h-6 w-6 text-purple-600" />
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Active Trips</p>
                    <p className="text-lg font-medium text-gray-900">{liveData.activeTrips}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Fleet Status Overview</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{mockData.activeVehicles}</div>
                    <div className="text-sm text-gray-600">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{mockData.totalVehicles - mockData.activeVehicles - 2}</div>
                    <div className="text-sm text-gray-600">Inactive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <div className="text-sm text-gray-600">Maintenance</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center mb-4">
                  <Leaf className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Environmental Impact</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{mockData.co2Saved} kg</div>
                    <div className="text-sm text-gray-600">CO₂ Saved Today</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">89</div>
                    <div className="text-sm text-gray-600">Cars Avoided</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">234.5L</div>
                    <div className="text-sm text-gray-600">Fuel Saved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Hourly Passenger Flow</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={mockHourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [value, name === 'passengers' ? 'Passengers' : 'Trips']} />
                    <Area 
                      type="monotone" 
                      dataKey="passengers" 
                      stackId="1"
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.8}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Fleet Status Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={[
                        { name: 'Active', value: mockData.activeVehicles, color: '#10B981' },
                        { name: 'Maintenance', value: 2, color: '#F59E0B' },
                        { name: 'Inactive', value: mockData.totalVehicles - mockData.activeVehicles - 2, color: '#6B7280' },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, value }: any) => `${name}: ${value}`}
                    >
                      {[
                        { name: 'Active', value: mockData.activeVehicles, color: '#10B981' },
                        { name: 'Maintenance', value: 2, color: '#F59E0B' },
                        { name: 'Inactive', value: mockData.totalVehicles - mockData.activeVehicles - 2, color: '#6B7280' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Route Performance Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockRoutePerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="route" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="passengers" fill="#3B82F6" name="Daily Passengers" />
                  <Bar yAxisId="left" dataKey="efficiency" fill="#10B981" name="Efficiency %" />
                  <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#F59E0B" strokeWidth={3} name="Satisfaction" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Passenger Analytics */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Real-Time Passenger Load</h3>
              <div className="space-y-3">
                {mockRoutes.map((route, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-20 text-sm font-medium">{route.id}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          route.status === 'Overcrowded' ? 'bg-red-500' :
                          route.status === 'High' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(route.passengers / route.capacity) * 100}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-800">
                        {route.passengers}/{route.capacity}
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      route.status === 'Overcrowded' ? 'bg-red-100 text-red-800' :
                      route.status === 'High' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {route.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Trips Completed</span>
                    <span className="text-lg font-semibold text-green-600">{mockData.completedTrips}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Trips</span>
                    <span className="text-lg font-semibold text-blue-600">{mockData.activeTrips}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Delayed Trips</span>
                    <span className="text-lg font-semibold text-red-600">{mockData.delayedTrips}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">On-Time Rate</span>
                      <span className={`text-lg font-semibold ${
                        mockData.onTimePerformance >= 85 ? 'text-green-600' : 
                        mockData.onTimePerformance >= 70 ? 'text-yellow-600' : 'text-red-600'
                      }`}>{mockData.onTimePerformance}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Live Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm text-gray-600">Active Users</span>
                    </div>
                    <span className="text-lg font-semibold">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">App Rating</span>
                    </div>
                    <span className="text-lg font-semibold">4.3/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Avg Wait Time</span>
                    </div>
                    <span className="text-lg font-semibold">8.7 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Peak Load</span>
                    </div>
                    <span className="text-lg font-semibold">91%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'overview' && activeTab === 'fleet' && (
        <div className="space-y-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Real-Time Vehicle Locations</h3>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg h-64 flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                  <p className="text-gray-700 font-medium">Interactive Fleet Tracking Map</p>
                  <p className="text-sm text-gray-500">Real-time GPS positions of {mockVehicles.filter(v => v.status === 'Active').length} active vehicles</p>
                </div>
                {/* Simulated vehicle markers */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-12 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-12 left-16 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 right-8 w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="absolute top-16 left-32 w-3 h-3 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Vehicle Status Table */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Vehicle Fleet Status</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fuel</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Maintenance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockVehicles.map((vehicle, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Truck className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{vehicle.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.route}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            vehicle.status === 'Active' ? 'bg-green-100 text-green-800' :
                            vehicle.status === 'Breakdown' ? 'bg-red-100 text-red-800' :
                            vehicle.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  vehicle.fuel > 70 ? 'bg-green-500' : 
                                  vehicle.fuel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${vehicle.fuel}%` }}
                              />
                            </div>
                            <span className="text-sm">{vehicle.fuel}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-xs px-2 py-1 rounded ${
                            vehicle.maintenance === 'Good' ? 'bg-green-100 text-green-800' :
                            vehicle.maintenance === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                            vehicle.maintenance === 'Due' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {vehicle.maintenance}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vehicle.mileage} km/l
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Route Performance Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockRoutes.map((route, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{route.id}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        route.status === 'Overcrowded' ? 'bg-red-100 text-red-800' :
                        route.status === 'High' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {route.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Passenger Load:</span>
                        <span className="font-medium">{route.passengers}/{route.capacity} ({Math.round((route.passengers / route.capacity) * 100)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            route.status === 'Overcrowded' ? 'bg-red-500' :
                            route.status === 'High' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((route.passengers / route.capacity) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Wait Time:</span>
                          <div className="font-medium">{route.waitTime} min</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Efficiency:</span>
                          <div className="font-medium">{route.efficiency}%</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Delay:</span>
                          <div className={`font-medium ${route.delay > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {route.delay > 0 ? `+${route.delay} min` : 'On Time'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'overview' && activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Route Performance Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Route Revenue Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={mockRoutePerformance}
                      dataKey="revenue"
                      nameKey="route"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={(entry) => `${entry.route}: $${entry.revenue}`}
                    >
                      {mockRoutePerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Vehicle Type Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={mockVehicleTypes}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                    >
                      {mockVehicleTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Driver Performance Scatter Plot */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Driver Performance Analysis</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={mockDriverPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="punctuality" 
                    name="Punctuality"
                    domain={[80, 100]}
                    label={{ value: 'Punctuality (%)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    dataKey="satisfaction" 
                    name="Satisfaction"
                    domain={[4, 5]}
                    label={{ value: 'Customer Satisfaction', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border rounded shadow">
                            <p className="font-semibold">{data.name}</p>
                            <p>Punctuality: {data.punctuality}%</p>
                            <p>Satisfaction: {data.satisfaction}/5</p>
                            <p>Trips: {data.trips}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter dataKey="trips" fill="#3B82F6" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Performance Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Passenger Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockWeeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [value.toLocaleString(), name]} />
                    <Area 
                      type="monotone" 
                      dataKey="passengers" 
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.6}
                      name="Daily Passengers"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue vs Trips Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockWeeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" fill="#10B981" name="Revenue ($)" />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="trips" 
                      stroke="#F59E0B" 
                      strokeWidth={3}
                      name="Trips"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Fuel Efficiency Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Fuel Efficiency by Vehicle</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockFuelConsumption} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="vehicle" type="category" width={80} />
                    <Tooltip formatter={(value) => [`${value} km/l`, 'Efficiency']} />
                    <Bar dataKey="efficiency" fill="#059669">
                      {mockFuelConsumption.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.efficiency > 12 ? '#059669' : entry.efficiency > 10 ? '#F59E0B' : '#EF4444'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Alert Type Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={mockAlertDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockAlertDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Performance Radar Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Overall System Performance Radar</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={[
                  { subject: 'Punctuality', A: mockData.onTimePerformance, fullMark: 100 },
                  { subject: 'Fleet Utilization', A: (mockData.activeVehicles/mockData.totalVehicles)*100, fullMark: 100 },
                  { subject: 'Customer Satisfaction', A: 86, fullMark: 100 },
                  { subject: 'Fuel Efficiency', A: 78, fullMark: 100 },
                  { subject: 'Safety Score', A: 92, fullMark: 100 },
                  { subject: 'Revenue Performance', A: 84, fullMark: 100 },
                ]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Performance" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'overview' && activeTab === 'alerts' && (
        <div className="space-y-6">
          {/* Alert Priority Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-red-50 border border-red-200 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">{mockAlerts.filter(a => a.severity === 'critical').length}</div>
                <div className="text-sm text-gray-700">Critical Alerts</div>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <Shield className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">{mockAlerts.filter(a => a.severity === 'high').length}</div>
                <div className="text-sm text-gray-700">High Priority</div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">{mockAlerts.filter(a => a.severity === 'medium').length}</div>
                <div className="text-sm text-gray-700">Medium Priority</div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">4.2 min</div>
                <div className="text-sm text-gray-700">Avg Response</div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Live Alert Management System</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                    Real-Time Monitoring Active
                  </div>
                  <button className="px-3 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700">
                    Emergency Protocol
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {mockAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className={`p-4 rounded-lg border-l-4 transition-all hover:shadow-md ${
                      alert.severity === 'critical' ? 'bg-red-50 border-red-500 shadow-red-100' :
                      alert.severity === 'high' ? 'bg-orange-50 border-orange-500 shadow-orange-100' :
                      alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500 shadow-yellow-100' :
                      'bg-blue-50 border-blue-500 shadow-blue-100'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3 mt-1">
                          {alert.type === 'sos' && <AlertTriangle className="h-6 w-6 text-red-500" />}
                          {alert.type === 'breakdown' && <Shield className="h-6 w-6 text-orange-500" />}
                          {alert.type === 'connectivity' && <MapPin className="h-6 w-6 text-yellow-500" />}
                          {alert.type === 'delay' && <Clock className="h-6 w-6 text-blue-500" />}
                          {alert.type === 'maintenance' && <Fuel className="h-6 w-6 text-gray-500" />}
                          {alert.type === 'overcrowding' && <Users className="h-6 w-6 text-purple-500" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full uppercase ${
                              alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                              alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                              alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {alert.severity}
                            </span>
                            <span className="text-xs text-gray-500 uppercase font-medium">{alert.type.replace('_', ' ')}</span>
                          </div>
                          <p className="font-medium text-gray-900 mb-1">{alert.message}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>📍 {alert.location}</span>
                            <span>🕐 {alert.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        {alert.severity === 'critical' && (
                          <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 font-medium">
                            Emergency Response
                          </button>
                        )}
                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                          View Details
                        </button>
                        <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">
                          Resolve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alert Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Alert Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium">Emergency/SOS</span>
                    </div>
                    <span className="text-lg font-bold text-red-600">2</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium">Vehicle Breakdown</span>
                    </div>
                    <span className="text-lg font-bold text-orange-600">1</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium">Route Delays</span>
                    </div>
                    <span className="text-lg font-bold text-yellow-600">3</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-t">
                    <span className="text-sm font-medium">Resolved Today</span>
                    <span className="text-lg font-bold text-green-600">15</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Response Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Critical Alert Response</span>
                      <span>&lt; 2 minutes (Target)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <div className="text-xs text-green-600 mt-1">95% within target</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>High Priority Response</span>
                      <span>&lt; 5 minutes (Target)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <div className="text-xs text-yellow-600 mt-1">78% within target</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Resolution Rate</span>
                      <span>Daily Target: 90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <div className="text-xs text-blue-600 mt-1">92% resolved today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-red-50 border border-red-200 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                <h3 className="text-lg font-medium text-red-900">Emergency Response Contacts</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-medium text-gray-900">Control Room</div>
                  <div className="text-sm text-gray-600">📞 +91-98765-43210</div>
                  <div className="text-xs text-green-600 mt-1">● Online</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-medium text-gray-900">Medical Emergency</div>
                  <div className="text-sm text-gray-600">🚑 108 | +91-98765-43211</div>
                  <div className="text-xs text-green-600 mt-1">● Available</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-medium text-gray-900">Traffic Police</div>
                  <div className="text-sm text-gray-600">🚔 +91-98765-43212</div>
                  <div className="text-xs text-green-600 mt-1">● Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'overview' && !['fleet', 'performance', 'alerts'].includes(activeTab) && (
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard
            </h3>
            <p className="text-gray-600 mt-2">
              Advanced {activeTab} analytics and management tools will be available here.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/vehicles" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              <Truck className="h-4 w-4 mr-2" />
              Manage Vehicles
            </Link>
            <Link href="/admin/drivers" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
              <Users className="h-4 w-4 mr-2" />
              Manage Drivers
            </Link>
            <Link href="/admin/allocations" className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Allocation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}