'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface LocationData {
  lat: number;
  lng: number;
  speed?: number;
  heading?: number;
  accuracy?: number;
  timestamp: number;
}

interface UseLocationTrackingProps {
  vehicleId?: string;
  driverId?: string;
  isTracking: boolean;
  updateInterval?: number; // in milliseconds
}

export function useLocationTracking({ 
  vehicleId, 
  driverId,
  isTracking, 
  updateInterval = 5000 
}: UseLocationTrackingProps) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [updateCount, setUpdateCount] = useState(0);
  const [lastSaveStatus, setLastSaveStatus] = useState<'success' | 'error' | 'local' | null>(null);

  const updateLocationInSupabase = useCallback(async (locationData: LocationData) => {
    if (!vehicleId) {
      console.log('No vehicle ID provided, skipping Supabase update');
      return;
    }

    try {
      // Check if we have a valid Supabase client
      if (!supabase) {
        console.log('Supabase client not available, storing location locally');
        // Store in localStorage as fallback
        const localData = JSON.parse(localStorage.getItem('locationHistory') || '[]');
        localData.push({
          ...locationData,
          vehicleId,
          driverId,
          savedAt: new Date().toISOString()
        });
        localStorage.setItem('locationHistory', JSON.stringify(localData.slice(-50))); // Keep last 50 entries
        setLastSaveStatus('local');
        return;
      }

      // Get the actual driver and vehicle IDs from the database
      console.log('Looking up driver and vehicle data...');
      
      // First, get the vehicle ID by vehicle number
      const { data: vehicleData, error: vehicleError } = await supabase
        .from('vehicles')
        .select('id')
        .eq('vehicle_number', vehicleId)
        .single();

      if (vehicleError || !vehicleData) {
        console.error('Vehicle not found:', vehicleError);
        setLastSaveStatus('error');
        return;
      }

      // Get the first driver for testing (in a real app, this would be the logged-in driver)
      const { data: driverData, error: driverError } = await supabase
        .from('drivers')
        .select('id')
        .limit(1)
        .single();

      if (driverError || !driverData) {
        console.error('Driver not found:', driverError);
        setLastSaveStatus('error');
        return;
      }

      const insertData = {
        vehicle_id: vehicleData.id,
        driver_id: driverData.id,
        latitude: locationData.lat,
        longitude: locationData.lng,
        speed: locationData.speed || 0,
        heading: locationData.heading || 0,
        accuracy: locationData.accuracy || 0,
        timestamp: new Date(locationData.timestamp).toISOString()
      };

      console.log('Inserting location data:', insertData);

      const { data, error } = await supabase
        .from('locations')
        .insert(insertData);

      if (error) {
        console.error('Error saving location to Supabase:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        setLastSaveStatus('error');
        // Fallback to localStorage
        const localData = JSON.parse(localStorage.getItem('locationHistory') || '[]');
        localData.push({
          ...locationData,
          vehicleId,
          driverId,
          savedAt: new Date().toISOString(),
          error: error.message
        });
        localStorage.setItem('locationHistory', JSON.stringify(localData.slice(-50)));
      } else {
        console.log('Location saved successfully:', data);
        setLastSaveStatus('success');
        setUpdateCount(prev => prev + 1);
      }
    } catch (err) {
      console.error('Error updating location:', err);
      setLastSaveStatus('error');
      // Fallback to localStorage
      const localData = JSON.parse(localStorage.getItem('locationHistory') || '[]');
      localData.push({
        ...locationData,
        vehicleId,
        driverId,
        savedAt: new Date().toISOString(),
        error: err instanceof Error ? err.message : 'Unknown error'
      });
      localStorage.setItem('locationHistory', JSON.stringify(localData.slice(-50)));
    }
  }, [vehicleId, driverId]);

  const getCurrentPosition = useCallback((): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationData = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            speed: position.coords.speed || undefined,
            heading: position.coords.heading || undefined,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          };
          resolve(locationData);
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  }, []);

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }

    setError(null);

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const locationData: LocationData = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          speed: position.coords.speed || undefined,
          heading: position.coords.heading || undefined,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };

        setLocation(locationData);
        
        // Update Supabase with new location
        updateLocationInSupabase(locationData);
      },
      (error) => {
        console.error('Location error:', error);
        setError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: updateInterval
      }
    );

    setWatchId(id);
  }, [updateLocationInSupabase, updateInterval]);

  const stopTracking = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  }, [watchId]);

  // Start/stop tracking based on isTracking prop
  useEffect(() => {
    if (isTracking && !watchId) {
      startTracking();
    } else if (!isTracking && watchId) {
      stopTracking();
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking, watchId, startTracking, stopTracking]);

  // Get initial location when tracking starts
  useEffect(() => {
    if (isTracking && !location) {
      getCurrentPosition()
        .then(setLocation)
        .catch((err) => setError(err.message));
    }
  }, [isTracking, location, getCurrentPosition]);

  return {
    location,
    error,
    isWatching: watchId !== null,
    updateCount,
    lastSaveStatus,
    getCurrentPosition,
    startTracking,
    stopTracking
  };
}