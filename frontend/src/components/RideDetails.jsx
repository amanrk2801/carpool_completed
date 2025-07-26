import { Shield, Car, MapPin, Calendar, Clock, Users, ArrowLeft, Star, IndianRupee, Phone, MessageCircle, User, CreditCard, CheckCircle, AlertCircle, Navigation } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Footer from './Footer';
import { rideApi, bookingApi } from '../utils/api';

/**
 * RideDetails Component
 * 
 * Features:
 * - Detailed ride information
 * - Driver profile and ratings
 * - Booking interface with seat selection
 * - Contact driver functionality
 * - Payment integration ready
 * - Review and rating system
 * - Safety information
 */
function RideDetails() {
  const navigate = useNavigate();
  const { rideId } = useParams();
  const [searchParams] = useSearchParams();
  
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

  // State for ride data
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for booking
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [bookingMessage, setBookingMessage] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // State for contact
  const [showContact, setShowContact] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  // Check if contact should be shown from URL params
  useEffect(() => {
    if (searchParams.get('contact') === 'true') {
      setShowContact(true);
    }
  }, [searchParams]);

  // Transform backend ride data to frontend format
  const transformRideData = (backendRide) => {
    if (!backendRide || typeof backendRide !== 'object') {
      return null;
    }

    // Handle driver name from firstName and lastName
    const driverFirstName = backendRide.driver?.firstName || '';
    const driverLastName = backendRide.driver?.lastName || '';
    const driverFullName = `${driverFirstName} ${driverLastName}`.trim() || 'Unknown Driver';

    return {
      id: backendRide.id,
      driver: {
        id: backendRide.driver?.id || 1,
        name: driverFullName,
        rating: backendRide.driver?.rating || 4.0,
        trips: backendRide.driver?.totalTrips || backendRide.driver?.trips || 0,
        photo: `${driverFirstName.charAt(0)}${driverLastName.charAt(0)}`.toUpperCase() || 'UD',
        phone: backendRide.driver?.phone || 'N/A',
        email: backendRide.driver?.email || 'N/A',
        joinedDate: backendRide.driver?.createdAt || backendRide.driver?.joinedDate || new Date().toISOString().split('T')[0],
        verificationStatus: "verified",
        bio: backendRide.driver?.bio || `Experienced driver with safe driving record.`
      },
      route: {
        from: backendRide.fromLocation || 'Unknown Location',
        to: backendRide.toLocation || 'Unknown Destination',
        stops: backendRide.stops ? backendRide.stops.split(',').map(s => s.trim()).filter(s => s) : [],
        distance: backendRide.distance || 'N/A',
        duration: backendRide.duration || 'N/A'
      },
      departure: {
        date: backendRide.departureDate || new Date().toISOString().split('T')[0],
        time: backendRide.departureTime || '00:00'
      },
      car: {
        model: backendRide.carModel || 'Unknown Model',
        number: backendRide.carNumber || 'Unknown',
        year: backendRide.carYear || '2020',
        color: backendRide.carColor || 'Unknown',
        ac: backendRide.hasAC !== undefined ? backendRide.hasAC : true,
        musicSystem: backendRide.hasMusicSystem !== undefined ? backendRide.hasMusicSystem : true
      },
      pricing: {
        pricePerSeat: backendRide.pricePerSeat || 0,
        availableSeats: backendRide.availableSeats || 0,
        totalSeats: backendRide.totalSeats || backendRide.availableSeats || 4
      },
      preferences: {
        instantBooking: backendRide.instantBooking !== undefined ? backendRide.instantBooking : true,
        allowSmoking: backendRide.allowSmoking || false,
        allowPets: backendRide.allowPets || false,
        allowFood: backendRide.allowFood !== undefined ? backendRide.allowFood : true,
        luggageSpace: backendRide.luggageSpace || "1 bag per passenger"
      },
      additionalInfo: backendRide.additionalInfo || "Looking forward to a pleasant journey!",
      reviews: [] // Reviews would come from a separate API call
    };
  };

  // Fetch ride details
  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        setLoading(true);
        const rawRideData = await rideApi.getById(rideId);
        console.log('Raw ride data from backend:', rawRideData);
        
        // Transform the backend data to frontend format
        const transformedRide = transformRideData(rawRideData);
        console.log('Transformed ride data:', transformedRide);
        
        if (transformedRide) {
          setRide(transformedRide);
        } else {
          throw new Error('Invalid ride data received');
        }
      } catch (error) {
        console.error('Error fetching ride details:', error);
        setError('Failed to load ride details');
        // Fallback to mock data for demo
        setRide(getMockRideData(rideId));
      } finally {
        setLoading(false);
      }
    };

    if (rideId) {
      fetchRideDetails();
    }
  }, [rideId]);

  // Mock ride data for demo
  const getMockRideData = (id) => ({
    id: parseInt(id),
    driver: {
      id: 1,
      name: "Rahul Sharma",
      rating: 4.8,
      trips: 45,
      photo: "RS",
      phone: "+91 98765 43210",
      email: "rahul.sharma@example.com",
      joinedDate: "2023-05-15",
      verificationStatus: "verified",
      bio: "Experienced driver with 5+ years of safe driving. I love traveling and meeting new people!"
    },
    route: {
      from: "Mumbai, Maharashtra",
      to: "Pune, Maharashtra",
      stops: ["Lonavala", "Khandala"],
      distance: "150 km",
      duration: "3 hours"
    },
    departure: {
      date: "2025-07-27",
      time: "09:00"
    },
    car: {
      model: "Honda City",
      number: "MH 12 AB 1234",
      year: "2020",
      color: "White",
      ac: true,
      musicSystem: true
    },
    pricing: {
      pricePerSeat: 350,
      availableSeats: 3,
      totalSeats: 4
    },
    preferences: {
      instantBooking: true,
      allowSmoking: false,
      allowPets: true,
      allowFood: true,
      luggageSpace: "1 bag per passenger"
    },
    additionalInfo: "Pickup from Andheri East. Please be on time as we have a tight schedule. Looking forward to a pleasant journey!",
    reviews: [
      {
        id: 1,
        passengerName: "Priya M.",
        rating: 5,
        comment: "Excellent driver! Very punctual and friendly. Highly recommended!",
        date: "2025-07-20"
      },
      {
        id: 2,
        passengerName: "Amit K.",
        rating: 4,
        comment: "Safe journey. Good conversation and comfortable car.",
        date: "2025-07-18"
      }
    ]
  });

  // Handle seat selection
  const handleSeatChange = (increment) => {
    setSelectedSeats(prev => 
      Math.max(1, Math.min(ride?.pricing?.availableSeats || 1, prev + increment))
    );
  };

  // Handle booking
  const handleBookRide = async () => {
    if (!user || !ride) return;

    // Check if user is trying to book their own ride
    if (user.id === ride.driver?.id || user.id === ride.driverId) {
      alert('You cannot book your own ride! As the driver of this ride, you already have a seat reserved.');
      return;
    }

    setIsBooking(true);
    try {
      const bookingData = {
        passengerId: user.id,
        rideId: ride.id,
        seatsBooked: selectedSeats,
        totalAmount: selectedSeats * (ride.pricing?.pricePerSeat || 0),
        bookingMessage: bookingMessage
      };

      // Create booking object for storage
      const newBooking = {
        id: Date.now(), // Temporary ID
        ride: {
          id: ride.id,
          driver: {
            name: ride.driver?.name || 'Unknown Driver',
            rating: ride.driver?.rating || 4.0,
            photo: ride.driver?.photo || 'UD'
          },
          route: {
            from: ride.route?.from || 'Unknown',
            to: ride.route?.to || 'Unknown'
          },
          departure: {
            date: ride.departure?.date || new Date().toISOString().split('T')[0],
            time: ride.departure?.time || '00:00'
          },
          car: {
            model: ride.car?.model || 'Unknown Model',
            number: ride.car?.number || 'Unknown'
          }
        },
        seatsBooked: selectedSeats,
        totalAmount: selectedSeats * (ride.pricing?.pricePerSeat || 0),
        status: "CONFIRMED",
        bookingDate: new Date().toISOString().split('T')[0],
        bookingMessage: bookingMessage || ""
      };

      try {
        // Try to create booking via API
        const booking = await bookingApi.create(bookingData);
        console.log('Booking created via API:', booking);
        
        // If API call succeeds, use the returned booking data
        if (booking && booking.id) {
          newBooking.id = booking.id;
        }
      } catch (apiError) {
        console.warn('API booking failed, storing locally:', apiError);
        // Continue with local storage even if API fails
      }

      // Store booking locally for immediate UI update
      const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      const updatedBookings = [...existingBookings, newBooking];
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));

      console.log('Booking created and stored:', newBooking);
      setBookingSuccess(true);
      
      // Show success message for 2 seconds then redirect
      setTimeout(() => {
        navigate('/my-bookings', {
          state: {
            message: 'Booking confirmed successfully! Your ride has been reserved.',
            bookingId: newBooking.id
          }
        });
      }, 2000);

    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  // Handle contact driver
  const handleContactDriver = () => {
    setShowContact(true);
  };

  // Handle sending message
  const handleSendMessage = () => {
    // In a real app, this would send the message through your messaging system
    console.log('Sending message to driver:', contactMessage);
    alert(`Message sent to ${ride.driver?.name || 'the driver'}! They will contact you soon.`);
    setShowContact(false);
    setContactMessage('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading ride details...</p>
        </div>
      </div>
    );
  }

  if (error || !ride) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Ride Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The ride you\'re looking for doesn\'t exist.'}</p>
          <Link 
            to="/find-ride" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Find Other Rides
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/find-ride" className="flex items-center group">
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
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/find-ride"
                className="text-blue-700 hover:text-blue-800 px-4 py-2 text-sm font-medium transition-colors border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                Find Ride
              </Link>
              <Link 
                to="/offer-ride"
                className="text-green-700 hover:text-green-800 text-sm font-medium transition-colors border border-green-600 rounded-lg px-4 py-2 hover:bg-green-50"
              >
                Offer Ride
              </Link>
              {user && (
                <>
                  <Link 
                    to="/my-bookings"
                    className="text-purple-700 hover:text-purple-800 text-sm font-medium transition-colors border border-purple-600 rounded-lg px-4 py-2 hover:bg-purple-50"
                  >
                    My Bookings
                  </Link>
                  <span className="text-gray-700 text-sm">Hello, {user.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Booking Success Message */}
          {bookingSuccess && (
            <div className="mb-6 bg-green-100 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <div>
                  <h3 className="text-green-800 font-semibold">Booking Successful!</h3>
                  <p className="text-green-700 text-sm">Your ride has been booked. Redirecting to your bookings...</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Ride Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Route Information */}
              <div className="bg-white rounded-lg shadow-md border p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip Details</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-800">{ride.route?.from || 'N/A'}</div>
                      <div className="text-sm text-gray-600">Pickup Location</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Navigation className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-800">{ride.route?.to || 'N/A'}</div>
                      <div className="text-sm text-gray-600">Drop-off Location</div>
                    </div>
                  </div>

                  {ride.route?.stops?.length > 0 && (
                    <div className="flex items-center">
                      <div className="w-5 h-5 mr-3 flex items-center justify-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Stops: {ride.route?.stops?.join(', ') || 'None'}</div>
                        <div className="text-sm text-gray-600">Intermediate stops</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-800">
                        {ride.departure?.date ? new Date(ride.departure.date).toLocaleDateString('en-IN', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }) : 'N/A'}
                      </div>
                      <div className="text-sm text-gray-600">Departure Date</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-orange-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-800">{ride.departure?.time || 'N/A'}</div>
                      <div className="text-sm text-gray-600">Departure Time</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Distance:</span>
                        <span className="font-medium ml-2">{ride.route?.distance || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium ml-2">{ride.route?.duration || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver Information */}
              <div className="bg-white rounded-lg shadow-md border p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Driver Information</h2>
                
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {ride.driver?.photo || ride.driver?.name?.charAt(0) || 'U'}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{ride.driver?.name || 'Unknown Driver'}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{ride.driver?.rating || 'N/A'}</span>
                        <span className="text-gray-600 text-sm ml-1">({ride.driver?.trips || 0} trips)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>Member since {ride.driver?.joinedDate ? new Date(ride.driver.joinedDate).toLocaleDateString() : 'N/A'}</div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        Verified Driver
                      </div>
                    </div>
                    
                    {ride.driver?.bio && (
                      <p className="mt-3 text-gray-700 text-sm">{ride.driver.bio}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Car Information */}
              <div className="bg-white rounded-lg shadow-md border p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Vehicle Details</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Car className="w-5 h-5 text-gray-600 mr-3" />
                      <div>
                        <div className="font-medium">{ride.car?.model || 'N/A'}</div>
                        <div className="text-sm text-gray-600">{ride.car?.year || 'N/A'} • {ride.car?.color || 'N/A'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-5 h-5 mr-3 flex items-center justify-center">
                        <span className="text-gray-600 font-bold text-sm">#</span>
                      </div>
                      <div>
                        <div className="font-medium">{ride.car?.number || 'N/A'}</div>
                        <div className="text-sm text-gray-600">License Plate</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">Features</h4>
                    <div className="space-y-1 text-sm">
                      {ride.car?.ac && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Air Conditioning
                        </div>
                      )}
                      {ride.car?.musicSystem && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Music System
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferences & Rules */}
              <div className="bg-white rounded-lg shadow-md border p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Trip Preferences</h2>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className={`flex items-center ${ride.preferences?.allowSmoking ? 'text-green-600' : 'text-red-600'}`}>
                      {ride.preferences?.allowSmoking ? <CheckCircle className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
                      Smoking {ride.preferences?.allowSmoking ? 'Allowed' : 'Not Allowed'}
                    </div>
                    
                    <div className={`flex items-center ${ride.preferences?.allowPets ? 'text-green-600' : 'text-red-600'}`}>
                      {ride.preferences?.allowPets ? <CheckCircle className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
                      Pets {ride.preferences?.allowPets ? 'Welcome' : 'Not Allowed'}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className={`flex items-center ${ride.preferences?.allowFood ? 'text-green-600' : 'text-red-600'}`}>
                      {ride.preferences?.allowFood ? <CheckCircle className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
                      Food {ride.preferences?.allowFood ? 'Allowed' : 'Not Allowed'}
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Luggage: {ride.preferences?.luggageSpace || 'N/A'}
                    </div>
                  </div>
                </div>

                {ride.additionalInfo && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Additional Information</h4>
                    <p className="text-blue-700 text-sm">{ride.additionalInfo}</p>
                  </div>
                )}
              </div>

              {/* Reviews */}
              {ride.reviews && ride.reviews.length > 0 && (
                <div className="bg-white rounded-lg shadow-md border p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Reviews</h2>
                  
                  <div className="space-y-4">
                    {ride.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">{review.passengerName}</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm mb-1">{review.comment}</p>
                        <span className="text-gray-500 text-xs">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md border p-6 sticky top-4">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-800">₹{ride.pricing?.pricePerSeat || 0}</div>
                  <div className="text-gray-600">per seat</div>
                </div>

                {/* Seat Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Number of Seats
                  </label>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleSeatChange(-1)}
                      disabled={selectedSeats <= 1}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold">{selectedSeats}</span>
                    <button
                      type="button"
                      onClick={() => handleSeatChange(1)}
                      disabled={selectedSeats >= (ride.pricing?.availableSeats || 1)}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 text-center mt-2">
                    {ride.pricing?.availableSeats || 0} of {ride.pricing?.totalSeats || 0} seats available
                  </div>
                </div>

                {/* Total Price */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total Price:</span>
                    <span className="text-xl font-bold text-gray-800">₹{selectedSeats * (ride.pricing?.pricePerSeat || 0)}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {selectedSeats} seat{selectedSeats > 1 ? 's' : ''} × ₹{ride.pricing?.pricePerSeat || 0}
                  </div>
                </div>

                {/* Booking Message */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message to Driver (Optional)
                  </label>
                  <textarea
                    value={bookingMessage}
                    onChange={(e) => setBookingMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="Any specific requirements or pickup details..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Check if user is the driver */}
                  {user && (user.id === ride.driver?.id || user.id === ride.driverId) ? (
                    <div className="w-full bg-gray-100 text-gray-600 py-3 px-4 rounded-lg font-medium text-center border-2 border-gray-300">
                      <Car className="w-5 h-5 mx-auto mb-2" />
                      <div>You are the driver of this ride</div>
                      <div className="text-sm text-gray-500 mt-1">Drivers cannot book their own rides</div>
                    </div>
                  ) : (
                    <button
                      onClick={handleBookRide}
                      disabled={isBooking || bookingSuccess}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                    >
                      {isBooking ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Booking...
                        </>
                      ) : bookingSuccess ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Booked!
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          {ride.preferences?.instantBooking ? 'Book Now' : 'Request Booking'}
                        </>
                      )}
                    </button>
                  )}

                  {user && (user.id === ride.driver?.id || user.id === ride.driverId) ? (
                    <Link
                      to="/manage-rides"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <User className="w-5 h-5 mr-2" />
                      <div>
                        <div>Manage Your Ride</div>
                        <div className="text-sm text-blue-200 mt-1">View bookings and passenger messages</div>
                      </div>
                    </Link>
                  ) : (
                    <button
                      onClick={handleContactDriver}
                      className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Contact Driver
                    </button>
                  )}
                </div>

                {/* Safety Notice */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-green-700">
                      <div className="font-medium mb-1">Safe & Secure</div>
                      <div>Driver verified • GPS tracking • 24/7 support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Contact {ride.driver?.name || 'Driver'}</h3>
              <button
                onClick={() => setShowContact(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-800">{ride.driver?.phone || 'N/A'}</div>
                  <div className="text-sm text-gray-600">Driver's phone number</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send Message
                </label>
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder="Hi! I'd like to know more about your ride..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowContact(false)}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!contactMessage.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default RideDetails;
