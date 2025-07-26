import { Search, Plus, Shield, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * HeroSection Component
 * 
 * Features:
 * - Main value proposition and hero messaging
 * - Trust indicators with user statistics
 * - Primary action buttons for finding/offering rides
 * - Security promise to build confidence
 * - Responsive design with compelling visuals
 */
function HeroSection() {
  return (
    <section className="pt-20 pb-16 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm mb-6">
          <Shield className="w-4 h-4 mr-2" />
          Trusted by 1 Lakh+ Users
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Safe & Smart <span className="text-blue-600">Carpooling</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with verified commuters across India. Save money, reduce pollution, and travel safely with GPS tracking.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 text-sm">
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
            <Users className="w-4 h-4 text-blue-600 mr-2" />
            1 Lakh+ Members
          </div>
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
            <Star className="w-4 h-4 text-yellow-500 mr-2" />
            4.8/5 Rating
          </div>
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
            <Shield className="w-4 h-4 text-green-600 mr-2" />
            100% Verified
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link 
            to="/find-ride"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <Search className="w-5 h-5" />
            Find a Ride
          </Link>
          <Link 
            to="/offer-ride"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <Plus className="w-5 h-5" />
            Offer a Ride
          </Link>
        </div>
        
        <div className="bg-white rounded-lg p-4 max-w-2xl mx-auto shadow-sm border">
          <p className="text-gray-700 flex items-start">
            <Shield className="w-5 h-5 mr-2 mt-0.5 text-green-600" />
            Security Promise: GPS tracking, emergency contacts, and 24/7 support for your safety. Aap bilkul safe rahenge!
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
