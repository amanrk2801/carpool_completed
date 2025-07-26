import { Shield, Car, MapPin, Calendar, Clock, Users, ArrowLeft, Star, CheckCircle, AlertCircle, User, CreditCard, RotateCcw, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { bookingApi } from '../utils/api';

/**
 * MyBookings Component
 * 
 * Features:
 * - List all user's bookings
 * - Booking status management
 * - Trip history
 * - Rating and review system
 * - Cancel booking functionality
 */
function MyBookings() {
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

  // State for bookings
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        // Try to fetch from API first
        let userBookings = [];
        try {
          userBookings = await bookingApi.getUserBookings(user.id);
          console.log('Bookings from API:', userBookings);
        } catch (apiError) {
          console.warn('API fetch failed, using local storage:', apiError);
        }

        // Also check local storage for bookings
        const localBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        console.log('Local bookings:', localBookings);

        // Combine API and local bookings (API takes precedence)
        const allBookings = userBookings.length > 0 ? userBookings : localBookings;
        
        setBookings(allBookings);
        setError(null);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings');
        // Try local storage as fallback
        const localBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        setBookings(localBookings);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Get status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'REJECTED':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Handle cancel booking
  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      // Try to call API to cancel booking
      try {
        // await bookingApi.updateStatus(bookingId, 'CANCELLED');
        console.log('Would call API to cancel booking:', bookingId);
      } catch (apiError) {
        console.warn('API cancel failed, proceeding with local update:', apiError);
      }
      
      // Update both component state and localStorage
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'CANCELLED', cancellationDate: new Date().toISOString().split('T')[0] }
          : booking
      );
      
      // Update component state
      setBookings(updatedBookings);
      
      // Update localStorage to persist the change
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
      
      alert('Booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  // Handle rate trip
  const handleRateTrip = (bookingId) => {
    // In a real app, this would open a rating modal
    const rating = prompt('Rate this trip (1-5 stars):');
    const review = prompt('Leave a review (optional):');
    
    if (rating && rating >= 1 && rating <= 5) {
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, rating: parseInt(rating), review: review || '', ratingDate: new Date().toISOString().split('T')[0] }
          : booking
      );
      
      // Update component state
      setBookings(updatedBookings);
      
      // Update localStorage to persist the change
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
      
      alert('Thank you for your feedback!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Use the responsive Navbar component */}
      <Navbar />

      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-4">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">{successMessage}</p>
                <p className="text-xs text-green-600 mt-1">Your booking details are shown below.</p>
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

      {/* Main Content */}
      <div className="flex-1 py-4 sm:py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm mb-4 sm:mb-6">
              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Your Trip History
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              My Bookings
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">
              Manage your rides and view trip history
            </p>
            
            {/* User Welcome Section */}
            {user && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6 max-w-lg mx-auto">
                <div className="flex items-center justify-center mb-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium text-sm sm:text-base">Welcome back, {user.firstName || user.name}!</span>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center text-xs sm:text-sm">
                  <div>
                    <div className="font-semibold text-green-700 text-sm sm:text-base">{bookings.length}</div>
                    <div className="text-green-600">Total</div>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-700 text-sm sm:text-base">
                      {bookings.filter(b => ['CONFIRMED', 'PENDING', 'COMPLETED'].includes(b.status)).length}
                    </div>
                    <div className="text-blue-600">Active</div>
                  </div>
                  <div>
                    <div className="font-semibold text-red-700 text-sm sm:text-base">
                      {bookings.filter(b => b.status === 'CANCELLED').length}
                    </div>
                    <div className="text-red-600">Cancelled</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bookings List */}
          {error && (
            <div className="mb-6 bg-red-100 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                <div className="text-red-800">{error}</div>
              </div>
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-md border">
              <Car className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">No bookings yet</h3>
              <p className="text-gray-600 mb-2 text-lg">Ready to start your journey?</p>
              <p className="text-gray-500 mb-8">Book your first ride now and experience safe, affordable travel!</p>
              <div className="space-y-4">
                <Link 
                  to="/find-ride"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg"
                >
                  🚗 Find a Ride
                </Link>
                <div className="text-sm text-gray-500">or</div>
                <Link 
                  to="/offer-ride"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg"
                >
                  🚙 Offer a Ride
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {bookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className={`rounded-lg shadow-md border p-4 sm:p-6 ${
                    booking.status === 'CANCELLED' 
                      ? 'bg-gray-50 border-gray-300 opacity-75' 
                      : 'bg-white'
                  }`}
                >
                  {/* Mobile-First Card Layout */}
                  
                  {/* Header: Status & Booking ID */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium border w-fit ${getStatusStyle(booking.status)}`}>
                      {booking.status === 'CONFIRMED' && <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
                      {booking.status === 'PENDING' && <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
                      {booking.status === 'COMPLETED' && <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
                      {booking.status === 'CANCELLED' && <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
                      {booking.status}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Booking #{booking.id}
                    </div>
                  </div>

                  {/* Route Information */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="font-medium text-gray-800 text-sm sm:text-base truncate">{booking.ride.route.from}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-2 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <span className="font-medium text-gray-800 text-sm sm:text-base truncate">{booking.ride.route.to}</span>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-4">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{new Date(booking.ride.departure.date).toLocaleDateString()} at {booking.ride.departure.time}</span>
                  </div>

                  {/* Driver & Car Info - Stacked on Mobile */}
                  <div className="space-y-3 mb-4">
                    {/* Driver */}
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 flex-shrink-0">
                        {booking.ride.driver.photo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 text-sm sm:text-base truncate">{booking.ride.driver.name}</div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1" />
                          <span>{booking.ride.driver.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Car */}
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <Car className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{booking.ride.car.model} • {booking.ride.car.number}</span>
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4">
                    <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Seats:</span>
                        <span className="font-medium">{booking.seatsBooked}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-semibold text-gray-800">₹{booking.totalAmount}</span>
                      </div>
                      <div className="col-span-2 flex justify-between pt-1 border-t border-gray-200">
                        <span className="text-gray-600">Booked:</span>
                        <span className="font-medium">{new Date(booking.bookingDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  {booking.bookingMessage && (
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <div className="text-xs sm:text-sm text-blue-800">
                        <strong>Your message:</strong> {booking.bookingMessage}
                      </div>
                    </div>
                  )}

                  {/* Rating & Review */}
                  {booking.status === 'COMPLETED' && booking.rating && (
                    <div className="bg-green-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-xs sm:text-sm font-medium">Your rating: {booking.rating}/5</span>
                      </div>
                      {booking.review && (
                        <p className="text-xs sm:text-sm text-green-700">{booking.review}</p>
                      )}
                    </div>
                  )}

                  {/* Cancellation Info */}
                  {booking.status === 'CANCELLED' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center mb-2">
                        <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-xs sm:text-sm font-medium text-red-800">Booking Cancelled</span>
                      </div>
                      {booking.cancellationDate && (
                        <p className="text-xs sm:text-sm text-red-700">
                          Cancelled on: {new Date(booking.cancellationDate).toLocaleDateString()}
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-red-600 mt-1">
                        Refund will be processed within 3-5 business days
                      </p>
                    </div>
                  )}

                  {/* Action Buttons - Full Width on Mobile */}
                  <div className="space-y-2">
                    {booking.status === 'PENDING' && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="w-full border border-red-300 hover:bg-red-50 text-red-600 py-2 px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}

                    {booking.status === 'CONFIRMED' && (
                      <div className="space-y-2">
                        <Link
                          to={`/ride/${booking.ride.id}`}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors text-center block"
                        >
                          View Ride Details
                        </Link>
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="w-full border border-red-300 hover:bg-red-50 text-red-600 py-2 px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    )}

                    {booking.status === 'COMPLETED' && !booking.rating && (
                      <button
                        onClick={() => handleRateTrip(booking.id)}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Rate Trip
                      </button>
                    )}

                    {booking.status === 'CANCELLED' && (
                      <Link
                        to="/find-ride"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Book Another Ride
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-md border p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Link
                to="/find-ride"
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                <Car className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Find New Ride
              </Link>
              <Link
                to="/offer-ride"
                className="flex items-center justify-center border border-green-600 hover:bg-green-50 text-green-600 py-3 px-6 rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Offer a Ride
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default MyBookings;
