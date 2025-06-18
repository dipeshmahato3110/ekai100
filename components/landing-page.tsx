"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Video,
  Heart,
  Star,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Play,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

export default function LandingPage() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const [animatedStats, setAnimatedStats] = useState({ weddings: 0, years: 0, awards: 0, clients: 0 })

  const heroImages = ["/images/hero-1.jpg", "/images/hero-2.jpg", "/images/hero-3.jpg"]

  const portfolioItems = [
    {
      id: 1,
      category: "wedding",
      type: "image",
      src: "/images/portfolio-1.jpg",
      title: "Romantic Garden Wedding",
    },
    {
      id: 2,
      category: "pre-wedding",
      type: "video",
      src: "/videos/engagement-1.mp4",
      title: "Sunset Engagement Film",
      poster: "/images/portfolio-2.jpg",
    },
    {
      id: 3,
      category: "wedding",
      type: "image",
      src: "/images/portfolio-3.jpg",
      title: "Elegant Ballroom Ceremony",
    },
    {
      id: 4,
      category: "film",
      type: "video",
      src: "/videos/wedding-1.mp4",
      title: "Love Story Short Film",
      poster: "/images/portfolio-4.jpg",
    },
    {
      id: 5,
      category: "pre-wedding",
      type: "image",
      src: "/images/portfolio-5.jpg",
      title: "Beach Romance Session",
    },
    {
      id: 6,
      category: "behind-scenes",
      type: "video",
      src: "/videos/wedding-2.mp4",
      title: "Behind the Magic",
      poster: "/images/portfolio-6.jpg",
    },
  ]

  const testimonials = [
    {
      name: "Sarah & Michael",
      text: "Absolutely breathtaking work! They captured every emotion and created memories we'll treasure forever.",
      rating: 5,
      image: "/images/testimonial-1.jpg",
      location: "Beverly Hills, CA",
    },
    {
      name: "Priya & Arjun",
      text: "The attention to detail and artistic vision exceeded our expectations. Our wedding film is pure magic.",
      rating: 5,
      image: "/images/testimonial-2.jpg",
      location: "Malibu, CA",
    },
    {
      name: "Emma & James",
      text: "Professional, creative, and so easy to work with. They made our special day even more beautiful.",
      rating: 5,
      image: "/images/testimonial-3.jpg",
      location: "Napa Valley, CA",
    },
    {
      name: "David & Lisa",
      text: "The team went above and beyond to capture our special moments. Truly exceptional service and artistry.",
      rating: 5,
      image: "/images/testimonial-4.jpg",
      location: "Santa Barbara, CA",
    },
    {
      name: "Raj & Meera",
      text: "Every photo tells a story. They have an incredible eye for detail and emotion. Highly recommended!",
      rating: 5,
      image: "/images/testimonial-5.jpg",
      location: "San Francisco, CA",
    },
  ]

  const teamMembers = [
    {
      name: "Alexandra Chen",
      role: "Lead Photographer & Creative Director",
      image: "/images/team-1.jpg",
      bio: "With over 10 years of experience, Alexandra brings artistic vision and technical expertise to every shoot.",
      specialties: ["Wedding Photography", "Portrait Sessions", "Creative Direction"],
    },
    {
      name: "Marcus Rodriguez",
      role: "Cinematographer & Video Editor",
      image: "/images/team-2.jpg",
      bio: "Marcus specializes in cinematic storytelling, creating films that capture the essence of your special day.",
      specialties: ["Wedding Films", "Drone Videography", "Post-Production"],
    },
    {
      name: "Sophie Williams",
      role: "Second Photographer",
      image: "/images/team-3.jpg",
      bio: "Sophie's candid photography style captures authentic moments and genuine emotions beautifully.",
      specialties: ["Candid Photography", "Pre-Wedding Shoots", "Event Coverage"],
    },
    {
      name: "James Thompson",
      role: "Technical Director",
      image: "/images/team-4.jpg",
      bio: "James ensures every technical aspect is perfect, from lighting to equipment management.",
      specialties: ["Lighting Design", "Equipment Management", "Technical Support"],
    },
  ]

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Hero image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  // Auto-scrolling testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Animated counters
  useEffect(() => {
    if (isVisible["stats"]) {
      const animateCounter = (target: number, setter: (value: number) => void) => {
        let current = 0
        const increment = target / 100
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            setter(target)
            clearInterval(timer)
          } else {
            setter(Math.floor(current))
          }
        }, 20)
      }

      animateCounter(500, (value) => setAnimatedStats((prev) => ({ ...prev, weddings: value })))
      animateCounter(8, (value) => setAnimatedStats((prev) => ({ ...prev, years: value })))
      animateCounter(50, (value) => setAnimatedStats((prev) => ({ ...prev, awards: value })))
      animateCounter(1200, (value) => setAnimatedStats((prev) => ({ ...prev, clients: value })))
    }
  }, [isVisible["stats"]])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50 overflow-x-hidden">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute top-20 left-10 animate-float">
          <Sparkles className="text-rose-300 opacity-30" size={20} />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed">
          <Heart className="text-rose-200 opacity-20" size={16} />
        </div>
        <div className="absolute bottom-40 left-20 animate-float-slow">
          <Camera className="text-rose-300 opacity-25" size={18} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-rose-100 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-serif text-rose-900 animate-fade-in flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-rose-800 rounded-lg flex items-center justify-center shadow-lg">
              <Camera className="text-white" size={20} />
            </div>
            Ekai 100
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["Home", "About", "Services", "Portfolio", "Team", "Testimonials", "Contact"].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-rose-800 hover:text-rose-600 transition-all duration-300 relative group animate-slide-down"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Book Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-2000 ${
                index === currentHeroImage ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt="Wedding Photography"
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
        </div>

        {/* Parallax Background */}
        <div className="absolute inset-0 z-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }} />

        <div className="relative z-10 text-center text-white px-4 max-w-4xl animate-hero-content">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight animate-slide-up">
            Capturing Moments,
            <br />
            <span className="text-rose-300 animate-glow">Creating Memories</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-rose-100 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            Timeless wedding photography and cinematic storytelling that preserves your love story forever
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 text-lg font-medium rounded-full transition-all duration-500 transform hover:scale-110 hover:shadow-2xl animate-bounce-in"
              style={{ animationDelay: "1000ms" }}
              onClick={() => scrollToSection("contact")}
            >
              <span className="flex items-center gap-2">
                Book Your Session
                <Heart className="animate-pulse" size={20} />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-rose-900 px-8 py-4 text-lg font-medium rounded-full transition-all duration-500 transform hover:scale-110 animate-bounce-in"
              style={{ animationDelay: "1200ms" }}
              onClick={() => scrollToSection("portfolio")}
            >
              <span className="flex items-center gap-2">
                View Portfolio
                <ArrowRight size={20} />
              </span>
            </Button>
          </div>
        </div>

        {/* Hero Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 transform hover:scale-125 ${
                index === currentHeroImage ? "bg-rose-400 scale-110" : "bg-white/50"
              }`}
              onClick={() => setCurrentHeroImage(index)}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-scroll-indicator"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div data-animate id="stats" className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-rose-600 animate-counter mb-2">{animatedStats.weddings}+</div>
              <div className="text-gray-600 font-medium">Weddings Captured</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-rose-600 animate-counter mb-2">{animatedStats.years}+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-rose-600 animate-counter mb-2">{animatedStats.awards}+</div>
              <div className="text-gray-600 font-medium">Awards Won</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-rose-600 animate-counter mb-2">{animatedStats.clients}+</div>
              <div className="text-gray-600 font-medium">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-rose-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              data-animate
              id="about-text"
              className={`transition-all duration-1000 ${
                isVisible["about-text"] ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At Ekai 100, we believe every love story deserves to be told with artistry and passion. Founded by a
                team of creative visionaries, we specialize in capturing the raw emotions, intimate moments, and
                timeless beauty of your most precious celebrations.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our approach combines traditional elegance with contemporary storytelling, creating visual narratives
                that transcend time. From the gentle touch of hands to the joyful tears of happiness, we preserve every
                detail that makes your story uniquely yours.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  "Award-winning photography & cinematography",
                  "Personalized approach for every couple",
                  "State-of-the-art equipment & techniques",
                  "Same-day preview & fast delivery",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-rose-600 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Get Started Today
              </Button>
            </div>

            <div
              className={`relative transition-all duration-1000 ${
                isVisible["about-text"] ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              <div className="relative group">
                <Image
                  src="/images/about-us.jpg"
                  alt="About Us"
                  width={500}
                  height={600}
                  className="rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-rose-100 p-6 rounded-lg shadow-lg transform hover:rotate-3 transition-transform duration-300 animate-float">
                <Heart className="text-rose-600 mb-2 animate-pulse" size={32} />
                <p className="text-rose-800 font-medium">Passion-driven storytelling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div
            data-animate
            id="services-header"
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible["services-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-6">Our Services</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              From intimate pre-wedding sessions to grand celebrations, we offer comprehensive photography and
              videography services tailored to your vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "Wedding Photography",
                description: "Timeless, elegant photography that captures every precious moment of your special day.",
                price: "Starting at $2,500",
                features: [
                  "Full day coverage",
                  "High-resolution gallery",
                  "Professional editing",
                  "Custom photo album",
                ],
              },
              {
                icon: Heart,
                title: "Pre-Wedding Shoots",
                description: "Romantic engagement sessions that tell your unique love story in stunning locations.",
                price: "Starting at $800",
                features: ["Location scouting", "Styling consultation", "Multiple outfit changes", "Same-day preview"],
              },
              {
                icon: Video,
                title: "Cinematic Video",
                description: "Professional video editing that transforms your footage into cinematic masterpieces.",
                price: "Starting at $3,500",
                features: ["4K recording", "Drone footage", "Color grading", "Custom soundtrack"],
              },
            ].map((service, index) => (
              <Card
                key={index}
                data-animate
                id={`service-${index}`}
                className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-rose-100 bg-white ${
                  isVisible[`service-${index}`] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <service.icon
                    className="text-rose-600 mx-auto mb-4 group-hover:scale-125 transition-all duration-500 relative z-10"
                    size={48}
                  />
                  <h3 className="text-2xl font-serif text-rose-900 mb-4 relative z-10">{service.title}</h3>
                  <p className="text-gray-600 mb-4 relative z-10">{service.description}</p>
                  <div className="text-2xl font-bold text-rose-600 mb-4 relative z-10">{service.price}</div>
                  <ul className="text-sm text-gray-500 space-y-2 mb-6 relative z-10">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center gap-2">
                        <CheckCircle className="text-rose-600" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-full transition-all duration-300 relative z-10"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gradient-to-b from-rose-50 to-white relative">
        <div className="container mx-auto px-4">
          <div
            data-animate
            id="portfolio-header"
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible["portfolio-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-6">Our Portfolio</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Explore our collection of captured moments, each telling a unique story of love, joy, and celebration.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                data-animate
                id={`portfolio-${item.id}`}
                className={`group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  isVisible[`portfolio-${item.id}`] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  {item.type === "video" ? (
                    <div className="relative">
                      <video
                        className="w-full h-64 object-cover group-hover:scale-125 transition-transform duration-700"
                        poster={item.poster}
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => {
                          e.currentTarget.play()
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause()
                          e.currentTarget.currentTime = 0
                        }}
                      >
                        <source src={item.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      {/* Video Play Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse">
                          <Play className="text-rose-600 ml-1" size={24} />
                        </div>
                      </div>
                      {/* Video Badge */}
                      <div className="absolute top-3 left-3 bg-rose-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Video size={12} />
                        VIDEO
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-125 transition-transform duration-700"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-4 left-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                      <Badge variant="secondary" className="bg-rose-600 text-white">
                        {item.category.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center">
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 text-lg font-medium rounded-full transition-all duration-500 transform hover:scale-110 hover:shadow-2xl group"
            >
              <span className="flex items-center gap-2">
                View Complete Portfolio
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div
            data-animate
            id="team-header"
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible["team-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our passionate team of creative professionals brings years of experience and artistic vision to every
              project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                data-animate
                id={`team-${index}`}
                className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-rose-100 bg-white ${
                  isVisible[`team-${index}`] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-serif text-rose-900 mb-2">{member.name}</h3>
                  <p className="text-rose-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.specialties.map((specialty, specialtyIndex) => (
                      <Badge
                        key={specialtyIndex}
                        variant="secondary"
                        className="bg-rose-100 text-rose-700 text-xs hover:bg-rose-200 transition-colors duration-200"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-rose-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div
            data-animate
            id="testimonials-header"
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible["testimonials-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-6">What Our Couples Say</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our happy couples have to say about their experience with us.
            </p>
          </div>

          {/* Auto-Scrolling Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-8 py-12">
                    <Card className="bg-white shadow-2xl border-rose-100 transform hover:scale-105 transition-all duration-300">
                      <CardContent className="p-12 text-center">
                        <div className="flex justify-center mb-6">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={80}
                            height={80}
                            className="rounded-full shadow-lg"
                          />
                        </div>
                        <div className="flex justify-center mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="text-yellow-400 fill-current animate-twinkle"
                              size={24}
                              style={{ animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                        <p className="text-xl text-gray-700 mb-8 italic leading-relaxed font-light">
                          "{testimonial.text}"
                        </p>
                        <h4 className="text-2xl font-serif text-rose-900 mb-2">{testimonial.name}</h4>
                        <p className="text-gray-500">{testimonial.location}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                    index === currentTestimonial ? "bg-rose-600 scale-110" : "bg-rose-200"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div
            data-animate
            id="contact-header"
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible["contact-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-6">Let's Create Magic Together</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Ready to capture your love story? Get in touch with us to discuss your vision and book your session.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  content: "+1 (555) 123-4567",
                  subtitle: "Mon-Fri 9AM-6PM",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "hello@ekai100.com",
                  subtitle: "We reply within 24 hours",
                },
                {
                  icon: MapPin,
                  title: "Visit Studio",
                  content: "123 Creative Avenue\nArt District, CA 90210",
                  subtitle: "By appointment only",
                },
              ].map((contact, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-rose-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                      <contact.icon className="text-rose-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-rose-900 mb-1">{contact.title}</h3>
                      <p className="text-gray-700 whitespace-pre-line">{contact.content}</p>
                      <p className="text-sm text-gray-500">{contact.subtitle}</p>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Social Media */}
              <Card className="p-6 border-rose-100">
                <h3 className="font-semibold text-rose-900 mb-4">Follow Our Journey</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Instagram, href: "#", label: "Instagram" },
                    { icon: Facebook, href: "#", label: "Facebook" },
                    { icon: Youtube, href: "#", label: "YouTube" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="bg-rose-100 p-3 rounded-full hover:bg-rose-200 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                      aria-label={social.label}
                    >
                      <social.icon className="text-rose-600" size={20} />
                    </a>
                  ))}
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-lg border-rose-100">
                <h3 className="text-2xl font-serif text-rose-900 mb-6">Book Your Consultation</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-rose-200 rounded-lg focus:border-rose-400 focus:outline-none transition-all duration-300"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-rose-200 rounded-lg focus:border-rose-400 focus:outline-none transition-all duration-300"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border border-rose-200 rounded-lg focus:border-rose-400 focus:outline-none transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full p-3 border border-rose-200 rounded-lg focus:border-rose-400 focus:outline-none transition-all duration-300"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                    <input
                      type="date"
                      className="w-full p-3 border border-rose-200 rounded-lg focus:border-rose-400 focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Services Interested In</label>
                    <select className="w-full p-3 border border-rose-200 rounded-lg focus:border-rose-400 focus:outline-none transition-all duration-300">
                      <option>Wedding Photography</option>
                      <option>Pre-Wedding Shoot</option>
                      <option>Cinematic Video</option>
                      <option>Complete Package</option>
                      <option>Custom Package</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your vision</label>
                    <textarea
                      className="w-full p-3 border border-rose-200 rounded-lg focus:border-rose-400 focus:outline-none transition-all duration-300 min-h-[120px]"
                      placeholder="Share your ideas, preferences, and any special requirements..."
                    ></textarea>
                  </div>
                  <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 text-lg font-medium rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl group">
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <Heart className="group-hover:animate-pulse" size={20} />
                    </span>
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rose-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-800 to-rose-900"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-600 rounded-lg flex items-center justify-center">
                  <Camera className="text-white" size={16} />
                </div>
                Ekai 100
              </h3>
              <p className="text-rose-200 mb-4">Capturing love stories with artistry and passion since 2016.</p>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Youtube].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-rose-200 hover:text-white transition-all duration-300 transform hover:scale-125"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Services</h4>
              <ul className="space-y-2 text-rose-200">
                {["Wedding Photography", "Pre-Wedding Shoots", "Cinematic Videos", "Short Films"].map(
                  (service, index) => (
                    <li key={index}>
                      <a href="#" className="hover:text-white transition-colors duration-300">
                        {service}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-rose-200">
                {["About Us", "Portfolio", "Team", "Testimonials", "Contact"].map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.toLowerCase().replace(" ", ""))}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Contact Info</h4>
              <div className="space-y-2 text-rose-200">
                <p>+1 (555) 123-4567</p>
                <p>hello@ekai100.com</p>
                <p>
                  123 Creative Avenue
                  <br />
                  Art District, CA 90210
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-rose-800 mt-8 pt-8 text-center text-rose-200">
            <p>&copy; {new Date().getFullYear()} Ekai 100. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
