'use client';

import Link from "next/link";
import { Bus, MapPin, Users, Smartphone, ArrowRight, Shield, Clock, Star, Menu, X } from "lucide-react";
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Enhanced Sticky Navigation with Scroll Effects */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-black/5' 
          : 'bg-white/10 backdrop-blur-xl border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-500 ${
            scrolled ? 'h-14' : 'h-16'
          }`}>
            {/* Logo Section */}
            <div className="flex items-center group">
              <div className="relative">
                <Bus className={`h-8 w-8 transition-all duration-300 group-hover:scale-110 ${
                  scrolled 
                    ? 'text-blue-600 group-hover:text-blue-500' 
                    : 'text-blue-400 group-hover:text-blue-300'
                }`} />
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className={`ml-3 text-xl font-bold transition-all duration-300 group-hover:scale-105 ${
                scrolled 
                  ? 'text-gray-900 group-hover:text-blue-600' 
                  : 'text-white group-hover:text-blue-300'
              }`}>
                TransitTracker
              </span>
              <div className={`ml-2 px-2 py-1 rounded-full text-xs font-medium hidden sm:block transition-all duration-300 ${
                scrolled 
                  ? 'bg-blue-500/10 text-blue-600' 
                  : 'bg-blue-500/20 text-blue-300'
              }`}>
                LIVE
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                href="/admin" 
                className={`group relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  scrolled 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="relative z-10">Admin Portal</span>
                <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  scrolled 
                    ? 'bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0' 
                    : 'bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0'
                }`}></div>
              </Link>
              
              <Link 
                href="/driver" 
                className={`group relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  scrolled 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="relative z-10">For Drivers</span>
                <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  scrolled 
                    ? 'bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0' 
                    : 'bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0'
                }`}></div>
              </Link>
              
              <Link 
                href="/track" 
                className="group relative ml-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5"
              >
                <span className="flex items-center">
                  Track Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  scrolled 
                    ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className={`py-4 space-y-2 rounded-lg mt-2 backdrop-blur-sm ${
              scrolled 
                ? 'bg-white/90 shadow-lg' 
                : 'bg-black/20'
            }`}>
              <Link 
                href="/admin" 
                className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                  scrolled 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Portal
              </Link>
              <Link 
                href="/driver" 
                className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                  scrolled 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                For Drivers
              </Link>
              <Link 
                href="/track" 
                className="block mx-4 my-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold text-center transition-all duration-300 hover:from-blue-600 hover:to-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Track Now
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Glow Effect */}
        <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
          scrolled 
            ? 'bg-gradient-to-r from-transparent via-blue-200/50 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-blue-400/50 to-transparent'
        }`}></div>
      </nav>

      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen flex items-center">
        {/* Background Image with Fallback Gradient */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 58, 138, 0.6) 50%, rgba(15, 23, 42, 0.9) 100%), url('/images/Bus.jpeg')`,
            }}
          />
          {/* Enhanced overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"></div>
          {/* Animated light streaks */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Real-Time Transit Solutions
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Smart Public
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Transport Tracking
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Revolutionary GPS tracking system for buses and public transport. 
              Never miss your ride again with real-time locations and accurate arrival predictions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/track" className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center">
                Start Tracking
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/admin" className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                Admin Dashboard
                <Shield className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Live Tracking</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">&lt;30s</div>
                <div className="text-sm text-gray-400">Updates</div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TransitTracker?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced technology meets simple design for the ultimate public transport experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Real-Time GPS Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Get precise live location updates of all buses with accurate positioning, 
                route information, and estimated arrival times.
              </p>
              <div className="mt-4 text-blue-600 font-semibold flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Fleet Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Intelligent vehicle allocation system with driver management, 
                alerts, and seamless tracking activation for operators.
              </p>
              <div className="mt-4 text-green-600 font-semibold flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Mobile Optimized</h3>
              <p className="text-gray-600 leading-relaxed">
                Optimized for low-bandwidth environments with offline capabilities, 
                ensuring accessibility in smaller towns and rural areas.
              </p>
              <div className="mt-4 text-purple-600 font-semibold flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Transforming Public Transportation
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our real-time tracking system has revolutionized how people use public transport, 
                reducing wait times and improving the overall commuter experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="group">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 transform group-hover:scale-105 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">60%</div>
                  <div className="text-blue-100 text-lg font-medium">Reduction in wait times</div>
                </div>
              </div>
              <div className="group">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 transform group-hover:scale-105 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">45%</div>
                  <div className="text-green-100 text-lg font-medium">Increase in ridership</div>
                </div>
              </div>
              <div className="group">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 transform group-hover:scale-105 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">30%</div>
                  <div className="text-purple-100 text-lg font-medium">Reduced traffic congestion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Transit Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of commuters who never miss their bus anymore. Start tracking in real-time today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/track" className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              Start Tracking Now
            </Link>
            <Link href="/admin" className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
