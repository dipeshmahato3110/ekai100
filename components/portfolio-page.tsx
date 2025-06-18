"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Video as VideoIcon, Film, Play, ChevronLeft, ChevronRight, X } from "lucide-react"

interface PortfolioPageProps {
  onBack: () => void
}

export default function PortfolioPage({ onBack }: PortfolioPageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const itemsPerPage = 12

  // Extended portfolio items for pagination
  const allPortfolioItems = [
    // Page 1
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
      poster: "/images/portfolio-5.jpg",
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
      type: "image",
      src: "/images/portfolio-6.jpg",
      title: "Behind the Magic",
    },
    {
      id: 7,
      category: "wedding",
      type: "image",
      src: "/images/portfolio-1.jpg",
      title: "Intimate Outdoor Ceremony",
    },
    {
      id: 8,
      category: "film",
      type: "video",
      src: "/videos/ForBiggerBlazes.mp4",
      title: "Wedding Cinematic Trailer",
      poster: "/images/portfolio-4.jpg",
    },
    {
      id: 9,
      category: "wedding",
      type: "image",
      src: "/images/portfolio-4.jpg",
      title: "Traditional Ceremony",
    },
    {
      id: 10,
      category: "pre-wedding",
      type: "image",
      src: "/images/portfolio-5.jpg",
      title: "Couple's Adventure",
    },
    {
      id: 11,
      category: "behind-scenes",
      type: "image",
      src: "/images/portfolio-6.jpg",
      title: "Studio Setup",
    },
    {
      id: 12,
      category: "film",
      type: "image",
      src: "/images/portfolio-1.jpg",
      title: "Destination Wedding Film",
    },
    // Page 2
    {
      id: 13,
      category: "wedding",
      type: "image",
      src: "/images/portfolio-1.jpg",
      title: "Vintage Church Wedding",
    },
    {
      id: 14,
      category: "pre-wedding",
      type: "image",
      src: "/images/portfolio-4.jpg",
      title: "Mountain Top Engagement",
    },
    {
      id: 15,
      category: "wedding",
      type: "video",
      src: "/videos/ForBiggerBlazes.mp4",
      title: "Royal Palace Wedding",
      poster: "/images/portfolio-5.jpg",
    },
    {
      id: 16,
      category: "film",
      type: "image",
      src: "/images/portfolio-4.jpg",
      title: "Anniversary Celebration",
    },
    {
      id: 17,
      category: "pre-wedding",
      type: "image",
      src: "/images/portfolio-5.jpg",
      title: "City Lights Romance",
    },
    {
      id: 18,
      category: "behind-scenes",
      type: "image",
      src: "/images/portfolio-6.jpg",
      title: "Equipment Setup",
    },
    {
      id: 19,
      category: "wedding",
      type: "image",
      src: "/images/portfolio-1.jpg",
      title: "Beachside Ceremony",
    },
    {
      id: 20,
      category: "film",
      type: "image",
      src: "/images/portfolio-4.jpg",
      title: "Love Story Documentary",
    },
    {
      id: 21,
      category: "pre-wedding",
      type: "image",
      src: "/images/portfolio-5.jpg",
      title: "Forest Engagement",
    },
    {
      id: 22,
      category: "wedding",
      type: "image",
      src: "/images/portfolio-4.jpg",
      title: "Grand Ballroom Reception",
    },
    {
      id: 23,
      category: "behind-scenes",
      type: "image",
      src: "/images/portfolio-5.jpg",
      title: "Drone Setup Process",
    },
    {
      id: 24,
      category: "film",
      type: "image",
      src: "/images/portfolio-6.jpg",
      title: "Cinematic Portrait Session",
    },
  ]

  const filteredItems =
    selectedCategory === "all"
      ? allPortfolioItems
      : allPortfolioItems.filter((item) => item.category === selectedCategory)

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50">
      {/* Portfolio Page Header */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center gap-2"
            >
              <ChevronLeft size={20} />
              Back to Home
            </Button>
            <h1 className="text-3xl font-serif text-rose-900">Complete Portfolio</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { key: "all", label: "All" },
            { key: "wedding", label: "Weddings" },
            { key: "pre-wedding", label: "Pre-Weddings" },
            { key: "film", label: "Films" },
            { key: "behind-scenes", label: "Behind the Scenes" },
          ].map((filter) => (
            <Button
              key={filter.key}
              variant={selectedCategory === filter.key ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(filter.key)
                setCurrentPage(1)
              }}
              className={`transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === filter.key
                  ? "bg-rose-600 hover:bg-rose-700 shadow-lg"
                  : "border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-400"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {currentItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
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
                      <VideoIcon size={12} />
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              variant="outline"
              className="border-rose-200 text-rose-600 hover:bg-rose-50 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
              Previous
            </Button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  variant={currentPage === page ? "default" : "outline"}
                  className={`w-10 h-10 ${
                    currentPage === page
                      ? "bg-rose-600 hover:bg-rose-700 text-white"
                      : "border-rose-200 text-rose-600 hover:bg-rose-50"
                  }`}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
              className="border-rose-200 text-rose-600 hover:bg-rose-50 disabled:opacity-50"
            >
              Next
              <ChevronRight size={20} />
            </Button>
          </div>
        )}

        {/* Portfolio Stats */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredItems.length)} of{" "}
            {filteredItems.length} items
          </p>
        </div>
      </div>

      {/* Enhanced Lightbox for Portfolio Page */}
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
                  <VideoIcon size={16} className="text-rose-400" />
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
    </div>
  )
}
