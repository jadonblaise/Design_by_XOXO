// ===== WhyUsSection.js =====
import React from 'react';
import { Clock, Globe, MapPin } from 'lucide-react';

const WhyUsSection = () => {
  const features = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: "On-Time Delivery",
      description: "We guarantee your orders arrive exactly when promised. Your time matters to us, and punctuality is our priority."
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Worldwide Shipping",
      description: "Fashion knows no borders. We deliver premium quality to your doorstep, anywhere in the world with care."
    },
    {
      icon: <MapPin className="w-12 h-12" />,
      title: "Heart of the City",
      description: "Our flagship store is located in the city's most prestigious fashion district, easily accessible to all our valued customers."
    }
  ];

  return (
    <section id="why-us" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Why Design by XOXO?</h2>
        <p className="text-center text-gray-600 mb-16 text-lg">Excellence in every detail</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-full mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-12 shadow-lg">
          <h3 className="text-3xl font-bold mb-4 text-gray-900">Our Promise to You</h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            At Design by XOXO, we believe that every woman deserves to feel beautiful, confident, and empowered. 
            Our commitment goes beyond fashion—we're dedicated to providing an exceptional shopping experience from 
            the moment you browse our collection to the day your order arrives at your doorstep.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;