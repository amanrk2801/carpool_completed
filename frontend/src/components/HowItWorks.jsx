import { Shield, Car, UserCheck, Search, CreditCard, MapPin, Clock, Phone, ArrowLeft, Users, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

/**
 * HowItWorks Component
 * 
 * Features:
 * - Detailed explanation of the carpooling process
 * - Step-by-step guide for both riders and drivers
 * - FAQ section
 * - Consistent design with other pages
 * - Interactive elements and animations
 */
function HowItWorks() {
  const riderSteps = [
    {
      step: 1,
      title: "Create Your Profile",
      description: "Sign In with verified ID and phone number. Add your photo and basic details for a complete profile.",
      icon: UserCheck,
      details: ["Upload government ID", "Verify phone number", "Add profile photo", "Complete safety training"]
    },
    {
      step: 2,
      title: "Search for Rides",
      description: "Enter your route and travel date to find available rides with verified drivers.",
      icon: Search,
      details: ["Enter pickup and drop locations", "Select travel date and time", "Filter by preferences", "View driver profiles and ratings"]
    },
    {
      step: 3,
      title: "Book & Pay",
      description: "Secure your seat with instant booking and safe payment options.",
      icon: CreditCard,
      details: ["Instant seat confirmation", "Secure payment gateway", "Get driver contact details", "Receive trip confirmation"]
    },
    {
      step: 4,
      title: "Travel Safe",
      description: "Enjoy GPS-tracked journeys with real-time location sharing and 24/7 support.",
      icon: Shield,
      details: ["Real-time GPS tracking", "Emergency contact sharing", "24/7 safety support", "Rate your experience"]
    }
  ];

  const driverSteps = [
    {
      step: 1,
      title: "Vehicle Verification",
      description: "Register your vehicle with valid documents and get verified.",
      icon: Car,
      details: ["Upload driving license", "Vehicle registration papers", "Insurance documents", "Vehicle inspection"]
    },
    {
      step: 2,
      title: "Create Trip",
      description: "Post your route, time, and available seats for passengers to find.",
      icon: MapPin,
      details: ["Set pickup/drop points", "Choose departure time", "Set seat availability", "Add trip preferences"]
    },
    {
      step: 3,
      title: "Accept Passengers",
      description: "Review passenger requests and confirm bookings.",
      icon: Users,
      details: ["Review passenger profiles", "Accept booking requests", "Communicate trip details", "Share contact information"]
    },
    {
      step: 4,
      title: "Complete Trip",
      description: "Complete the journey safely and earn money.",
      icon: Star,
      details: ["Start GPS tracking", "Pick up passengers", "Complete the journey", "Receive payment and ratings"]
    }
  ];

  const faqs = [
    {
      question: "Is CarpoolConnect safe?",
      answer: "Yes! We verify all users with government ID, track all rides with GPS, provide 24/7 support, and have emergency contact features."
    },
    {
      question: "How much does it cost?",
      answer: "Joining is absolutely free! Ride costs are shared among passengers, typically 50-70% cheaper than individual cab rides."
    },
    {
      question: "What if my ride gets cancelled?",
      answer: "We'll help you find alternative rides immediately. If no alternative is available, you get a full refund within 24 hours."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel up to 2 hours before the trip. Cancellation fees may apply based on timing."
    },
    {
      question: "How do I contact my co-passengers?",
      answer: "After booking confirmation, you can contact your driver and co-passengers through our secure in-app messaging system."
    },
    {
      question: "What if I face any issues during the trip?",
      answer: "Use our SOS feature for immediate help. Our 24/7 safety team will assist you and can contact emergency services if needed."
    }
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
            Simple & Safe Process
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            How <span className="text-blue-600">CarpoolConnect</span> Works
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join 1 lakh+ Indians in safe, affordable carpooling. Simple steps to start your journey today!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 text-sm">
            <div className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
              <Users className="w-5 h-5 text-white mr-2" />
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
        </div>
      </section>

      {/* For Riders Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              For <span className="text-blue-600">Passengers</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find safe, affordable rides with verified drivers across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {riderSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                <ul className="text-left text-sm text-gray-500 space-y-1">
                  {step.details.map((detail, idx) => (
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

      {/* For Drivers Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              For <span className="text-green-600">Drivers</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Share your ride, earn money, and help reduce traffic pollution
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {driverSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                <ul className="text-left text-sm text-gray-500 space-y-1">
                  {step.details.map((detail, idx) => (
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

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Get answers to common questions about CarpoolConnect
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  {faq.question}
                </h3>
                <p className="text-gray-600 pl-5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Indians who travel safely and affordably with CarpoolConnect
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/find-ride"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <Search className="w-5 h-5" />
              Find a Ride
            </Link>
            <Link 
              to="/offer-ride"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-colors border-2 border-green-600"
            >
              <Car className="w-5 h-5" />
              Offer a Ride
            </Link>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <p className="text-gray-700 flex items-start text-center">
              <Shield className="w-5 h-5 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
              Security Promise: GPS tracking, emergency contacts, and 24/7 support for your safety. Aap bilkul safe rahenge!
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default HowItWorks;
