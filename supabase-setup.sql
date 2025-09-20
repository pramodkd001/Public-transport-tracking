-- Create tables for the public transport tracking system

-- Drivers table
CREATE TABLE drivers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255),
    assigned_vehicle_id UUID,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vehicles table
CREATE TABLE vehicles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    number VARCHAR(50) UNIQUE NOT NULL,
    route VARCHAR(255) NOT NULL,
    capacity INTEGER DEFAULT 50,
    is_active BOOLEAN DEFAULT true,
    current_driver_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Allocations table (tracks which driver is assigned to which vehicle)
CREATE TABLE allocations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations table (stores real-time GPS data)
CREATE TABLE locations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    speed DECIMAL(5, 2),
    heading DECIMAL(5, 2),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key constraints
ALTER TABLE drivers ADD CONSTRAINT fk_drivers_vehicle 
    FOREIGN KEY (assigned_vehicle_id) REFERENCES vehicles(id);

ALTER TABLE vehicles ADD CONSTRAINT fk_vehicles_driver 
    FOREIGN KEY (current_driver_id) REFERENCES drivers(id);

-- Create indexes for better performance
CREATE INDEX idx_locations_vehicle_timestamp ON locations(vehicle_id, timestamp DESC);
CREATE INDEX idx_allocations_active ON allocations(is_active, vehicle_id, driver_id);
CREATE INDEX idx_vehicles_active ON vehicles(is_active);
CREATE INDEX idx_drivers_active ON drivers(is_active);

-- Enable Row Level Security
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to vehicles and locations
CREATE POLICY "Public vehicles read access" ON vehicles
    FOR SELECT USING (true);

CREATE POLICY "Public locations read access" ON locations
    FOR SELECT USING (true);

-- Admin policies (you'll need to create admin users)
CREATE POLICY "Admin full access drivers" ON drivers
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access vehicles" ON vehicles
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access allocations" ON allocations
    FOR ALL USING (auth.role() = 'authenticated');

-- Driver policies for location updates
CREATE POLICY "Drivers can insert locations" ON locations
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Drivers can read their data" ON drivers
    FOR SELECT USING (auth.uid()::text = id);

-- Insert sample data
INSERT INTO vehicles (number, route, capacity) VALUES
    ('KA01AB1234', 'Route 1: City Center - Airport', 45),
    ('KA01AB1235', 'Route 2: Railway Station - IT Park', 50),
    ('KA01AB1236', 'Route 3: Bus Stand - University', 40);

INSERT INTO drivers (name, phone, email) VALUES
    ('Raj Kumar', '+919876543210', 'raj.kumar@email.com'),
    ('Priya Sharma', '+919876543211', 'priya.sharma@email.com'),
    ('Amit Singh', '+919876543212', 'amit.singh@email.com');