import { Shield, Car, MapPin, Calendar, Clock, Users, ArrowLeft, Plus, Minus, IndianRupee, User, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { rideApi } from '../utils/api';

/**
 * OfferRide Component
 * 
 * Features:
 * - Consistent design with landing page, signin, and signup
 * - Form for offering a ride with all necessary details
 * - Form validation with real-time feedback
 * - Date and time pickers
 * - Passenger count selector
 * - Price calculator
 * - Route planning interface
 * - Car details section
 * - Responsive design
 */
function OfferRide() {
  const navigate = useNavigate();
  
  // Check if user is authenticated
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to sign in if not authenticated
      navigate('/signin');
    }
  }, [navigate]);
  
  // State for form inputs
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    departureTime: '',
    passengers: 1,
    pricePerSeat: '',
    carModel: '',
    carNumber: '',
    stops: [],
    additionalInfo: '',
    instantBooking: true,
    allowSmoking: false,
    allowPets: false,
    allowFood: true
  });
  
  // State for form validation and loading
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showStops, setShowStops] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdRideId, setCreatedRideId] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle passenger count change
  const handlePassengerChange = (increment) => {
    setFormData(prev => ({
      ...prev,
      passengers: Math.max(1, Math.min(8, prev.passengers + increment))
    }));
  };

  // Add stop functionality
  const addStop = () => {
    setFormData(prev => ({
      ...prev,
      stops: [...prev.stops, '']
    }));
  };

  // Remove stop functionality
  const removeStop = (index) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index)
    }));
  };

  // Update stop value
  const updateStop = (index, value) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.map((stop, i) => i === index ? value : stop)
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.from.trim()) {
      newErrors.from = 'Starting location is required';
    }
    
    if (!formData.to.trim()) {
      newErrors.to = 'Destination is required';
    }
    
    if (!formData.departureDate) {
      newErrors.departureDate = 'Departure date is required';
    } else {
      const selectedDate = new Date(formData.departureDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.departureDate = 'Departure date cannot be in the past';
      }
    }
    
    if (!formData.departureTime) {
      newErrors.departureTime = 'Departure time is required';
    }
    
    if (!formData.pricePerSeat || formData.pricePerSeat <= 0) {
      newErrors.pricePerSeat = 'Please enter a valid price per seat';
    }
    
    if (!formData.carModel.trim()) {
      newErrors.carModel = 'Car model is required';
    }
    
    if (!formData.carNumber.trim()) {
      newErrors.carNumber = 'Car number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Get the current user data
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Prepare ride data for the backend
      const rideData = {
        driverId: userData.id || 1, // Use actual user ID or fallback
        fromLocation: formData.from,
        toLocation: formData.to,
        departureDate: formData.departureDate,
        departureTime: formData.departureTime,
        availableSeats: formData.passengers,
        pricePerSeat: parseFloat(formData.pricePerSeat),
        carModel: formData.carModel,
        carNumber: formData.carNumber,
        allowSmoking: formData.allowSmoking,
        allowPets: formData.allowPets,
        allowFood: formData.allowFood,
        additionalInfo: formData.additionalInfo
      };
      
      console.log('Form Data:', formData);
      console.log('Ride Data being sent:', rideData);
      
      const result = await rideApi.create(rideData);
      console.log('Ride offer submitted:', result);
      
      // Store the created ride ID for potential use
      if (result && result.id) {
        setCreatedRideId(result.id);
      }
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Auto-redirect after 3 seconds
      setTimeout(() => {
        navigate('/find-ride', { 
          state: { 
            message: 'Your ride has been published successfully! You can view it below.',
            rideId: result?.id 
          }
        });
      }, 3000);
      
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to offer ride. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation Header - Same style as other pages */}
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo Section - Consistent with other pages */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <ArrowLeft className="w-5 h-5 text-gray-600 mr-3 group-hover:text-blue-600 transition-colors" />
                <div className="bg-blue-600 p-2 rounded-lg mr-3">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-blue-600">CarpoolConnect</h1>
                  <div className="flex items-center text-xs text-green-600">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified & Safe
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Auth Links */}
            <div className="flex items-center space-x-4">
              <Link 
                to="/find-ride"
                className="text-blue-700 hover:text-blue-800 px-4 py-2 text-sm font-medium transition-colors border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                Find Ride
              </Link>
              <Link 
                to="/offer-ride"
                className="text-green-700 hover:text-green-800 px-4 py-2 text-sm font-medium transition-colors border border-green-600 rounded-lg hover:bg-green-50"
              >
                Offer Ride
              </Link>
              {user ? (
                <button 
                  onClick={() => {
                    localStorage.removeItem('user');
                    navigate('/signin');
                  }}
                  className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link 
                    to="/signin" 
                    className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/join" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Join
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Safe & Verified Rides
            </div>
            
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Offer a Ride
            </h1>
            <p className="text-gray-600 text-lg">
              Share your journey and help fellow travelers reach their destination safely
            </p>
            
            {/* User Welcome Section */}
            {user && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6 max-w-md mx-auto">
                <div className="flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">Welcome, {user.name}!</span>
                </div>
                <p className="text-blue-700 text-sm mt-1">Ready to offer your ride to fellow travelers?</p>
              </div>
            )}
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-lg shadow-md p-8 border">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Route Information Section */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Route Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* From Location */}
                  <div>
                    <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                      From *
                    </label>
                    <input
                      type="text"
                      id="from"
                      name="from"
                      value={formData.from}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.from ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter starting location (e.g., Mumbai, Maharashtra)"
                    />
                    {errors.from && (
                      <p className="mt-1 text-sm text-red-600">{errors.from}</p>
                    )}
                  </div>

                  {/* To Location */}
                  <div>
                    <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                      To *
                    </label>
                    <input
                      type="text"
                      id="to"
                      name="to"
                      value={formData.to}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.to ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter destination (e.g., Pune, Maharashtra)"
                    />
                    {errors.to && (
                      <p className="mt-1 text-sm text-red-600">{errors.to}</p>
                    )}
                  </div>
                </div>

                {/* Optional Stops */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Stops (Optional)
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowStops(!showStops)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {showStops ? 'Hide Stops' : 'Add Stops'}
                    </button>
                  </div>
                  
                  {showStops && (
                    <div className="space-y-3">
                      {formData.stops.map((stop, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={stop}
                            onChange={(e) => updateStop(index, e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Stop ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeStop(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      
                      {formData.stops.length < 3 && (
                        <button
                          type="button"
                          onClick={addStop}
                          className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Stop
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Date & Time Section */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Date & Time
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Departure Date */}
                  <div>
                    <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Departure Date *
                    </label>
                    <input
                      type="date"
                      id="departureDate"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.departureDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.departureDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.departureDate}</p>
                    )}
                  </div>

                  {/* Departure Time */}
                  <div>
                    <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Departure Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="time"
                        id="departureTime"
                        name="departureTime"
                        value={formData.departureTime}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.departureTime ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.departureTime && (
                      <p className="mt-1 text-sm text-red-600">{errors.departureTime}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Passengers & Pricing Section */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Passengers & Pricing
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Available Seats */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Seats *
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => handlePassengerChange(-1)}
                        disabled={formData.passengers <= 1}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="text-2xl font-semibold text-gray-800 min-w-[3rem] text-center">
                        {formData.passengers}
                      </span>
                      <button
                        type="button"
                        onClick={() => handlePassengerChange(1)}
                        disabled={formData.passengers >= 8}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Maximum 8 passengers</p>
                  </div>

                  {/* Price per Seat */}
                  <div>
                    <label htmlFor="pricePerSeat" className="block text-sm font-medium text-gray-700 mb-2">
                      Price per Seat *
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        id="pricePerSeat"
                        name="pricePerSeat"
                        value={formData.pricePerSeat}
                        onChange={handleInputChange}
                        min="1"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.pricePerSeat ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter price in ₹"
                      />
                    </div>
                    {errors.pricePerSeat && (
                      <p className="mt-1 text-sm text-red-600">{errors.pricePerSeat}</p>
                    )}
                    {formData.pricePerSeat && formData.passengers && (
                      <p className="text-sm text-green-600 mt-1">
                        Total earning: ₹{(formData.pricePerSeat * formData.passengers).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Car Details Section */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Car className="w-5 h-5 mr-2 text-blue-600" />
                  Car Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Car Model */}
                  <div>
                    <label htmlFor="carModel" className="block text-sm font-medium text-gray-700 mb-2">
                      Car Model *
                    </label>
                    <input
                      type="text"
                      id="carModel"
                      name="carModel"
                      value={formData.carModel}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.carModel ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Maruti Swift, Honda City"
                    />
                    {errors.carModel && (
                      <p className="mt-1 text-sm text-red-600">{errors.carModel}</p>
                    )}
                  </div>

                  {/* Car Number */}
                  <div>
                    <label htmlFor="carNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Car Number *
                    </label>
                    <input
                      type="text"
                      id="carNumber"
                      name="carNumber"
                      value={formData.carNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.carNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., MH 12 AB 1234"
                    />
                    {errors.carNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.carNumber}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Ride Preferences Section */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Ride Preferences
                </h3>
                
                <div className="space-y-4">
                  {/* Instant Booking */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Instant Booking</label>
                      <p className="text-sm text-gray-500">Allow passengers to book instantly without approval</p>
                    </div>
                    <input
                      type="checkbox"
                      name="instantBooking"
                      checked={formData.instantBooking}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  {/* Smoking */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Allow Smoking</label>
                      <p className="text-sm text-gray-500">Smoking allowed during the ride</p>
                    </div>
                    <input
                      type="checkbox"
                      name="allowSmoking"
                      checked={formData.allowSmoking}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  {/* Pets */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Allow Pets</label>
                      <p className="text-sm text-gray-500">Pets are welcome in the car</p>
                    </div>
                    <input
                      type="checkbox"
                      name="allowPets"
                      checked={formData.allowPets}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  {/* Food */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Allow Food</label>
                      <p className="text-sm text-gray-500">Eating allowed during the ride</p>
                    </div>
                    <input
                      type="checkbox"
                      name="allowFood"
                      checked={formData.allowFood}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional details about your ride, pickup points, or special instructions..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                      Publishing Your Ride...
                    </div>
                  ) : (
                    'Offer Your Ride'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-white rounded-lg p-4 shadow-sm border">
            <p className="text-sm text-gray-700 flex items-start">
              <Shield className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
              Your ride will be visible to verified passengers only. All bookings go through our secure payment system for your safety.
            </p>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform animate-pulse">
            <div className="p-6 text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              {/* Success Message */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ride Created Successfully! 🎉
              </h3>
              <p className="text-gray-600 mb-4">
                Your ride has been published and is now available for passengers to book.
              </p>
              
              {/* Ride Summary */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-800">
                    {formData.from} → {formData.to}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">
                    {new Date(formData.departureDate).toLocaleDateString()} at {formData.departureTime}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">
                    {formData.passengers} seats available at ₹{formData.pricePerSeat} each
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/find-ride', { 
                      state: { 
                        message: 'Your ride has been published successfully!',
                        rideId: createdRideId 
                      }
                    });
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  View All Rides
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/my-bookings');
                  }}
                  className="w-full border border-green-600 hover:bg-green-50 text-green-600 py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Manage My Rides
                </button>
              </div>
              
              {/* Auto-redirect notice */}
              <p className="text-xs text-gray-500 mt-4">
                Redirecting to rides page in 3 seconds...
              </p>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default OfferRide;
