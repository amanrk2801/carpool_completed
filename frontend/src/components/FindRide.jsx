import { Shield, Car, MapPin, Calendar, Clock, Users, ArrowLeft, Search, Filter, Star, IndianRupee, Navigation, User, CheckCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { rideApi } from '../utils/api';

/**
 * FindRide Component
 * 
 * Features:
 * - Consistent design with other pages
 * - Search form for finding rides
 * - Filter options (price, time, preferences)
 * - List of available rides with driver details
 * - Interactive booking interface
 * - Real-time search and filtering
 * - Responsive design
 */
function FindRide() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is authenticated
  const [user, setUser] = useState(null);
  
  // Success notification state
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to sign in if not authenticated
      navigate('/signin');
    }
  }, [navigate]);
  
  // Check for success message from navigation state
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      setShowSuccessNotification(true);
      
      // Clear the state to prevent showing the message again on refresh
      navigate(location.pathname, { replace: true });
      
      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 5000);
    }
  }, [location.state, navigate, location.pathname]);

  // Transform backend ride data to frontend format
  const transformRideData = (backendRides) => {
    if (!Array.isArray(backendRides)) {
      return [];
    }
    
    return backendRides.map(ride => {
      // Handle driver name from firstName and lastName
      const driverFirstName = ride.driver?.firstName || '';
      const driverLastName = ride.driver?.lastName || '';
      const driverFullName = `${driverFirstName} ${driverLastName}`.trim() || 'Unknown Driver';
      
      return {
        id: ride.id,
        driver: {
          name: driverFullName,
          rating: ride.driver?.rating || 4.0,
          trips: ride.driver?.totalTrips || ride.driver?.trips || 0,
          photo: `${driverFirstName.charAt(0)}${driverLastName.charAt(0)}`.toUpperCase() || 'U'
        },
        route: {
          from: ride.fromLocation || ride.route?.from || 'Unknown',
          to: ride.toLocation || ride.route?.to || 'Unknown',
          stops: ride.stops ? ride.stops.split(',').map(s => s.trim()).filter(s => s) : []
        },
        departure: {
          date: ride.departureDate || ride.departure?.date || '',
          time: ride.departureTime || ride.departure?.time || ''
        },
        car: {
          model: ride.carModel || ride.car?.model || 'Unknown',
          number: ride.carNumber || ride.car?.number || 'Unknown'
        },
        pricing: {
          pricePerSeat: ride.pricePerSeat || ride.pricing?.pricePerSeat || 0,
          availableSeats: ride.availableSeats || ride.pricing?.availableSeats || 0
        },
        preferences: {
          instantBooking: ride.instantBooking !== undefined ? ride.instantBooking : true,
          allowSmoking: ride.allowSmoking || false,
          allowPets: ride.allowPets || false,
          allowFood: ride.allowFood !== undefined ? ride.allowFood : true
        }
      };
    });
  };

  // Load all available rides when component mounts
  useEffect(() => {
    const loadAllRides = async () => {
      setIsLoadingRides(true);
      try {
        const allRides = await rideApi.getAll();
        console.log('Raw rides from backend:', allRides);
        console.log('First ride structure:', allRides[0]);
        const transformedRides = transformRideData(allRides);
        console.log('Transformed rides:', transformedRides);
        setAvailableRides(transformedRides);
        setHasSearched(true); // Show the results section
      } catch (error) {
        console.error('Error loading rides:', error);
        setAvailableRides([]);
      } finally {
        setIsLoadingRides(false);
      }
    };

    loadAllRides();
  }, []);
  
  // State for search inputs
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1
  });

  // State for filters
  const [filters, setFilters] = useState({
    maxPrice: '',
    departureTime: '',
    instantBooking: false,
    allowSmoking: false,
    allowPets: false,
    allowFood: false,
    minRating: 0
  });

  // State for UI
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // State for ride results
  const [availableRides, setAvailableRides] = useState([]);
  const [isLoadingRides, setIsLoadingRides] = useState(false);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle passenger count change
  const handlePassengerChange = (increment) => {
    setSearchData(prev => ({
      ...prev,
      passengers: Math.max(1, Math.min(8, prev.passengers + increment))
    }));
  };

  // Handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    try {
      // Call the backend API to search for rides
      const searchParams = {
        from: searchData.from,
        to: searchData.to,
        date: searchData.date,
        passengers: searchData.passengers
      };
      
      const rides = await rideApi.search(searchParams);
      console.log('Search results:', rides);
      setHasSearched(true);
      
      // Update the available rides with the search results
      const transformedRides = transformRideData(rides);
      setAvailableRides(transformedRides);
      
    } catch (error) {
      console.error('Search error:', error);
      // If search fails, try to get all rides as fallback
      try {
        const allRides = await rideApi.getAll();
        const transformedRides = transformRideData(allRides);
        setAvailableRides(transformedRides);
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        setAvailableRides([]);
      }
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle ride booking
  const handleBookRide = (rideId) => {
    // Navigate to ride details page
    navigate(`/ride/${rideId}`);
  };

  // Handle contact driver
  const handleContactDriver = (rideId) => {
    // Navigate to ride details page with contact focus
    navigate(`/ride/${rideId}?contact=true`);
  };


  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 py-4 sm:py-8 px-4">
        {/* Success Notification */}
        {showSuccessNotification && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
            <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">{successMessage}</p>
                  <p className="text-xs text-green-600 mt-1">You can now manage your ride bookings below.</p>
                </div>
                <button
                  onClick={() => setShowSuccessNotification(false)}
                  className="text-green-400 hover:text-green-600 ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm mb-4 sm:mb-6">
              <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Find Your Perfect Ride
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Find a Ride
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">
              Search for available rides and travel with verified drivers across India
            </p>
            
            {/* User Welcome Section */}
            {user && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6 max-w-md mx-auto">
                <div className="flex items-center justify-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium text-sm sm:text-base">Welcome, {user.name}!</span>
                </div>
                <p className="text-green-700 text-xs sm:text-sm mt-1">Let's find you the perfect ride!</p>
              </div>
            )}
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border mb-6 sm:mb-8">
            <form onSubmit={handleSearch} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* From Location */}
                <div>
                  <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="from"
                      name="from"
                      value={searchData.from}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Starting location"
                    />
                  </div>
                </div>

                {/* To Location */}
                <div>
                  <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="to"
                      name="to"
                      value={searchData.to}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Destination"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={searchData.date}
                      onChange={handleSearchChange}
                      min={getMinDate()}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passengers
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handlePassengerChange(-1)}
                      disabled={searchData.passengers <= 1}
                      className="w-10 h-12 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-lg flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-gray-800 min-w-[2rem] text-center">
                      {searchData.passengers}
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePassengerChange(1)}
                      disabled={searchData.passengers >= 8}
                      className="w-10 h-12 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-lg flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isSearching ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Searching...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Search className="w-5 h-5 mr-2" />
                      Search Rides
                    </div>
                  )}
                </button>
              </div>

              {/* Filters Section */}
              {showFilters && (
                <div className="border-t pt-4 sm:pt-6 mt-4 sm:mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Price Range */}
                    <div>
                      <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
                        Max Price per Seat
                      </label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          id="maxPrice"
                          name="maxPrice"
                          value={filters.maxPrice}
                          onChange={handleFilterChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Any price"
                        />
                      </div>
                    </div>

                    {/* Departure Time */}
                    <div>
                      <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time
                      </label>
                      <select
                        id="departureTime"
                        name="departureTime"
                        value={filters.departureTime}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Any time</option>
                        <option value="morning">Morning (6AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 6PM)</option>
                        <option value="evening">Evening (6PM - 12AM)</option>
                      </select>
                    </div>

                    {/* Minimum Rating */}
                    <div>
                      <label htmlFor="minRating" className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Rating
                      </label>
                      <select
                        id="minRating"
                        name="minRating"
                        value={filters.minRating}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0">Any rating</option>
                        <option value="4">4+ stars</option>
                        <option value="4.5">4.5+ stars</option>
                        <option value="4.8">4.8+ stars</option>
                      </select>
                    </div>
                  </div>

                  {/* Preference Checkboxes */}
                  <div className="mt-4 sm:mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Ride Preferences</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="instantBooking"
                          checked={filters.instantBooking}
                          onChange={handleFilterChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <span className="text-sm text-gray-700">Instant Booking</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="allowSmoking"
                          checked={filters.allowSmoking}
                          onChange={handleFilterChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <span className="text-sm text-gray-700">Smoking OK</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="allowPets"
                          checked={filters.allowPets}
                          onChange={handleFilterChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <span className="text-sm text-gray-700">Pets OK</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="allowFood"
                          checked={filters.allowFood}
                          onChange={handleFilterChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <span className="text-sm text-gray-700">Food OK</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Results Section */}
          {(hasSearched || isLoadingRides) && (
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {isLoadingRides ? 'Loading Rides...' : `Available Rides (${availableRides.length})`}
                </h2>
                {!isLoadingRides && searchData.from && searchData.to && (
                  <div className="text-xs sm:text-sm text-gray-600">
                    Showing rides for {searchData.from} → {searchData.to}
                  </div>
                )}
              </div>

              {/* Loading State */}
              {isLoadingRides && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading available rides...</p>
                </div>
              )}

              {/* Ride Cards */}
              {!isLoadingRides && availableRides.length > 0 && (
                <div className="space-y-4">
                  {availableRides.map((ride) => (
                  <div key={ride.id} className="bg-white rounded-lg shadow-md border p-4 sm:p-6 hover:shadow-lg transition-shadow">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 lg:items-center">
                      {/* Driver Info */}
                      <div className="lg:col-span-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                            {ride.driver.photo}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{ride.driver.name}</h3>
                            <div className="flex items-center text-xs sm:text-sm text-gray-600">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1" />
                              {ride.driver.rating} ({ride.driver.trips} trips)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Route & Time */}
                      <div className="lg:col-span-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-800">
                            <MapPin className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                            <span className="font-medium text-sm sm:text-base truncate">{ride.route.from}</span>
                          </div>
                          <div className="flex items-center text-gray-800">
                            <Navigation className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                            <span className="font-medium text-sm sm:text-base truncate">{ride.route.to}</span>
                          </div>
                          {ride.route.stops.length > 0 && (
                            <div className="text-xs sm:text-sm text-gray-600 truncate">
                              Stops: {ride.route.stops.join(', ')}
                            </div>
                          )}
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{new Date(ride.departure.date).toLocaleDateString()} at {ride.departure.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Car & Preferences */}
                      <div className="lg:col-span-2">
                        <div className="space-y-2">
                          <div className="flex items-center text-xs sm:text-sm text-gray-700">
                            <Car className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{ride.car.model}</span>
                          </div>
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                            {ride.pricing.availableSeats} seats available
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {ride.preferences.instantBooking && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Instant</span>
                            )}
                            {ride.preferences.allowPets && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Pets OK</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="lg:col-span-3">
                        <div className="text-center lg:text-right space-y-3">
                          <div>
                            <div className="text-xl sm:text-2xl font-bold text-gray-800">
                              ₹{ride.pricing.pricePerSeat}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">per seat</div>
                          </div>
                          <div className="space-y-2">
                            {/* Check if user is the driver */}
                            {user && (user.id === ride.driver?.id || user.id === ride.driverId) ? (
                              <Link
                                to="/manage-rides"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors text-center block"
                              >
                                Manage Your Ride
                              </Link>
                            ) : (
                              <button
                                onClick={() => handleBookRide(ride.id)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                              >
                                {ride.preferences.instantBooking ? 'Book Now' : 'Request Booking'}
                              </button>
                            )}
                            {user && (user.id === ride.driver?.id || user.id === ride.driverId) ? (
                              <Link
                                to="/manage-rides"
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors text-center block"
                              >
                                View Ride Dashboard
                              </Link>
                            ) : (
                              <button
                                onClick={() => handleContactDriver(ride.id)}
                                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                              >
                                Contact Driver
                              </button>
                            )}
                            <button
                              onClick={() => navigate(`/ride/${ride.id}`)}
                              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              )}

              {/* No Results State */}
              {!isLoadingRides && hasSearched && availableRides.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <Search className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No rides found</h3>
                  <p className="text-gray-600 text-sm sm:text-base px-4">Try adjusting your search criteria or check back later</p>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!hasSearched && (
            <div className="text-center py-8 sm:py-12">
              <Search className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Ready to find your ride?</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">Enter your travel details above to search for available rides</p>
            </div>
          )}

          {/* Safety Notice */}
          <div className="mt-6 sm:mt-8 bg-white rounded-lg p-3 sm:p-4 shadow-sm border">
            <p className="text-xs sm:text-sm text-gray-700 flex items-start">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
              <span>All drivers are verified with background checks. GPS tracking and emergency support available 24/7 for your safety.</span>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default FindRide;
