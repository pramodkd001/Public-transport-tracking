'use client';

import { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface SimpleMapProps {
  location: { lat: number; lng: number } | null;
  zoom?: number;
  className?: string;
}

export default function SimpleMap({ location, zoom = 16, className = '' }: SimpleMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <MapPin className="h-8 w-8 mx-auto mb-2" />
          <p>No location data</p>
        </div>
      </div>
    );
  }

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${location.lat},${location.lng}&z=${zoom}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg overflow-hidden ${className}`}>
      <div className="p-4 text-center">
        <div className="mb-4">
          <Navigation className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">Current Location</h3>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="bg-white rounded p-2">
            <span className="text-gray-600">Latitude:</span>
            <span className="font-mono ml-2">{location.lat.toFixed(6)}</span>
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-gray-600">Longitude:</span>
            <span className="font-mono ml-2">{location.lng.toFixed(6)}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <button
            onClick={openInGoogleMaps}
            className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
          >
            Open in Google Maps
          </button>
          <div className="text-xs text-gray-500">
            Click to view location on Google Maps
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Note:</strong> This is a simplified map view. 
            Set up Google Maps API key for full map functionality.
          </p>
        </div>
      </div>
    </div>
  );
}