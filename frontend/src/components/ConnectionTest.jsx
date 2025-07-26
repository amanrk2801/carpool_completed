import { useState } from 'react';
import { healthApi } from '../utils/api';

/**
 * ConnectionTest Component
 * 
 * Simple component to test the connection between frontend and backend.
 * This can be used to verify that the API integration is working.
 */
function ConnectionTest() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await healthApi.check();
      setHealthStatus(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Backend Connection Test</h2>
      
      <button
        onClick={testConnection}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Testing Connection...' : 'Test Backend Connection'}
      </button>

      {healthStatus && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-green-800 font-semibold">✅ Connection Successful!</h3>
          <div className="mt-2 text-sm text-green-700">
            <p><strong>Status:</strong> {healthStatus.status}</p>
            <p><strong>Message:</strong> {healthStatus.message}</p>
            <p><strong>Version:</strong> {healthStatus.version}</p>
            <p><strong>Timestamp:</strong> {healthStatus.timestamp}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold">❌ Connection Failed</h3>
          <p className="mt-2 text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}

export default ConnectionTest;
