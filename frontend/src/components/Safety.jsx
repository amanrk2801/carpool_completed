import { Shield, Car, UserCheck, Phone, MapPin, Clock, Eye, AlertTriangle, CheckCircle, ArrowLeft, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

/**
 * Safety Component
 * 
 * Features:
 * - Comprehensive safety information
 * - Safety features and protocols
 * - Emergency procedures
 * - Trust and verification details
 * - Consistent design with other pages
 */
function Safety() {
  const safetyFeatures = [
    {
      title: "ID Verification",
      description: "All users must verify with government-issued ID before joining our platform.",
      icon: UserCheck,
      details: ["Aadhaar Card verification", "PAN Card validation", "Driving license check", "Phone number verification"]
    },
    {
      title: "Real-time GPS Tracking",
      description: "Every ride is tracked with GPS for complete transparency and safety.",
      icon: MapPin,
      details: ["Live location sharing", "Route monitoring", "Speed tracking", "Geofence alerts"]
    },
    {
      title: "24/7 Safety Support",
      description: "Our dedicated safety team is available round the clock for any emergency.",
      icon: Phone,
      details: ["Emergency hotline", "Instant SOS feature", "Police coordination", "Medical assistance"]
    },
    {
      title: "Background Checks",
      description: "We conduct thorough background verification for all drivers.",
      icon: Shield,
      details: ["Criminal record check", "Driving history review", "Reference verification", "Regular re-screening"]
    }
  ];

  const safetyProtocols = [
    {
      title: "Pre-Trip Safety",
      items: [
        "Verify driver and vehicle details",
        "Share trip details with family/friends",
        "Check driver's rating and reviews",
        "Confirm pickup location and time"
      ]
    },
    {
      title: "During the Trip",
      items: [
        "Use GPS tracking feature",
        "Keep emergency contacts handy",
        "Stay alert and aware",
        "Use in-app messaging only"
      ]
    },
    {
      title: "Emergency Procedures",
      items: [
        "Press SOS button for immediate help",
        "Call our 24/7 helpline: 1800-0000-1234",
        "Share live location with trusted contacts",
        "Contact local authorities if needed"
      ]
    }
  ];

  const emergencySteps = [
    {
      step: 1,
      title: "Press SOS Button",
      description: "Instantly alert our safety team and emergency contacts",
      icon: AlertTriangle
    },
    {
      step: 2,
      title: "Automatic Location Sharing",
      description: "Your live location is shared with safety team and emergency contacts",
      icon: MapPin
    },
    {
      step: 3,
      title: "Immediate Response",
      description: "Our team contacts you within 30 seconds and coordinates help",
      icon: Phone
    },
    {
      step: 4,
      title: "Continuous Monitoring",
      description: "We stay with you until you're safe and the situation is resolved",
      icon: Eye
    }
  ];

  const trustIndicators = [
    { label: "Users Verified", value: "1,00,000+" },
    { label: "Background Checks", value: "100%" },
    { label: "Safety Response Time", value: "< 30 sec" },
    { label: "Incident Resolution", value: "99.9%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between h-16">
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
              <Link 
                to="/signin"
                className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/join"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Join
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Your Safety is Our Priority
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            <span className="text-green-600">Safety First</span> at CarpoolConnect
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Multiple layers of safety verification, real-time tracking, and 24/7 support to ensure your journey is always secure.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className={`bg-white px-4 py-3 rounded-lg shadow-sm border ${index === 0 ? 'ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' : ''}`}>
                <div className={`text-2xl font-bold ${index === 0 ? 'bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent' : 'text-blue-600'}`}>
                  {indicator.value}
                </div>
                <div className={`text-sm ${index === 0 ? 'text-orange-700 font-semibold' : 'text-gray-600'}`}>
                  {indicator.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our <span className="text-blue-600">Safety Features</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive safety measures to protect every journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                <ul className="text-left text-sm text-gray-500 space-y-1">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Response Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="text-red-600">Emergency Response</span> System
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our rapid response system ensures help reaches you within seconds
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {emergencySteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-red-600 text-white px-8 py-4 rounded-lg inline-block shadow-md">
              <h3 className="text-xl font-bold mb-2">Emergency Helpline</h3>
              <p className="text-2xl font-bold">1800-0000-1234</p>
              <p className="text-sm text-red-100">Available 24/7 across India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Protocols Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Safety <span className="text-blue-600">Guidelines</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow these simple guidelines for a safe carpooling experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safetyProtocols.map((protocol, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md border">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                  {protocol.title}
                </h3>
                <ul className="space-y-3">
                  {protocol.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Additional <span className="text-green-600">Safety Tips</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">For Passengers</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Always check driver's profile and ratings before booking</li>
                <li>• Share trip details with family or friends</li>
                <li>• Sit in the back seat when traveling alone</li>
                <li>• Keep your phone charged and accessible</li>
                <li>• Trust your instincts - if something feels wrong, speak up</li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 border">
              <h3 className="text-lg font-semibold text-green-800 mb-3">For Drivers</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Verify passenger details before confirming ride</li>
                <li>• Keep your vehicle well-maintained and clean</li>
                <li>• Follow traffic rules and drive safely</li>
                <li>• Be respectful and professional with passengers</li>
                <li>• Report any suspicious behavior immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Verification Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by <span className="text-4xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">1 Lakh+</span> Indians
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the largest community of verified carpoolers in India. Your safety is our commitment.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 text-sm">
            <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 px-6 py-3 rounded-full font-bold shadow-lg">
              <Users className="w-5 h-5 text-blue-900 mr-2" />
              <span className="text-lg font-extrabold">1 LAKH+ VERIFIED MEMBERS</span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
              <Star className="w-5 h-5 text-white mr-2" />
              <span className="text-lg font-extrabold">4.8/5 SAFETY RATING</span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-purple-500 to-violet-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
              <Shield className="w-5 h-5 text-white mr-2" />
              <span className="text-lg font-extrabold">ZERO TOLERANCE POLICY</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/join"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <UserCheck className="w-5 h-5" />
              Join Safely Today
            </Link>
            <Link 
              to="/how-it-works"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-colors border-2 border-green-600"
            >
              <Shield className="w-5 h-5" />
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Security Promise */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <p className="text-gray-700 flex items-start text-center">
              <Shield className="w-5 h-5 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
              Security Promise: Complete verification, GPS tracking, 24/7 support, and emergency response for your safety. Aap bilkul safe rahenge!
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Safety;
