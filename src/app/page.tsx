import Link from "next/link";
import { Bus, MapPin, Users, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Bus className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TransitTracker</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Admin
              </Link>
              <Link href="/driver" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Driver
              </Link>
              <Link href="/track" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Track Buses
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Real-Time Public Transport Tracking
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Never miss your bus again! Track real-time locations, get estimated arrival times, 
            and plan your journey efficiently in small cities and tier-2 towns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/track" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
              Start Tracking
            </Link>
            <Link href="/admin" className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
            <p className="text-gray-600">
              Get live GPS location updates of all buses with accurate positioning and route information.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Driver Management</h3>
            <p className="text-gray-600">
              Smart vehicle allocation system with driver alerts and seamless tracking activation.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
              <Smartphone className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Optimized</h3>
            <p className="text-gray-600">
              Optimized for low-bandwidth environments ensuring accessibility in smaller towns.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-20 bg-white rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Making Public Transport Better</h2>
            <p className="text-gray-600">Real-time tracking reduces wait times and improves commuter experience</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
              <div className="text-gray-600">Reduction in wait times</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">45%</div>
              <div className="text-gray-600">Increase in ridership</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">30%</div>
              <div className="text-gray-600">Reduced traffic congestion</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
