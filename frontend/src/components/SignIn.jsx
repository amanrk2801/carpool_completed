import { Shield, Car, Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { userApi } from '../utils/api';

/**
 * SignIn Component
 * 
 * Features:
 * - Maintains the same design consistency as the landing page
 * - Uses the same gradient background and color scheme
 * - Includes form validation states
 * - Password visibility toggle
 * - Responsive design with Tailwind CSS
 * - Navigation back to home and link to join page
 */

function SignIn() {
  const navigate = useNavigate();
  
  // State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  
  // State for form validation and loading
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      // Call the backend API
      const user = await userApi.login({
        email: formData.email,
        password: formData.password
      });
      
      // Store user data in localStorage for session
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Sign In successful:', user);
      
      // Navigate to appropriate page
      navigate('/find-ride');
      
    } catch (error) {
      console.error('Sign In error:', error);
      setErrors({ email: 'Invalid email or password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation Header - Same style as landing page */}
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo Section - Consistent with landing page */}
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
            
            {/* Navigation Links */}
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

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Trust Badge - Similar to landing page */}
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Secure Sign In
            </div>
            
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 mb-4">
              Sign In to your CarpoolConnect account and travel safely across India
            </p>
            
            {/* Demo Credentials Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</h3>
              <div className="text-xs text-blue-700 space-y-1">
                <div><strong>Email:</strong> john@example.com | <strong>Password:</strong> password123</div>
                <div><strong>Email:</strong> newuser@example.com | <strong>Password:</strong> password123</div>
              </div>
              <button 
                type="button"
                onClick={async () => {
                  console.log('Testing backend connection...');
                  try {
                    const response = await fetch('/api/health');
                    const text = await response.text();
                    console.log('Backend response:', text);
                    alert('Backend connection successful: ' + text);
                  } catch (error) {
                    console.error('Backend connection failed:', error);
                    alert('Backend connection failed: ' + error.message);
                  }
                }}
                className="mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded"
              >
                Test Backend Connection
              </button>
            </div>
          </div>

          {/* Sign In Form Card */}
          <div className="bg-white rounded-lg shadow-md p-8 border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Additional Options */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/join" className="text-blue-600 hover:text-blue-700 font-medium">
                  Join CarpoolConnect for free
                </Link>
              </p>
            </div>
          </div>

          {/* Security Notice - Similar to landing page security promise */}
          <div className="mt-6 bg-white rounded-lg p-4 shadow-sm border">
            <p className="text-sm text-gray-700 flex items-start">
              <Shield className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
              Your data is protected with industry-standard encryption and security measures. Bilkul safe aur secure!
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default SignIn;
