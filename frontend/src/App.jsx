import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import ToastContainer from './components/ToastContainer';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import JoinFree from './components/JoinFree';
import OfferRide from './components/OfferRide';
import FindRide from './components/FindRide';
import RideDetails from './components/RideDetails';
import MyBookings from './components/MyBookings';
import ManageRides from './components/ManageRides';
import HowItWorks from './components/HowItWorks';
import Safety from './components/Safety';
import Help from './components/Help';
import ConnectionTest from './components/ConnectionTest';

/**
 * Main App Component
 * 
 * Features:
 * - React Router setup for navigation
 * - Route definitions for all pages
 * - Consistent layout structure
 */
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <Routes>
        {/* Home/Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Authentication Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/join" element={<JoinFree />} />
        
        {/* Ride Pages */}
        <Route path="/offer-ride" element={<OfferRide />} />
        <Route path="/find-ride" element={<FindRide />} />
        <Route path="/ride/:rideId" element={<RideDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/manage-rides" element={<ManageRides />} />
        
        {/* Information Pages */}
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/help" element={<Help />} />
        
        {/* Test Pages */}
        <Route path="/test-connection" element={<ConnectionTest />} />
        
        {/* Fallback route - redirect to home */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <ToastContainer />
    </Router>
    </ErrorBoundary>
  );
}

export default App;
