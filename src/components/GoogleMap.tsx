'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  location: { lat: number; lng: number } | null;
  zoom?: number;
  className?: string;
  onLocationUpdate?: (location: { lat: number; lng: number }) => void;
}

export default function GoogleMap({ 
  location, 
  zoom = 15, 
  className = "w-full h-64 rounded-lg",
  onLocationUpdate 
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBfNXjwxLlIz0_-F8FHd8dVGjvCvV6v1c8', // Demo key - replace with your own
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      setIsLoaded(true);
    }).catch(error => {
      console.error('Error loading Google Maps:', error);
      setIsLoaded(true); // Still set to true to show fallback
    });
  }, []);

  useEffect(() => {
    if (isLoaded && mapRef.current && !map) {
      const defaultLocation = location || { lat: 12.9716, lng: 77.5946 }; // Bangalore default
      
      const googleMap = new google.maps.Map(mapRef.current, {
        center: defaultLocation,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true
      });

      const mapMarker = new google.maps.Marker({
        position: defaultLocation,
        map: googleMap,
        title: 'Vehicle Location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#4285F4',
          fillOpacity: 0.8,
          strokeWeight: 2,
          strokeColor: '#ffffff'
        }
      });

      setMap(googleMap);
      setMarker(mapMarker);
    }
  }, [isLoaded, map, location, zoom]);

  useEffect(() => {
    if (map && marker && location) {
      const newPosition = { lat: location.lat, lng: location.lng };
      
      // Update marker position
      marker.setPosition(newPosition);
      
      // Center map on new location
      map.setCenter(newPosition);
      
      // Call callback if provided
      if (onLocationUpdate) {
        onLocationUpdate(newPosition);
      }
    }
  }, [location, map, marker, onLocationUpdate]);

  if (!isLoaded) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapRef} className={className} />
      {location && (
        <div className="absolute top-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs shadow">
          <div>Lat: {location.lat.toFixed(6)}</div>
          <div>Lng: {location.lng.toFixed(6)}</div>
        </div>
      )}
    </div>
  );
}