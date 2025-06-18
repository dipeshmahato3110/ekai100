"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Video, Film, Play, ArrowRight, X } from "lucide-react"

interface PortfolioSectionProps {
  isVisible: { [key: string]: boolean }
  onViewComplete: () => void
}

export default function PortfolioSection({ isVisible, onViewComplete }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

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
      src: "/videos/ForBiggerBlazes.mp4",
      title: "Sunset Engagement Film",
      poster: "/images/portfolio-5.jpg",
    },
    {
      id: 3,
      category: "wedding",
      type: "image",
      src: "/images/portfolio-4.jpg",
      title: "Elegant Ballroom Ceremony",
    },
    {
      id: 4,
      category: "film",
      type: "video",
      src: "/videos/ForBiggerBlazes.mp4",
      title: "Love Story Short Film",
      poster: "/images/portfolio-6.jpg",
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
      src: "/videos/ForBiggerBlazes.mp4",
      title: "Behind the Magic",
      poster: "/images/portfolio-6.jpg",
    },
  ]

  const filteredPortfolio =
    selectedCategory === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="portfolio" className="py-20 bg-white relative">
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

          {/* Portfolio Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { key: "all", label: "All" },
              { key: "wedding", label: "Weddings" },
              { key: "pre-wedding", label: "Pre-Weddings" },
              { key: "film", label: "Films" },
              { key: "behind-scenes", label: "Behind the Scenes" },
            ].map((filter, index) => (
              <Button
                key={filter.key}
                variant={selectedCategory === filter.key ? "default" : "outline"}
                onClick={() => setSelectedCategory(filter.key)}
                className={`transition-all duration-300 transform hover:scale-105 animate-slide-up ${
                  selectedCategory === filter.key
                    ? "bg-rose-600 hover:bg-rose-700 shadow-lg"
                    : "border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-400"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPortfolio.map((item, index) => (
            <div
              key={item.id}
              data-animate
              id={`portfolio-${item.id}`}
              className={`group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                isVisible[`portfolio-${item.id}`] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setLightboxImage(item.src)}
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
                    <div className="absolute top-3 left-3 bg-rose-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 animate-pulse">
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
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-rose-600 text-white animate-pulse">
                        {item.category.replace("-", " ")}
                      </Badge>
                      {item.type === "video" && (
                        <Badge variant="secondary" className="bg-amber-600 text-white">
                          <Film size={12} className="mr-1" />
                          FILM
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      {item.type === "video" ? (
                        <Play className="text-white" size={16} />
                      ) : (
                        <Camera className="text-white" size={16} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Complete Portfolio Button */}
        <div className="text-center">
          <Button
            onClick={onViewComplete}
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

      {/* Enhanced Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Check if it's a video */}
            {lightboxImage.includes(".mp4") || lightboxImage.includes("video") ? (
              <video
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                controls
                autoPlay
                muted
                loop
                onClick={(e) => e.stopPropagation()}
              >
                <source src={lightboxImage} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={lightboxImage || "/placeholder.svg"}
                alt="Portfolio Media"
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                priority
              />
            )}

            <button
              className="absolute top-4 right-4 text-white hover:text-rose-300 transition-all duration-300 transform hover:scale-110 hover:rotate-90 bg-black/50 rounded-full p-2 backdrop-blur-sm z-10"
              onClick={() => setLightboxImage(null)}
            >
              <X size={24} />
            </button>

            {/* Media Info Overlay */}
            <div className="absolute bottom-4 left-4 text-white bg-black/50 rounded-lg p-3 backdrop-blur-sm z-10">
              <div className="flex items-center gap-2 mb-1">
                {lightboxImage.includes(".mp4") || lightboxImage.includes("video") ? (
                  <Video size={16} className="text-rose-400" />
                ) : (
                  <Camera size={16} className="text-rose-400" />
                )}
                <span className="text-sm font-medium">
                  {lightboxImage.includes(".mp4") || lightboxImage.includes("video") ? "Video" : "Photo"}
                </span>
              </div>
              <p className="text-xs text-gray-300">Click outside to close</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
