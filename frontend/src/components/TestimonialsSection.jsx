import { Star, Shield } from 'lucide-react';

function TestimonialCard({ name, role, location, content, rating, verified }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  const getInitials = (fullName) => {
    const names = fullName.split(' ');
    return names[0][0] + names[1][0];
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-3">
        {renderStars()}
      </div>
      
      <p className="text-gray-700 mb-4">"{content}"</p>
      
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
          {getInitials(name)}
        </div>
        <div>
          <div className="flex items-center">
            <h4 className="font-bold text-gray-800 mr-2">{name}</h4>
            {verified && <Shield className="w-4 h-4 text-green-600" />}
          </div>
          <p className="text-sm text-gray-600">{role} • {location}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma", role: "Software Engineer", location: "Delhi",
      content: "CarpoolConnect transformed my commute! Safe rides and saved money.",
      rating: 5, verified: true
    },
    {
      name: "Rahul Mehta", role: "Marketing Manager", location: "Mumbai", 
      content: "Amazing safety features - GPS tracking and verified profiles.",
      rating: 5, verified: true
    },
    {
      name: "Anjali Gupta", role: "Teacher", location: "Bangalore",
      content: "Eco-friendly platform with respectful and safety-conscious people.",
      rating: 5, verified: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Trusted by Users
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What Our <span className="text-blue-600">Community Says</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from verified CarpoolConnect members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              name={testimonial.name}
              role={testimonial.role}
              location={testimonial.location}
              content={testimonial.content}
              rating={testimonial.rating}
              verified={testimonial.verified}
            />
          ))}
        </div>

        <div className="text-center">
          <div className="bg-blue-600 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
            <p className="text-blue-100 mb-4">Start your safe carpooling journey today.</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;