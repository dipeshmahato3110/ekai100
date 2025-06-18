"use client"

import { useState, useEffect } from "react"
import { Sparkles, Heart, Camera } from "lucide-react"

// Import components
import MinimalLanding from "@/components/minimal-landing"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import PortfolioSection from "@/components/portfolio-section"
import TeamSection from "@/components/team-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import PortfolioPage from "@/components/portfolio-page"

export default function Home() {
  const [showMinimalLanding, setShowMinimalLanding] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const [showPortfolioPage, setShowPortfolioPage] = useState(false)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    if (!showMinimalLanding) {
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
    }
  }, [showMinimalLanding])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleEnterWebsite = () => {
    setShowMinimalLanding(false)
  }

  const handleLogoClick = () => {
    setShowMinimalLanding(true)
    setShowPortfolioPage(false)
  }

  // Show minimal landing page first
  if (showMinimalLanding) {
    return <MinimalLanding onEnter={handleEnterWebsite} />
  }

  // Show portfolio page if requested
  if (showPortfolioPage) {
    return <PortfolioPage onBack={() => setShowPortfolioPage(false)} />
  }

  // Show main website
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
      <Navigation scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <HeroSection scrollToSection={scrollToSection} scrollY={scrollY} />

      {/* About Us Section */}
      <AboutSection isVisible={isVisible} />

      {/* Services Section */}
      <ServicesSection isVisible={isVisible} />

      {/* Portfolio Section */}
      <PortfolioSection isVisible={isVisible} onViewComplete={() => setShowPortfolioPage(true)} />

      {/* Team Section */}
      <TeamSection isVisible={isVisible} />

      {/* Testimonials Section */}
      <TestimonialsSection isVisible={isVisible} />

      {/* Contact Section */}
      <ContactSection isVisible={isVisible} />

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />
    </div>
  )
}
