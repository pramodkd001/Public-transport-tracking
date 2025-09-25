'use client';

import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Users, 
  Phone,
  AlertCircle,
  CheckCircle,
  Satellite,
  Activity,
  Settings,
  RefreshCw,
  PowerCircle
} from 'lucide-react';
import { useLocationTracking } from '@/hooks/useLocationTracking';

export default function DriverPage() {
  const [driverId] = useState('DRV001'); // In real app, this would come from auth
  const [vehicleId, setVehicleId] = useState('');
  const [vehicleConfirmed, setVehicleConfirmed] = useState(false);
  const [trackingActive, setTrackingActive] = useState(false);
  const [lastKnownLocation, setLastKnownLocation] = useState<{lat: number, lng: number} | null>(null);
  
  const { 
    location, 
    error,
    isWatching,
    updateCount,
    lastSaveStatus,
    getCurrentPosition,
    startTracking: startLocationTracking,
    stopTracking: stopLocationTracking
  } = useLocationTracking({
    vehicleId: vehicleConfirmed ? vehicleId : undefined,
    driverId,
    isTracking: trackingActive
  });

  // Vehicle options (in real app, this would come from API)
  const availableVehicles = [
    { id: 'BUS001', number: 'KA01AB1234', route: 'Route 1: City Center - Airport' },
    { id: 'BUS002', number: 'KA01AB1235', route: 'Route 2: Railway Station - IT Park' },
    { id: 'BUS003', number: 'KA01AB1237', route: 'Route 4: Market - Hospital' }
  ];

  const selectedVehicle = availableVehicles.find(v => v.id === vehicleId);

  useEffect(() => {
    // Update tracking status based on the hook
    setTrackingActive(isWatching);
    if (location) {
      setLastKnownLocation({ lat: location.lat, lng: location.lng });
    }
  }, [isWatching, location]);

  const handleVehicleConfirm = () => {
    if (vehicleId) {
      setVehicleConfirmed(true);
    }
  };

  const handleStartTracking = () => {
    if (vehicleId && driverId) {
      setTrackingActive(true);
    }
  };

  const handleStopTracking = () => {
    if (vehicleId) {
      setTrackingActive(false);
    }
  };

  const handleEmergency = () => {
    alert('Emergency services contacted! (Demo feature)');
  };

  const getAccuracyColor = (accuracy?: number) => {
    if (!accuracy) return 'text-gray-500';
    if (accuracy <= 10) return 'text-green-600';
    if (accuracy <= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSignalStrength = (accuracy?: number) => {
    if (!accuracy) return 'Poor';
    if (accuracy <= 10) return 'Excellent';
    if (accuracy <= 30) return 'Good';
    if (accuracy <= 50) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-2">Driver Dashboard</h1>
          <p className="text-green-100">GPS Location Tracking & Vehicle Management</p>
          
          {/* Quick Status */}
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${trackingActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span>{trackingActive ? 'GPS Active' : 'GPS Inactive'}</span>
            </div>
            <div className="flex items-center">
              <Satellite className="h-4 w-4 mr-1" />
              <span>Signal: {getSignalStrength(location?.accuracy)}</span>
            </div>
            {location && (
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-1" />
                <span>Speed: {location.speed ? `${Math.round(location.speed)} km/h` : '0 km/h'}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Vehicle Assignment */}
        {!vehicleConfirmed ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Settings className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Select Your Vehicle</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Vehicles
                </label>
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                >
                  <option value="">Select a vehicle...</option>
                  {availableVehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.number} - {vehicle.route}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleVehicleConfirm}
                disabled={!vehicleId}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                Confirm Vehicle Assignment
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Vehicle Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Vehicle Assignment</h2>
                </div>
                <button 
                  onClick={() => setVehicleConfirmed(false)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Change Vehicle
                </button>
              </div>
              
              {selectedVehicle && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900">{selectedVehicle.number}</h3>
                  <p className="text-green-700 text-sm">{selectedVehicle.route}</p>
                  <p className="text-green-600 text-xs mt-1">Driver ID: {driverId}</p>
                </div>
              )}
            </div>

            {/* GPS Tracking Control */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Satellite className="h-5 w-5 text-gray-400 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">GPS Tracking</h2>
                </div>
                <div className={`flex items-center px-3 py-1 rounded-full text-sm ${trackingActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  <PowerCircle className="h-4 w-4 mr-1" />
                  {trackingActive ? 'Active' : 'Inactive'}
                </div>
              </div>

              {/* GPS Status */}
              {location && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Current Location</p>
                        <p className="text-xs text-blue-700">
                          {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Activity className="h-5 w-5 text-yellow-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-yellow-900">GPS Accuracy</p>
                        <p className={`text-xs ${getAccuracyColor(location.accuracy)}`}>
                          ±{location.accuracy ? Math.round(location.accuracy) : 'Unknown'} meters
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-green-900">Last Update</p>
                        <p className="text-xs text-green-700">
                          {location ? new Date(location.timestamp).toLocaleTimeString() : 'Never'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-red-900">GPS Error</p>
                      <p className="text-xs text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex gap-4">
                {!trackingActive ? (
                  <button
                    onClick={handleStartTracking}
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Start GPS Tracking
                  </button>
                ) : (
                  <button
                    onClick={handleStopTracking}
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                  >
                    <PowerCircle className="h-4 w-4 mr-2" />
                    Stop GPS Tracking
                  </button>
                )}
                
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How GPS Tracking Works</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">1</div>
                  <div>
                    <p className="font-medium">Start Tracking</p>
                    <p className="text-gray-600">Click "Start GPS Tracking" to begin sharing your location with passengers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">2</div>
                  <div>
                    <p className="font-medium">Live Updates</p>
                    <p className="text-gray-600">Your location updates every few seconds and is stored locally for reliability</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">3</div>
                  <div>
                    <p className="font-medium">Passenger Access</p>
                    <p className="text-gray-600">Passengers can see your bus location in real-time on the tracking page</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Emergency Support</h3>
                  <p className="text-gray-600 text-sm">Quick access to help and support</p>
                </div>
                <button
                  onClick={handleEmergency}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}