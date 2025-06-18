"use client"

import { useState } from "react"
import { Camera, Menu, X } from "lucide-react"

interface NavigationProps {
  scrollToSection: (sectionId: string) => void
}

export default function Navigation({ scrollToSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (section: string) => {
    scrollToSection(section)
    setIsMenuOpen(false)
  }

  const handleLogoClick = () => {
    scrollToSection("home")
  }

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-rose-100 transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={handleLogoClick}
          className="text-2xl font-serif text-rose-900 animate-fade-in flex items-center gap-3 hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-rose-800 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Camera className="text-white" size={20} />
          </div>
          <span className="hover:text-rose-600 transition-colors duration-300">Ekai 100</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {["Home", "About", "Services", "Portfolio", "Team", "Testimonials", "Contact"].map((item, index) => (
            <button
              key={item}
              onClick={() => handleNavClick(item.toLowerCase())}
              className="text-rose-800 hover:text-rose-600 transition-all duration-300 relative group animate-slide-down"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-rose-800 transition-transform duration-300 hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-white border-t border-rose-100 transition-all duration-500 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {["Home", "About", "Services", "Portfolio", "Team", "Testimonials", "Contact"].map((item, index) => (
            <button
              key={item}
              onClick={() => handleNavClick(item.toLowerCase())}
              className={`block text-rose-800 hover:text-rose-600 transition-all duration-300 transform ${
                isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
