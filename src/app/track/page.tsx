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
  CheckCircle,
  Satellite,
  Phone,
  MessageSquare
} from 'lucide-react';
import { getAllTrackedVehicles } from '@/hooks/useLocationTracking';

// Enhanced bus data structure with real-time capabilities
interface Bus {
  id: string;
  number: string;
  route: string;
  driver: string;
  location: { lat: number; lng: number };
  speed?: number;
  heading?: number;
  accuracy?: number;
  passengers: number;
  capacity: number;
  nextStop: string;
  eta: number;
  lastUpdate: string;
  status: 'moving' | 'stopped' | 'offline';
  isRealTime: boolean; // True if getting real GPS data
}

// Mock data with some buses that could have real GPS data
const mockBusesTemplate = [
  {
    id: 'BUS001',
    number: 'KA01AB1234',
    route: 'Route 1: City Center - Airport',
    driver: 'Raj Kumar',
    location: { lat: 12.9716, lng: 77.5946 },
    passengers: 23,
    capacity: 45,
    nextStop: 'MG Road',
    eta: 3,
    status: 'moving' as const
  },
  {
    id: 'BUS002',
    number: 'KA01AB1235', 
    route: 'Route 2: Railway Station - IT Park',
    driver: 'Priya Sharma',
    location: { lat: 12.9816, lng: 77.6046 },
    passengers: 15,
    capacity: 50,
    nextStop: 'Brigade Road',
    eta: 1,
    status: 'stopped' as const
  },
  {
    id: 'BUS003',
    number: 'KA01AB1237',
    route: 'Route 4: Market - Hospital',
    driver: 'Rahul Verma',
    location: { lat: 12.9616, lng: 77.5846 },
    passengers: 32,
    capacity: 42,
    nextStop: 'Central Mall',
    eta: 5,
    status: 'moving' as const
  }
];

const mockStops = [
  'City Center', 'MG Road', 'Brigade Road', 'Koramangala', 'BTM Layout',
  'Railway Station', 'IT Park', 'Electronic City', 'Silk Board',
  'Bus Stand', 'University', 'Hospital', 'Market', 'Central Mall', 'Airport'
];

export default function TrackPage() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStop, setSelectedStop] = useState('');
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [realTimeCount, setRealTimeCount] = useState(0);

  // Load and merge real GPS data with mock data
  const loadBusData = () => {
    const trackedVehicles = getAllTrackedVehicles();
    const updatedBuses: Bus[] = [];

    // First add buses with real GPS data
    trackedVehicles.forEach(vehicle => {
      const timeSinceUpdate = Date.now() - vehicle.location.timestamp;
      const isRecent = timeSinceUpdate < 60000; // Consider data fresh if < 1 minute old
      
      updatedBuses.push({
        id: vehicle.vehicleId,
        number: vehicle.vehicleId,
        route: `Live Route - Vehicle ${vehicle.vehicleId}`,
        driver: `Driver ${vehicle.driverId}`,
        location: vehicle.location,
        speed: vehicle.location.speed,
        heading: vehicle.location.heading,
        accuracy: vehicle.location.accuracy,
        passengers: Math.floor(Math.random() * 40) + 5,
        capacity: 45,
        nextStop: mockStops[Math.floor(Math.random() * mockStops.length)],
        eta: Math.floor(Math.random() * 10) + 1,
        lastUpdate: vehicle.lastUpdate,
        status: isRecent ? (vehicle.location.speed && vehicle.location.speed > 5 ? 'moving' : 'stopped') : 'offline',
        isRealTime: true
      });
    });

    // Then add mock buses that don't have real GPS data
    mockBusesTemplate.forEach(mockBus => {
      // Don't add if we already have real GPS data for this vehicle
      if (!trackedVehicles.find(v => v.vehicleId === mockBus.id)) {
        updatedBuses.push({
          ...mockBus,
          speed: mockBus.status === 'moving' ? Math.random() * 60 : 0,
          heading: Math.random() * 360,
          lastUpdate: `${Math.floor(Math.random() * 5) + 1} min ago`,
          isRealTime: false
        });
      }
    });

    setBuses(updatedBuses);
    setRealTimeCount(trackedVehicles.length);
    setLastRefresh(new Date());
  };

  // Initial load and periodic updates
  useEffect(() => {
    loadBusData();
    
    const interval = setInterval(() => {
      loadBusData();
      
      // Update mock data with small changes for demo
      setBuses(prevBuses => 
        prevBuses.map(bus => {
          if (bus.isRealTime) return bus; // Don't modify real GPS data
          
          return {
            ...bus,
            location: {
              lat: bus.location.lat + (Math.random() - 0.5) * 0.001,
              lng: bus.location.lng + (Math.random() - 0.5) * 0.001
            },
            speed: bus.status === 'moving' ? Math.random() * 60 : 0,
            passengers: Math.max(0, Math.min(bus.capacity, bus.passengers + Math.floor((Math.random() - 0.5) * 4))),
            eta: Math.max(1, bus.eta + Math.floor((Math.random() - 0.5) * 2))
          };
        })
      );
    }, 5000); // Update every 5 seconds

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
    loadBusData();
  };

  const getStatusColor = (status: string, isRealTime: boolean) => {
    if (status === 'offline') return 'text-gray-600 bg-gray-100';
    if (isRealTime) {
      switch (status) {
        case 'moving': return 'text-green-600 bg-green-100 ring-2 ring-green-300';
        case 'stopped': return 'text-yellow-600 bg-yellow-100 ring-2 ring-yellow-300';
        default: return 'text-gray-600 bg-gray-100';
      }
    } else {
      switch (status) {
        case 'moving': return 'text-green-600 bg-green-100';
        case 'stopped': return 'text-yellow-600 bg-yellow-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    }
  };

  const getOccupancyColor = (passengers: number, capacity: number) => {
    const percentage = (passengers / capacity) * 100;
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getDirections = (bus: Bus) => {
    const { lat, lng } = bus.location;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
    window.open(googleMapsUrl, '_blank');
  };

  const callDriver = (driver: string) => {
    // In a real app, this would call the actual driver phone number
    alert(`Calling ${driver}... (Demo: Phone feature not implemented)`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-2">Live Bus Tracking</h1>
          <p className="text-blue-100 mb-3">Real-time locations and arrival times</p>
          
          {/* Real-time status */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span>{realTimeCount} buses with live GPS</span>
            </div>
            <div className="flex items-center">
              <Satellite className="h-4 w-4 mr-1" />
              <span>{buses.filter(b => !b.isRealTime).length} simulated buses</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Find Your Bus</h2>
            <button 
              onClick={handleRefresh}
              className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
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
            Last updated: {lastRefresh.toLocaleTimeString()} • {filteredBuses.length} buses found • {realTimeCount} with real GPS
          </div>
        </div>

        {/* Live Buses */}
        <div className="space-y-4">
          {filteredBuses.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No buses found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or check back later.</p>
            </div>
          ) : (
            filteredBuses.map((bus) => (
              <div key={bus.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg text-gray-900">{bus.number}</h3>
                      {bus.isRealTime && (
                        <div className="flex items-center text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                          LIVE GPS
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{bus.route}</p>
                    <p className="text-gray-500 text-xs mt-1">Driver: {bus.driver}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bus.status, bus.isRealTime)}`}>
                      {bus.status === 'moving' ? 'Moving' : bus.status === 'stopped' ? 'Stopped' : 'Offline'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{bus.nextStop}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{bus.eta} min</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-gray-400 mr-2" />
                    <span className={`px-2 py-1 rounded-full text-xs ${getOccupancyColor(bus.passengers, bus.capacity)}`}>
                      {bus.passengers}/{bus.capacity}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Navigation className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">
                      {bus.speed ? `${Math.round(bus.speed)} km/h` : '0 km/h'}
                    </span>
                  </div>
                </div>

                {/* GPS Details for Real-time buses */}
                {bus.isRealTime && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-700 font-medium mb-2">📡 Live GPS Data</div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-green-600">
                      <div>Lat: {bus.location.lat.toFixed(6)}</div>
                      <div>Lng: {bus.location.lng.toFixed(6)}</div>
                      {bus.accuracy && <div>Accuracy: ±{Math.round(bus.accuracy)}m</div>}
                      {bus.heading && <div>Heading: {Math.round(bus.heading)}°</div>}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    <CheckCircle className="inline h-3 w-3 mr-1" />
                    Updated: {bus.lastUpdate}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => callDriver(bus.driver)}
                      className="flex items-center text-green-600 hover:text-green-800 text-sm font-medium px-2 py-1 hover:bg-green-50 rounded"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </button>
                    <button 
                      onClick={() => getDirections(bus)}
                      className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium px-2 py-1 hover:bg-blue-50 rounded"
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      Directions
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Status Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span>Live GPS Active</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span>Moving</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              <span>Stopped</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
              <span>Offline</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}