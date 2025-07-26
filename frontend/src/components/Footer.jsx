import { Car, Shield, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Car className="w-8 h-8 text-green-400 mr-3" />
              <span className="text-2xl font-bold">CarpoolConnect</span>
            </div>
            <p className="text-blue-200 mb-4">
              Safe, affordable, and eco-friendly carpooling for everyone.
            </p>
            <div className="flex items-center text-sm text-blue-300">
              <Shield className="w-4 h-4 mr-2" />
              100% Verified & Secure
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-200">
              <li><Link to="/find-ride" className="hover:text-green-400">Find a Ride</Link></li>
              <li><Link to="/offer-ride" className="hover:text-green-400">Offer a Ride</Link></li>
              <li><Link to="/how-it-works" className="hover:text-green-400">How It Works</Link></li>
              <li><Link to="/safety" className="hover:text-green-400">Safety</Link></li>
              <li><Link to="/help" className="hover:text-green-400">Help</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-3 text-blue-200">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-green-400" />
                <span>1800-0000-1234</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-green-400" />
                <span>support@carpoolconnect.com</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                <span>24/7 Safety Support</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-300 text-sm">
              © 2024 CarpoolConnect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-blue-300 hover:text-green-400 text-sm">Privacy Policy</a>
              <a href="#" className="text-blue-300 hover:text-green-400 text-sm">Terms of Service</a>
              <a href="#" className="text-blue-300 hover:text-green-400 text-sm">Safety Guidelines</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
