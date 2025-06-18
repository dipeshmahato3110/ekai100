"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Camera } from "lucide-react"

interface MinimalLandingProps {
  onEnter: () => void
}

export default function MinimalLanding({ onEnter }: MinimalLandingProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  // Responsive sizing hook
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    }

    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)
    return () => window.removeEventListener("resize", updateScreenSize)
  }, [])

  // Handle click anywhere on screen
  const handleScreenClick = () => {
    onEnter()
  }

  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden cursor-pointer"
      onClick={handleScreenClick}
    >
      {/* Dynamic background with mouse interaction */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-900/20 animate-pulse"></div>

        {/* Interactive mouse follower */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>

        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="border border-white/10 animate-pulse"
                style={{ animationDelay: `${i * 0.01}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="text-center relative z-10 max-w-5xl mx-auto">
        {/* Animated sparkles around the text with responsive positioning */}
        <div className="absolute -top-6 sm:-top-10 -left-6 sm:-left-10 animate-bounce">
          <Sparkles className="text-purple-400 opacity-60" size={screenSize.width < 640 ? 20 : 24} />
        </div>
        <div className="absolute -top-3 sm:-top-5 -right-3 sm:-right-5 animate-bounce delay-500">
          <Sparkles className="text-purple-400 opacity-60" size={screenSize.width < 640 ? 16 : 20} />
        </div>
        <div className="absolute -bottom-3 sm:-bottom-5 -left-3 sm:-left-5 animate-bounce delay-1000">
          <Sparkles className="text-pink-400 opacity-60" size={screenSize.width < 640 ? 14 : 18} />
        </div>

        {/* Logo and Studio Name */}
        <div className="flex flex-col items-center mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-2xl flex items-center justify-center shadow-2xl mb-4 animate-pulse-glow">
            <Camera className="text-white" size={screenSize.width < 640 ? 24 : screenSize.width < 768 ? 28 : 32} />
          </div>
          <h3
            className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-2 tracking-wider animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            Ekai 100
          </h3>
        </div>

        {/* Main heading with enhanced responsive design */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-7 md:mb-8 leading-tight relative px-4 sm:px-0">
          <span
            className="inline-block animate-fade-in-up hover:scale-110 transition-transform duration-300 cursor-default"
            style={{ animationDelay: "0.2s" }}
          >
            Capturing
          </span>{" "}
          <span
            className="inline-block animate-fade-in-up hover:scale-110 transition-transform duration-300 cursor-default bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse"
            style={{ animationDelay: "0.4s" }}
          >
            Moments,
          </span>
          <br />
          <span
            className="inline-block animate-fade-in-up hover:scale-110 transition-transform duration-300 cursor-default"
            style={{ animationDelay: "0.6s" }}
          >
            Crafting
          </span>{" "}
          <span
            className="inline-block animate-fade-in-up hover:scale-110 transition-transform duration-300 cursor-default text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-400 to-pink-400 animate-pulse"
            style={{ animationDelay: "0.8s" }}
          >
            Memories
          </span>
          {/* Glowing text effect */}
          <div className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 blur-sm opacity-50 animate-pulse"></div>
        </h1>

        {/* Enhanced subtitle with better responsive spacing */}
        <div className="relative mb-12 sm:mb-14 md:mb-16 px-4 sm:px-0">
          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light tracking-wide animate-fade-in-up relative z-10 max-w-4xl mx-auto"
            style={{ animationDelay: "1s" }}
          >
            <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
              A creative studio for cinematic weddings, pre-weddings, and timeless films.
            </span>
          </p>

          {/* Animated underline with responsive width */}
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"
            style={{
              width: "0%",
              animation: "expandWidth 2s ease-out 1.5s forwards",
            }}
          ></div>
        </div>

        {/* Enhanced CTA Button with better mobile sizing */}
        <div className="flex justify-center animate-fade-in-up px-4 sm:px-0" style={{ animationDelay: "1.2s" }}>
          <div className="relative group">
            {/* Button glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

            <Button
              onClick={(e) => {
                e.stopPropagation() // Prevent double trigger
                onEnter()
              }}
              size="lg"
              className="relative bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-lg sm:text-xl font-bold rounded-full transition-all duration-500 transform hover:scale-110 hover:shadow-2xl group border-2 border-transparent hover:border-purple-400/50"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="flex items-center gap-2 sm:gap-3 relative z-10">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold">
                  Let's Explore
                </span>
                <ArrowRight
                  className={`transition-all duration-300 text-purple-600 ${
                    isHovered ? "translate-x-2 scale-110" : ""
                  }`}
                  size={screenSize.width < 640 ? 20 : 24}
                />
              </span>

              {/* Button shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 "></div>
            </Button>
          </div>
        </div>

        {/* Click anywhere hint */}
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "1.5s" }}>
          <p className="text-gray-400 text-sm sm:text-base font-light animate-pulse">Click anywhere to enter</p>
        </div>

        {/* Animated scroll indicator with enhanced design */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70">
          <div className="relative">
            <div className="w-6 h-10 border-2 border-gradient-to-b from-purple-400 to-pink-400 rounded-full flex justify-center bg-gradient-to-b from-purple-500/10 to-pink-500/10">
              <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2 animate-pulse"></div>
            </div>
            <div className="absolute inset-0 border-2 border-purple-400/50 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Enhanced floating elements with responsive sizing */}
      <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-2 sm:w-3 h-2 sm:h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-32 sm:top-40 right-8 sm:right-20 w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float-delayed opacity-50"></div>
      <div className="absolute bottom-32 sm:bottom-40 left-8 sm:left-20 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float-slow opacity-70"></div>
      <div className="absolute top-48 sm:top-60 left-1/4 sm:left-1/3 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float opacity-40"></div>
      <div className="absolute bottom-48 sm:bottom-60 right-1/4 sm:right-1/3 w-2 sm:w-3 h-2 sm:h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float-delayed opacity-50"></div>
    </div>
  )
}
