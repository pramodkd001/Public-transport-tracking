'use client';

import { useState, useEffect } from 'react';
import { 
  Truck, 
  MapPin, 
  Play, 
  Square, 
  QrCode, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Navigation,
  Satellite,
  Wifi
} from 'lucide-react';
import GoogleMap from '@/components/GoogleMap';
import SimpleMap from '@/components/SimpleMap';
import { useLocationTracking } from '@/hooks/useLocationTracking';

// Mock data for driver
const mockDriverData = {
  id: '1',
  name: 'Raj Kumar',
  phone: '+919876543210',
  assignedVehicle: {
    id: '1',
    number: 'KA01AB1234',
    route: 'Route 1: City Center - Airport',
    capacity: 45
  },
  currentShift: {
    id: '1',
    startTime: '2024-01-20T06:00:00Z',
    isActive: true
  }
};

export default function DriverDashboard() {
  const [driver] = useState(mockDriverData);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingStarted, setTrackingStarted] = useState(false);
  const [locationUpdateCount, setLocationUpdateCount] = useState(0);

  // Use the location tracking hook
  const { 
    location, 
    error: locationError, 
    isWatching,
    updateCount,
    lastSaveStatus,
    getCurrentPosition 
  } = useLocationTracking({
    vehicleId: 'BUS001', // Use vehicle number instead of ID for simplicity
    driverId: 'driver1', // We'll use a simple identifier for testing
    isTracking,
    updateInterval: 5000 // Update every 5 seconds
  });

  // Update location count when location changes
  useEffect(() => {
    if (location && isTracking) {
      setLocationUpdateCount(prev => prev + 1);
    }
  }, [location, isTracking]);

  const handleStartTracking = async () => {
    try {
      // Get initial position
      const initialLocation = await getCurrentPosition();
      setIsTracking(true);
      setTrackingStarted(true);
    } catch (error) {
      console.error('Error getting location:', error);
      // Show error to user but still allow manual start for demo
      setIsTracking(true);
      setTrackingStarted(true);
    }
  };

  const handleStopTracking = () => {
    setIsTracking(false);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString();
  };

  const getShiftDuration = () => {
    const start = new Date(driver.currentShift.startTime);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="px-4 py-6 max-w-md mx-auto">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome, {driver.name}
          </h1>
          <p className="text-sm text-gray-600">{driver.phone}</p>
        </div>
      </div>

      {/* Vehicle Assignment */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Assigned Vehicle
        </h2>
        {driver.assignedVehicle ? (
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium text-gray-900">
                {driver.assignedVehicle.number}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Assigned
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {driver.assignedVehicle.route}
            </p>
            <p className="text-xs text-gray-500">
              Capacity: {driver.assignedVehicle.capacity} passengers
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
            <p className="text-gray-600">No vehicle assigned</p>
          </div>
        )}
      </div>

      {/* Vehicle Confirmation */}
      {driver.assignedVehicle && !trackingStarted && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800 mb-2">
                Confirm Vehicle Access
              </h3>
              <p className="text-sm text-yellow-700 mb-4">
                Please confirm you are seated in vehicle {driver.assignedVehicle.number} to start tracking.
              </p>
              <div className="flex gap-3">
                <button className="flex items-center px-3 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700">
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan QR
                </button>
                <button 
                  onClick={handleStartTracking}
                  className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                >
                  Confirm Manually
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tracking Status */}
      {trackingStarted && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Tracking Status
            </h2>
            <div className={`flex items-center ${isTracking ? 'text-green-600' : 'text-red-600'}`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${isTracking ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="text-sm font-medium">
                {isTracking ? 'Active' : 'Stopped'}
              </span>
            </div>
          </div>

          {/* Current Shift Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Shift Started</p>
                <p className="font-medium">{formatTime(driver.currentShift.startTime)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">{getShiftDuration()}</p>
              </div>
            </div>
          </div>

          {/* Location Info */}
          {location && (
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Speed:</span>
                <span className="font-medium">
                  {location.speed ? `${location.speed.toFixed(1)} km/h` : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Heading:</span>
                <span className="font-medium">
                  {location.heading ? `${location.heading.toFixed(0)}°` : 'N/A'}
                </span>
              </div>
              {location.accuracy && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="font-medium">{location.accuracy.toFixed(0)}m</span>
                </div>
              )}
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex gap-3">
            {!isTracking ? (
              <button
                onClick={handleStartTracking}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Tracking
              </button>
            ) : (
              <button
                onClick={handleStopTracking}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
              >
                <Square className="h-5 w-5 mr-2" />
                Stop Tracking
              </button>
            )}
          </div>

          {isTracking && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-800">
                    Your location is being shared with passengers
                  </span>
                </div>
                <div className="flex items-center text-xs text-green-600">
                  <Wifi className="h-4 w-4 mr-1" />
                  <span>{updateCount || locationUpdateCount} updates</span>
                </div>
              </div>
              {lastSaveStatus && (
                <div className="mt-2 text-xs">
                  <span className={`px-2 py-1 rounded-full ${
                    lastSaveStatus === 'success' ? 'bg-green-100 text-green-700' :
                    lastSaveStatus === 'local' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {lastSaveStatus === 'success' ? 'Saved to Cloud' :
                     lastSaveStatus === 'local' ? 'Saved Locally' :
                     'Save Failed'}
                  </span>
                </div>
              )}
            </div>
          )}

          {locationError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-sm text-red-800">
                  Location Error: {locationError}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Simple Map (fallback for Google Maps API issues) */}
      {trackingStarted && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Live Location
            </h2>
            <div className="flex items-center text-sm text-gray-600">
              <Satellite className="h-4 w-4 mr-1" />
              <span>{isWatching ? 'GPS Active' : 'GPS Inactive'}</span>
            </div>
          </div>
          
          <SimpleMap 
            location={location ? { lat: location.lat, lng: location.lng } : null}
            zoom={16}
            className="w-full h-64"
          />
          
          {location && (
            <div className="mt-3 text-xs text-gray-500 text-center">
              Last updated: {new Date(location.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      )}

      {/* Google Maps Integration (only if API key is working) */}
      {false && trackingStarted && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Live Location Map
            </h2>
            <div className="flex items-center text-sm text-gray-600">
              <Satellite className="h-4 w-4 mr-1" />
              <span>{isWatching ? 'GPS Active' : 'GPS Inactive'}</span>
            </div>
          </div>
          
          <GoogleMap 
            location={location ? { lat: location.lat, lng: location.lng } : null}
            zoom={16}
            className="w-full h-64 rounded-lg"
          />
          
          {location && (
            <div className="mt-3 text-xs text-gray-500 text-center">
              Last updated: {new Date(location.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      )}

      {/* Quick Stats */}
      {trackingStarted && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <MapPin className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Updates Sent</p>
            <p className="text-lg font-semibold text-gray-900">
              {isTracking ? Math.floor(Math.random() * 50) + 10 : 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Next Stop</p>
            <p className="text-lg font-semibold text-gray-900">2 min</p>
          </div>
        </div>
      )}

      {/* Debug Information */}
      {trackingStarted && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Debug Information
          </h2>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>GPS Status:</span>
              <span className={isWatching ? 'text-green-600' : 'text-red-600'}>
                {isWatching ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Updates Sent:</span>
              <span>{updateCount || locationUpdateCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Last Save:</span>
              <span className={
                lastSaveStatus === 'success' ? 'text-green-600' :
                lastSaveStatus === 'local' ? 'text-yellow-600' :
                lastSaveStatus === 'error' ? 'text-red-600' : 'text-gray-600'
              }>
                {lastSaveStatus || 'None'}
              </span>
            </div>
            {location && (
              <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
                <div>Lat: {location.lat.toFixed(6)}</div>
                <div>Lng: {location.lng.toFixed(6)}</div>
                <div>Accuracy: {location.accuracy?.toFixed(0)}m</div>
                <div>Time: {new Date(location.timestamp).toLocaleTimeString()}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <h3 className="text-sm font-medium text-red-800 mb-2">
          Emergency Contact
        </h3>
        <p className="text-sm text-red-700 mb-3">
          In case of emergency, contact the control room immediately.
        </p>
        <button className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700">
          Call Emergency: +91-1800-XXX-XXXX
        </button>
      </div>
    </div>
  );
}