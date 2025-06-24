"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Heart, Video, Play, Film, Package } from "lucide-react"

interface ServicesSectionProps {
  isVisible: { [key: string]: boolean }
}

interface Service {
    _id: string;
    title: string;
    description: string;
    icon: string; // This will be the name of the icon, e.g., "Camera"
}

// Map icon names from the database to actual React components
const iconMap: { [key: string]: React.ElementType } = {
    camera: Camera,
    heart: Heart,
    video: Video,
    play: Play,
    film: Film,
    package: Package, // Added a default icon
};

export default function ServicesSection({ isVisible }: ServicesSectionProps) {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/services');
            setServices(response.data);
        } catch (error) {
            console.error("Failed to fetch services:", error);
            // Optionally, set some default/fallback services or show an error message
        }
    };

    fetchServices();
  }, []);

  // Temporary, to keep the features part working.
  const serviceFeatures: { [key: string]: string[] } = {
    "Wedding Photography": ["Full day coverage", "High-resolution gallery", "Professional editing", "Custom photo album"],
    "Pre-Wedding Shoots": ["Location scouting", "Styling consultation", "Multiple outfit changes", "Same-day preview"],
    "Cinematic Video Editing": ["Color grading", "Audio enhancement", "Motion graphics", "Multiple formats"],
    "Traditional & Drone Videography": ["4K recording", "Drone footage", "Multi-camera setup", "Live streaming options"],
    "Short Films": ["Story development", "Professional crew", "Custom soundtrack", "Festival-quality production"],
    "Custom Packages": ["Flexible options", "Add-on services", "Payment plans", "Consultation included"],
  }


  return (
    <section id="services" className="py-20 bg-gradient-to-b from-rose-50 to-amber-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-rose-300 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-amber-300 rounded-full animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div
          data-animate
          id="services-header"
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible["services-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-6">Our Services</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            From intimate pre-wedding sessions to grand celebrations, we offer comprehensive photography and videography
            services tailored to your vision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon.toLowerCase()] || Package;
            const features = serviceFeatures[service.title] || [];
            
            return (
            <Card
                  key={service._id}
              data-animate
              id={`service-${index}`}
              className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-rose-100 bg-white/80 backdrop-blur-sm ${
                isVisible[`service-${index}`] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <IconComponent
                  className="text-rose-600 mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10"
                  size={48}
                />
                <h3 className="text-2xl font-serif text-rose-900 mb-4 relative z-10">{service.title}</h3>
                <p className="text-gray-600 mb-4 relative z-10">{service.description}</p>
                <ul className="text-sm text-gray-500 space-y-1 relative z-10">
                      {features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="transform hover:translate-x-1 transition-transform duration-200">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
