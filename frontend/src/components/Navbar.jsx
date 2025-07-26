import { Car, Shield, User, LogOut, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

/**
 * Navbar Component
 * 
 * Features:
 * - Consistent branding across all pages
 * - Navigation links to Sign In and Join Free pages
 * - Shows logged-in user information with "Hello, [Name]"
 * - Mobile responsive with hamburger menu
 * - Logout functionality
 * - Responsive design
 * - Hover effects and transitions
 */
function Navbar() {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      try {
        setUser(JSON.parse(loggedInUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    setUser(null);
    setIsMobileMenuOpen(false);
    // Redirect to home page
    window.location.href = '/';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-xl mr-3 group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-200 shadow-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                  CarpoolConnect
                </h1>
                <div className="flex items-center text-xs text-green-600">
                  <Shield className="w-3 h-3 mr-1" />
                  <span className="hidden md:inline">Verified & Safe</span>
                  <span className="md:hidden">Safe</span>
                </div>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-blue-600">Carpool</h1>
              </div>
            </Link>
          </div>

          {/* Desktop & Tablet Navigation (md and up) */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link 
              to="/find-ride"
              className="text-blue-700 hover:text-blue-800 px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-200 border border-blue-600 rounded-lg hover:bg-blue-50 hover:shadow-md transform hover:-translate-y-0.5"
            >
              <span className="hidden lg:inline">Find Ride</span>
              <span className="lg:hidden">Find</span>
            </Link>
            <Link 
              to="/offer-ride"
              className="text-green-700 hover:text-green-800 px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-200 border border-green-600 rounded-lg hover:bg-green-50 hover:shadow-md transform hover:-translate-y-0.5"
            >
              <span className="hidden lg:inline">Offer Ride</span>
              <span className="lg:hidden">Offer</span>
            </Link>
            
            {user ? (
              // Logged in user section
              <>
                <Link 
                  to="/my-bookings"
                  className="text-purple-700 hover:text-purple-800 px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-purple-50 rounded-lg"
                >
                  <span className="hidden lg:inline">My Bookings</span>
                  <span className="lg:hidden">Bookings</span>
                </Link>
                
                <Link 
                  to="/manage-rides"
                  className="text-orange-700 hover:text-orange-800 px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-orange-50 rounded-lg"
                >
                  <span className="hidden lg:inline">Manage Rides</span>
                  <span className="lg:hidden">Manage</span>
                </Link>
                
                {/* User greeting - responsive sizing */}
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 rounded-lg border border-green-200 shadow-sm">
                    <User className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-green-700 whitespace-nowrap">
                      <span className="hidden xl:inline">Hello, </span>
                      {user.firstName || user.name || 'User'}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-red-50 rounded-lg hover:shadow-md group"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              // Not logged in section
              <>
                <Link 
                  to="/signin"
                  className="text-gray-700 hover:text-blue-600 px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-50 rounded-lg"
                >
                  Sign In
                </Link>
                <Link 
                  to="/join"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 lg:px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Join Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile & Small Tablet (sm to md) */}
          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <div className="flex items-center space-x-1 bg-gradient-to-r from-green-50 to-emerald-50 px-2 py-1 rounded-lg border border-green-200 shadow-sm">
                <User className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span className="text-xs font-medium text-green-700 max-w-16 truncate">
                  {user.firstName || user.name || 'User'}
                </span>
              </div>
            )}
            
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? 
                <X className="w-6 h-6 transform rotate-90 transition-transform" /> : 
                <Menu className="w-6 h-6" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {/* Quick actions for logged in users */}
              {user && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        Hello, {user.firstName || user.name || 'User'}!
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation Links */}
              <div className="grid grid-cols-1 gap-3">
                <Link 
                  to="/find-ride"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center text-blue-700 hover:text-blue-800 px-4 py-3 text-sm font-medium transition-all duration-200 border-2 border-blue-600 rounded-lg hover:bg-blue-50 active:scale-95"
                >
                  <Car className="w-4 h-4 mr-2" />
                  Find a Ride
                </Link>
                
                <Link 
                  to="/offer-ride"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center text-green-700 hover:text-green-800 px-4 py-3 text-sm font-medium transition-all duration-200 border-2 border-green-600 rounded-lg hover:bg-green-50 active:scale-95"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Offer a Ride
                </Link>
                
                {user ? (
                  <>
                    <Link 
                      to="/my-bookings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center text-purple-700 hover:text-purple-800 px-4 py-3 text-sm font-medium transition-all duration-200 border border-purple-300 rounded-lg hover:bg-purple-50 active:scale-95"
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Bookings
                    </Link>
                    
                    <Link 
                      to="/manage-rides"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center text-orange-700 hover:text-orange-800 px-4 py-3 text-sm font-medium transition-all duration-200 border border-orange-300 rounded-lg hover:bg-orange-50 active:scale-95"
                    >
                      <Car className="w-4 h-4 mr-2" />
                      Manage Rides
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center text-red-600 hover:text-red-700 px-4 py-3 text-sm font-medium transition-all duration-200 border border-red-300 rounded-lg hover:bg-red-50 active:scale-95"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/signin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center text-gray-700 hover:text-blue-600 px-4 py-3 text-sm font-medium transition-all duration-200 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95"
                    >
                      Sign In
                    </Link>
                    
                    <Link 
                      to="/join"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg active:scale-95"
                    >
                      Join Free
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
