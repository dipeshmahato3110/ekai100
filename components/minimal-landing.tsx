"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Camera } from "lucide-react"

interface MinimalLandingProps {
  onEnter: () => void
}

export default function MinimalLanding({ onEnter }: MinimalLandingProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Handle click anywhere on screen
  const handleScreenClick = () => {
    onEnter()
  }

  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden cursor-pointer"
      onClick={handleScreenClick}
    >
      {/* Simplified background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center relative z-10 max-w-5xl mx-auto">
        {/* Logo and Studio Name */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-2xl flex items-center justify-center shadow-2xl mb-4">
            <Camera className="text-white" size={28} />
          </div>
          <h3 className="text-2xl font-serif text-white mb-2 tracking-wider">
            Ekai 100
          </h3>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Capturing Moments,
          <br />
          <span className="text-rose-300">Creating Memories</span>
        </h1>

        {/* Subtitle */}
        <div className="mb-12">
          <p className="text-xl text-gray-300 font-light tracking-wide max-w-4xl mx-auto">
            A creative studio for cinematic weddings, pre-weddings, and timeless films.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onEnter()
            }}
            size="lg"
            className="bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white px-8 py-4 text-xl font-bold rounded-full transition-all duration-300 transform hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="flex items-center gap-3">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold">
                Let's Explore
              </span>
              <ArrowRight
                className={`transition-all duration-300 text-purple-600 ${
                  isHovered ? "translate-x-2" : ""
                }`}
                size={24}
              />
            </span>
          </Button>
        </div>

        {/* Click anywhere hint */}
        <div className="mt-8">
          <p className="text-gray-400 text-base font-light">Click anywhere to enter</p>
        </div>
      </div>
    </div>
  )
}
