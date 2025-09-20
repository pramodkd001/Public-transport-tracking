'use client';

import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Navigation, 
  Users, 
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Mock data for live buses
const mockBuses = [
  {
    id: '1',
    number: 'KA01AB1234',
    route: 'Route 1: City Center - Airport',
    driver: 'Raj Kumar',
    location: { lat: 12.9716, lng: 77.5946 },
    speed: 35,
    heading: 90,
    passengers: 23,
    capacity: 45,
    nextStop: 'MG Road',
    eta: 3,
    lastUpdate: '30 sec ago',
    status: 'moving'
  },
  {
    id: '2',
    number: 'KA01AB1235', 
    route: 'Route 2: Railway Station - IT Park',
    driver: 'Priya Sharma',
    location: { lat: 12.9816, lng: 77.6046 },
    speed: 0,
    heading: 180,
    passengers: 15,
    capacity: 50,
    nextStop: 'Brigade Road',
    eta: 1,
    lastUpdate: '1 min ago',
    status: 'stopped'
  },
  {
    id: '3',
    number: 'KA01AB1237',
    route: 'Route 4: Market - Hospital',
    driver: 'Rahul Verma',
    location: { lat: 12.9616, lng: 77.5846 },
    speed: 45,
    heading: 270,
    passengers: 32,
    capacity: 42,
    nextStop: 'Central Mall',
    eta: 5,
    lastUpdate: '45 sec ago',
    status: 'moving'
  }
];

const mockStops = [
  'City Center', 'MG Road', 'Brigade Road', 'Koramangala', 'BTM Layout',
  'Railway Station', 'IT Park', 'Electronic City', 'Silk Board',
  'Bus Stand', 'University', 'Hospital', 'Market', 'Central Mall', 'Airport'
];

export default function TrackPage() {
  const [buses, setBuses] = useState(mockBuses);
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStop, setSelectedStop] = useState('');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => ({
          ...bus,
          location: {
            lat: bus.location.lat + (Math.random() - 0.5) * 0.001,
            lng: bus.location.lng + (Math.random() - 0.5) * 0.001
          },
          speed: bus.status === 'moving' ? Math.random() * 60 : 0,
          passengers: Math.max(0, Math.min(bus.capacity, bus.passengers + Math.floor((Math.random() - 0.5) * 4))),
          eta: Math.max(1, bus.eta + Math.floor((Math.random() - 0.5) * 2)),
          lastUpdate: Math.random() > 0.7 ? 'Just now' : bus.lastUpdate
        }))
      );
      setLastRefresh(new Date());
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const routes = ['all', ...Array.from(new Set(buses.map(bus => bus.route)))];

  const filteredBuses = buses.filter(bus => {
    const matchesRoute = selectedRoute === 'all' || bus.route === selectedRoute;
    const matchesSearch = bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.nextStop.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStop = !selectedStop || bus.route.toLowerCase().includes(selectedStop.toLowerCase()) ||
                       bus.nextStop.toLowerCase().includes(selectedStop.toLowerCase());
    return matchesRoute && matchesSearch && matchesStop;
  });

  const handleRefresh = () => {
    // Simulate refresh with slight data changes
    setBuses(prevBuses => 
      prevBuses.map(bus => ({
        ...bus,
        lastUpdate: 'Just now',
        eta: Math.max(1, bus.eta + Math.floor((Math.random() - 0.5) * 2))
      }))
    );
    setLastRefresh(new Date());
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'moving': return 'text-green-600 bg-green-100';
      case 'stopped': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getOccupancyColor = (passengers: number, capacity: number) => {
    const percentage = (passengers / capacity) * 100;
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-2">Live Bus Tracking</h1>
          <p className="text-blue-100">Real-time locations and arrival times</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Find Your Bus</h2>
            <button 
              onClick={handleRefresh}
              className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search buses, routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
              />
            </div>
            
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            >
              <option value="all">All Routes</option>
              {routes.slice(1).map(route => (
                <option key={route} value={route}>{route}</option>
              ))}
            </select>
            
            <select
              value={selectedStop}
              onChange={(e) => setSelectedStop(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            >
              <option value="">All Stops</option>
              {mockStops.map(stop => (
                <option key={stop} value={stop}>{stop}</option>
              ))}
            </select>
          </div>
          
          <div className="mt-3 text-xs text-gray-500">
            Last updated: {lastRefresh.toLocaleTimeString()} • {filteredBuses.length} buses found
          </div>
        </div>

        {/* Live Buses */}
        <div className="space-y-4">
          {filteredBuses.map((bus) => (
            <div key={bus.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {bus.number}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(bus.status)}`}>
                      {bus.status === 'moving' ? 'Moving' : 'Stopped'}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getOccupancyColor(bus.passengers, bus.capacity)}`}>
                      {Math.round((bus.passengers / bus.capacity) * 100)}% Full
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{bus.route}</p>
                  <p className="text-xs text-gray-500">Driver: {bus.driver}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {bus.eta} min
                  </div>
                  <div className="text-xs text-gray-500">to {bus.nextStop}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-medium">{bus.location.lat.toFixed(4)}, {bus.location.lng.toFixed(4)}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Navigation className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <p className="text-gray-600">Speed</p>
                    <p className="font-medium">{bus.speed.toFixed(0)} km/h</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <p className="text-gray-600">Passengers</p>
                    <p className="font-medium">{bus.passengers}/{bus.capacity}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <p className="text-gray-600">Updated</p>
                    <p className="font-medium">{bus.lastUpdate}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  Real-time tracking active
                </div>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBuses.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No buses found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or check back later.</p>
          </div>
        )}

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Status Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span>Moving</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              <span>Stopped</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-100 border border-green-400 rounded-full mr-2"></div>
              <span>&lt;70% Full</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-100 border border-red-400 rounded-full mr-2"></div>
              <span>&gt;90% Full</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}