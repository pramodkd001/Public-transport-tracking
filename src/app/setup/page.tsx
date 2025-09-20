'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DatabaseSetup() {
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const createTables = async () => {
    setIsCreating(true);
    setStatus('Creating database tables...');
    setLogs([]);

    try {
      addLog('Starting database setup...');

      // First, let's test the connection
      const { data: testData, error: testError } = await supabase
        .from('_test')
        .select('*')
        .limit(1);

      if (testError && testError.code !== 'PGRST116') { // PGRST116 is "table not found" which is expected
        addLog(`Connection test failed: ${testError.message}`);
        throw testError;
      }

      addLog('Supabase connection successful');

      // Create vehicles table
      addLog('Creating vehicles table...');
      const { error: vehiclesError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS vehicles (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            number VARCHAR(50) UNIQUE NOT NULL,
            route VARCHAR(255) NOT NULL,
            capacity INTEGER DEFAULT 50,
            is_active BOOLEAN DEFAULT true,
            current_driver_id UUID,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });

      if (vehiclesError) {
        addLog(`Vehicles table error: ${vehiclesError.message}`);
      } else {
        addLog('Vehicles table created successfully');
      }

      // Create drivers table
      addLog('Creating drivers table...');
      const { error: driversError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS drivers (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(20) UNIQUE NOT NULL,
            email VARCHAR(255),
            assigned_vehicle_id UUID,
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });

      if (driversError) {
        addLog(`Drivers table error: ${driversError.message}`);
      } else {
        addLog('Drivers table created successfully');
      }

      // Create locations table
      addLog('Creating locations table...');
      const { error: locationsError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS locations (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            vehicle_id UUID NOT NULL,
            latitude DECIMAL(10, 8) NOT NULL,
            longitude DECIMAL(11, 8) NOT NULL,
            speed DECIMAL(5, 2),
            heading DECIMAL(5, 2),
            timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });

      if (locationsError) {
        addLog(`Locations table error: ${locationsError.message}`);
      } else {
        addLog('Locations table created successfully');
      }

      // Insert sample data
      addLog('Inserting sample data...');
      
      // Insert vehicles
      const { error: vehicleInsertError } = await supabase
        .from('vehicles')
        .upsert([
          { id: '1', number: 'KA01AB1234', route: 'Route 1: City Center - Airport', capacity: 45 },
          { id: '2', number: 'KA01AB1235', route: 'Route 2: Railway Station - IT Park', capacity: 50 },
          { id: '3', number: 'KA01AB1236', route: 'Route 3: Bus Stand - University', capacity: 40 }
        ], { onConflict: 'number' });

      if (vehicleInsertError) {
        addLog(`Vehicle insert error: ${vehicleInsertError.message}`);
      } else {
        addLog('Sample vehicles inserted');
      }

      // Insert drivers
      const { error: driverInsertError } = await supabase
        .from('drivers')
        .upsert([
          { id: '1', name: 'Raj Kumar', phone: '+919876543210', email: 'raj.kumar@email.com' },
          { id: '2', name: 'Priya Sharma', phone: '+919876543211', email: 'priya.sharma@email.com' },
          { id: '3', name: 'Amit Singh', phone: '+919876543212', email: 'amit.singh@email.com' }
        ], { onConflict: 'phone' });

      if (driverInsertError) {
        addLog(`Driver insert error: ${driverInsertError.message}`);
      } else {
        addLog('Sample drivers inserted');
      }

      addLog('Database setup completed successfully!');
      setStatus('Setup completed successfully!');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog(`Setup failed: ${errorMessage}`);
      setStatus(`Setup failed: ${errorMessage}`);
    }

    setIsCreating(false);
  };

  const testConnection = async () => {
    try {
      setStatus('Testing connection...');
      addLog('Testing Supabase connection...');
      
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .limit(1);

      if (error) {
        addLog(`Connection test error: ${error.message}`);
        setStatus(`Connection error: ${error.message}`);
      } else {
        addLog('Connection successful!');
        setStatus('Connection successful!');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog(`Connection failed: ${errorMessage}`);
      setStatus(`Connection failed: ${errorMessage}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Database Setup</h1>
      
      <div className="space-y-4 mb-6">
        <button
          onClick={testConnection}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-4"
        >
          Test Connection
        </button>
        
        <button
          onClick={createTables}
          disabled={isCreating}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isCreating ? 'Creating...' : 'Create Tables & Sample Data'}
        </button>
      </div>

      {status && (
        <div className={`p-4 rounded mb-4 ${
          status.includes('error') || status.includes('failed') 
            ? 'bg-red-100 text-red-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {status}
        </div>
      )}

      {logs.length > 0 && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Setup Logs:</h3>
          <div className="text-sm space-y-1 max-h-64 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="font-mono text-xs">{log}</div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-50 rounded">
        <h3 className="font-semibold text-yellow-800 mb-2">Note:</h3>
        <p className="text-yellow-700 text-sm">
          If the automatic setup fails, you may need to run the SQL commands manually in your Supabase dashboard.
          Check the SQL file in the project root for the complete setup script.
        </p>
      </div>
    </div>
  );
}