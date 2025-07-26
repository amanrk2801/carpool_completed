import { Car, Calendar, Clock, User, MapPin, Star, Users, MessageCircle, CheckCircle, X, AlertCircle, Eye, Edit, Trash2, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { rideApi, bookingApi } from '../utils/api';

/**
 * ManageRides Component
 * 
 * Features:
 * - View all rides offered by the driver
 * - See bookings for each ride
 * - Manage passenger messages
 * - Accept/reject booking requests
 * - Contact passengers
 * - Edit or cancel rides
 */
function ManageRides() {
  const navigate = useNavigate();
  
  // Check if user is authenticated
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  // State management
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [rideBookings, setRideBookings] = useState([]);

  // Fetch driver's rides
  useEffect(() => {
    const fetchDriverRides = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await rideApi.getByDriver(user.id);
        setRides(response || []);
      } catch (error) {
        console.error('Error fetching rides:', error);
        setError('Failed to load your rides. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDriverRides();
  }, [user]);

  // Handle viewing bookings for a ride
  const handleViewBookings = async (ride) => {
    setSelectedRide(ride);
    
    try {
      const response = await bookingApi.getByRide(ride.id);
      // Handle both direct array and object with bookings property
      const bookings = Array.isArray(response) ? response : (response?.bookings || []);
      setRideBookings(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setRideBookings([]);
    }
    
    setShowBookingsModal(true);
  };

  // Handle booking status update
  const handleBookingStatusUpdate = async (bookingId, newStatus) => {
    try {
      await bookingApi.updateStatus(bookingId, newStatus, user.id);
      
      // Refresh the bookings for the current ride
      const response = await bookingApi.getByRide(selectedRide.id);
      const bookings = Array.isArray(response) ? response : (response?.bookings || []);
      setRideBookings(bookings);
      
      // Also refresh the rides list to update counts
      const ridesResponse = await rideApi.getByDriver(user.id);
      setRides(ridesResponse || []);
      
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status. Please try again.');
    }
  };

  // Get status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get booking status styling
  const getBookingStatusStyle = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading your rides...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 py-4 sm:py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm mb-4 sm:mb-6">
              <Car className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Driver Dashboard
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Manage Your Rides
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">
              View your offered rides, manage bookings, and communicate with passengers
            </p>
            
            {/* Driver Stats */}
            {user && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mt-4 sm:mt-6 max-w-4xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{rides.length}</div>
                    <div className="text-sm text-gray-600">Total Rides</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {rides.filter(r => r.status === 'ACTIVE').length}
                    </div>
                    <div className="text-sm text-gray-600">Active</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {rides.reduce((sum, ride) => sum + (ride.bookingsCount || 0), 0)}
                    </div>
                    <div className="text-sm text-gray-600">Bookings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      ₹{rides.reduce((sum, ride) => sum + (ride.revenue || 0), 0)}
                    </div>
                    <div className="text-sm text-gray-600">Revenue</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-100 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                <div className="text-red-800">{error}</div>
              </div>
            </div>
          )}

          {/* Rides List */}
          {rides.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-md border">
              <Car className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">No rides offered yet</h3>
              <p className="text-gray-600 mb-2 text-lg">Ready to start offering rides?</p>
              <p className="text-gray-500 mb-8">Create your first ride and start earning!</p>
              <Link 
                to="/offer-ride"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg"
              >
                🚙 Offer Your First Ride
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {rides.map((ride) => (
                <div 
                  key={ride.id} 
                  className="bg-white rounded-lg shadow-md border p-4 sm:p-6"
                >
                  {/* Ride Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {ride.fromLocation} → {ride.toLocation}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Ride #{ride.id} • Created {new Date(ride.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(ride.status)}`}>
                        {ride.status}
                      </span>
                    </div>
                  </div>

                  {/* Ride Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {new Date(ride.departureDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{ride.departureTime}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {ride.availableSeats}/{ride.totalSeats || ride.availableSeats} seats left
                      </span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <span className="text-sm font-semibold">
                        ₹{ride.pricePerSeat} per seat
                      </span>
                    </div>
                  </div>

                  {/* Booking Stats */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-gray-800">{ride.bookingsCount || 0}</div>
                        <div className="text-sm text-gray-600">Bookings</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-green-600">₹{ride.revenue || 0}</div>
                        <div className="text-sm text-gray-600">Revenue</div>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <div className="text-lg font-semibold text-blue-600">
                          {ride.instantBooking ? 'Instant' : 'Approval'}
                        </div>
                        <div className="text-sm text-gray-600">Booking Type</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleViewBookings(ride)}
                      className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      View Bookings ({ride.bookingsCount || 0})
                    </button>
                    <Link
                      to={`/ride/${ride.id}`}
                      className="flex items-center justify-center border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Link>
                    {ride.status === 'ACTIVE' && (
                      <>
                        <button className="flex items-center justify-center border border-orange-300 hover:bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Ride
                        </button>
                        <button className="flex items-center justify-center border border-red-300 hover:bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-lg shadow-md border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/offer-ride"
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                <Car className="w-5 h-5 mr-2" />
                Offer New Ride
              </Link>
              <Link
                to="/find-ride"
                className="flex items-center justify-center border border-green-600 hover:bg-green-50 text-green-600 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Find Rides
              </Link>
              <Link
                to="/my-bookings"
                className="flex items-center justify-center border border-purple-600 hover:bg-purple-50 text-purple-600 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                <Users className="w-5 h-5 mr-2" />
                My Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Modal */}
      {showBookingsModal && selectedRide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-blue-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {selectedRide.fromLocation} → {selectedRide.toLocation}
                  </h2>
                  <p className="text-blue-100 text-sm">
                    {new Date(selectedRide.departureDate).toLocaleDateString()} at {selectedRide.departureTime}
                  </p>
                </div>
                <button
                  onClick={() => setShowBookingsModal(false)}
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {rideBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No bookings yet</h3>
                  <p className="text-gray-600">Passengers haven't booked this ride yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {rideBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                      {/* Passenger Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                            {booking.passenger?.name ? booking.passenger.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'U'}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{booking.passenger?.name || 'Unknown Passenger'}</h4>
                            <div className="flex items-center text-sm text-gray-600">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span>{booking.passenger?.rating || 'N/A'} rating</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBookingStatusStyle(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>

                      {/* Booking Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-600">Seats Booked:</span>
                          <div className="font-semibold">{booking.seatsBooked}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Total Amount:</span>
                          <div className="font-semibold text-green-600">₹{booking.totalAmount}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Payment:</span>
                          <div className="font-semibold text-blue-600">{booking.paymentStatus}</div>
                        </div>
                      </div>

                      {/* Passenger Message */}
                      {booking.bookingMessage && (
                        <div className="bg-blue-50 rounded-lg p-3 mb-4">
                          <h5 className="text-sm font-medium text-blue-800 mb-1">Passenger Message:</h5>
                          <p className="text-sm text-blue-700">{booking.bookingMessage}</p>
                        </div>
                      )}

                      {/* Passenger Review (if completed) */}
                      {booking.status === 'COMPLETED' && booking.review && (
                        <div className="bg-green-50 rounded-lg p-3 mb-4">
                          <div className="flex items-center mb-2">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium text-green-800">
                              Passenger Review: {booking.rating}/5
                            </span>
                          </div>
                          <p className="text-sm text-green-700">{booking.review}</p>
                        </div>
                      )}

                      {/* Contact Actions */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                          <Phone className="w-4 h-4 mr-2" />
                          Call {booking.passenger?.name || 'Passenger'}
                        </button>
                        <button className="flex items-center justify-center border border-blue-600 hover:bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm transition-colors">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </button>
                        {booking.status === 'PENDING' && (
                          <>
                            <button 
                              onClick={() => handleBookingStatusUpdate(booking.id, 'CONFIRMED')}
                              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accept
                            </button>
                            <button 
                              onClick={() => handleBookingStatusUpdate(booking.id, 'REJECTED')}
                              className="flex items-center justify-center border border-red-600 hover:bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm transition-colors"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ManageRides;
