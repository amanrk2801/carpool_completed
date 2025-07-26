import { UserCheck, Search, Car, Shield } from 'lucide-react';

function StepCard({ step, title, description, icon: Icon }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
        <Icon className="w-8 h-8" />
      </div>
      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
        {step}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      title: "Sign In",
      description: "Create your profile with ID verification for a secure carpooling experience.",
      icon: UserCheck
    },
    {
      step: 2,
      title: "Find Rides",
      description: "Search for rides or passengers based on your route and schedule.",
      icon: Search
    },
    {
      step: 3,
      title: "Travel Safe",
      description: "Enjoy GPS-tracked journeys with real-time location sharing.",
      icon: Car
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Simple & Safe Process
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How <span className="text-blue-600">CarpoolConnect</span> Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting started is simple. Our three-step process ensures safety and convenience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((stepItem, index) => (
            <StepCard
              key={index}
              step={stepItem.step}
              title={stepItem.title}
              description={stepItem.description}
              icon={stepItem.icon}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xl font-bold text-blue-600">2 mins</div>
            <div className="text-sm text-gray-600">Signup Time</div>
          </div>
          <div className="text-center bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xl font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-600">Verified</div>
          </div>
          <div className="text-center bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xl font-bold text-blue-600">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
          <div className="text-center bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xl font-bold text-green-600">GPS</div>
            <div className="text-sm text-gray-600">Tracking</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
