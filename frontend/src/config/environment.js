// Environment Configuration
const getEnvironment = () => {
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  } else if (hostname.includes('staging') || hostname.includes('dev')) {
    return 'staging';
  } else {
    return 'production';
  }
};

const environment = getEnvironment();

const config = {
  development: {
    API_BASE_URL: 'http://localhost:8080/api',
    APP_NAME: 'CarpoolConnect (Dev)',
    DEBUG: true,
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  },
  staging: {
    API_BASE_URL: 'https://api-staging.carpoolconnect.com/api',
    APP_NAME: 'CarpoolConnect (Staging)',
    DEBUG: true,
    CACHE_DURATION: 10 * 60 * 1000, // 10 minutes
  },
  production: {
    API_BASE_URL: 'https://api.carpoolconnect.com/api',
    APP_NAME: 'CarpoolConnect',
    DEBUG: false,
    CACHE_DURATION: 30 * 60 * 1000, // 30 minutes
  }
};

export default config[environment];
