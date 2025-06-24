"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
  scrollY: number
}

export default function HeroSection({ scrollToSection, scrollY }: HeroSectionProps) {
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  const [imageError, setImageError] = useState(false)

  const heroImages = ["/images/hero-1.jpg", "/images/hero-2.jpg", "/images/hero-3.jpg"]

  // Hero image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {!imageError ? (
          heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-2000 ${
                index === currentHeroImage ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <Image
                src={image}
                alt="Wedding Photography"
                fill
                className="object-cover"
                priority={index === 0}
                onError={handleImageError}
              />
            </div>
          ))
        ) : (
          // Fallback background if images fail to load
          <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-purple-500 to-pink-500" />
        )}
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
  )
}
