'use client';

import Link from "next/link";
import { ArrowLeft, Smartphone, MapPin, User } from "lucide-react";

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-optimized header */}
      <nav className="bg-blue-600 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-white">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <Smartphone className="h-6 w-6 mr-2" />
              <span className="text-lg font-semibold">Driver App</span>
            </Link>
            <div className="flex items-center text-white text-sm">
              <User className="h-4 w-4 mr-1" />
              <span>Driver</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pb-safe">
        {children}
      </main>
    </div>
  );
}