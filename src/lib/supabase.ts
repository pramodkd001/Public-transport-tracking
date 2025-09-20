import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-key'

// For client-side usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side usage
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export type Database = {
  public: {
    Tables: {
      drivers: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          assigned_vehicle_id: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email?: string | null
          assigned_vehicle_id?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string | null
          assigned_vehicle_id?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      vehicles: {
        Row: {
          id: string
          number: string
          route: string
          capacity: number
          is_active: boolean
          current_driver_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          number: string
          route: string
          capacity?: number
          is_active?: boolean
          current_driver_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          number?: string
          route?: string
          capacity?: number
          is_active?: boolean
          current_driver_id?: string | null
          created_at?: string
        }
      }
      allocations: {
        Row: {
          id: string
          driver_id: string
          vehicle_id: string
          start_time: string
          end_time: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          driver_id: string
          vehicle_id: string
          start_time?: string
          end_time?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          driver_id?: string
          vehicle_id?: string
          start_time?: string
          end_time?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          vehicle_id: string
          latitude: number
          longitude: number
          speed: number | null
          heading: number | null
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          vehicle_id: string
          latitude: number
          longitude: number
          speed?: number | null
          heading?: number | null
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          vehicle_id?: string
          latitude?: number
          longitude?: number
          speed?: number | null
          heading?: number | null
          timestamp?: string
          created_at?: string
        }
      }
    }
  }
}