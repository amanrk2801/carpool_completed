import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * CTASection Component (Call-to-Action)
 * 
 * Features:
 * - Strong call-to-action with statistics
 * - Navigation to signup page
 * - Trust indicators and safety promise
 * - Responsive design with engaging visuals
 */
function CTASection() {
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm mb-6">
          <Shield className="w-4 h-4 mr-2" />
          Trusted by 1 Lakh+ Commuters
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Start Your <span className="text-green-300">Safe Journey?</span>
        </h2>
        
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of verified commuters across India saving money and traveling safely every day.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white mb-1">1 Lakh+</div>
            <div className="text-blue-100 text-sm">Members</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white mb-1">4.8/5</div>
            <div className="text-blue-100 text-sm">Safety Rating</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white mb-1">100%</div>
            <div className="text-blue-100 text-sm">Verified</div>
          </div>
        </div>
        
        <Link 
          to="/join"
          className="inline-block bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg text-lg font-bold shadow-lg transition-colors"
        >
          Get Started Today
        </Link>
        
        <div className="bg-white/10 rounded-lg p-6 mt-8 max-w-2xl mx-auto">
          <div className="flex items-start justify-center text-left">
            <Shield className="w-6 h-6 text-green-300 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Safety Promise</h3>
              <p className="text-blue-100 text-sm">
                GPS tracking, emergency contacts, and 24/7 support for complete peace of mind. Aap safe ho!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
