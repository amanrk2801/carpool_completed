import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';
import Footer from './Footer';

/**
 * LandingPage Component
 * 
 * Main landing page that combines all sections:
 * - Navigation bar with brand and auth links
 * - Hero section with main value proposition
 * - Features showcase
 * - How it works explanation
 * - Customer testimonials
 * - Call-to-action section
 * - Footer with additional links
 */
function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default LandingPage;
