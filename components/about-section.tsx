"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"

interface AboutSectionProps {
  isVisible: { [key: string]: boolean }
}

export default function AboutSection({ isVisible }: AboutSectionProps) {
  const [animatedStats, setAnimatedStats] = useState({ weddings: 0, years: 0, awards: 0 })

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
    }
  }, [isVisible["stats"]])

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 to-transparent"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            data-animate
            id="about-text"
            className={`transition-all duration-1000 ${
              isVisible["about-text"] ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-6 animate-slide-in-left">Our Story</h2>
            <p
              className="text-lg text-gray-700 mb-6 leading-relaxed animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              At Ekai 100, we believe every love story deserves to be told with artistry and passion. Founded by a team
              of creative visionaries, we specialize in capturing the raw emotions, intimate moments, and timeless
              beauty of your most precious celebrations.
            </p>
            <p
              className="text-lg text-gray-700 mb-8 leading-relaxed animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Our approach combines traditional elegance with contemporary storytelling, creating visual narratives that
              transcend time. From the gentle touch of hands to the joyful tears of happiness, we preserve every detail
              that makes your story uniquely yours.
            </p>
            <div data-animate id="stats" className="flex space-x-6">
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-rose-600 animate-counter">{animatedStats.weddings}+</div>
                <div className="text-gray-600">Weddings Captured</div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-rose-600 animate-counter">{animatedStats.years}+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-rose-600 animate-counter">{animatedStats.awards}+</div>
                <div className="text-gray-600">Awards Won</div>
              </div>
            </div>
          </div>
          <div
            className={`relative transition-all duration-1000 ${
              isVisible["about-text"] ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative group">
              <Image
                src="/images/portfolio-1.jpg"
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
  )
}
