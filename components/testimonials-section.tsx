"use client"

import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Star, Camera, Upload } from "lucide-react"

interface Testimonial {
  _id: string
  name: string
  message: string
  photo?: string
  rating: number
  createdAt: string
}

// Star Rating Component
function StarRating({ rating, onRatingChange, readonly = false }: { 
  rating: number, 
  onRatingChange?: (rating: number) => void,
  readonly?: boolean 
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange?.(star)}
          className={`transition-all duration-200 ${
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
          }`}
          disabled={readonly}
        >
          <Star
            className={`w-6 h-6 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(5)
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/testimonials")
        setTestimonials(res.data)
      } catch (err) {
        setError("Failed to load testimonials.")
      }
    }
    fetchTestimonials()
  }, [])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setPhoto(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('message', message)
      formData.append('rating', rating.toString())
      if (photo) {
        formData.append('photo', photo)
      }

      await axios.post("http://localhost:5000/api/testimonials", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      setSuccess("Thank you for your feedback! Your testimonial is pending approval.")
      setName("")
      setMessage("")
      setRating(5)
      setPhoto(null)
      setPhotoPreview("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (err) {
      setError("Failed to submit testimonial.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-amber-50 to-rose-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-rose-200 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-amber-200 rounded-full animate-float-delayed"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-6 flex items-center justify-center gap-2">
            <Sparkles className="text-rose-400 animate-twinkle" size={32} />
            Testimonials
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Hear from our happy couples and clients!
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-fade-in">
          {testimonials.length === 0 && (
            <div className="text-gray-500 col-span-full text-center py-8">
              No testimonials yet. Be the first to share your experience!
            </div>
          )}
          {testimonials.map((t) => (
            <Card key={t._id} className="border-rose-100 bg-white/80 backdrop-blur-sm shadow-lg animate-scale-in hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  {t.photo ? (
                    <img 
                      src={`http://localhost:5000${t.photo}`} 
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-rose-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-200 to-amber-200 flex items-center justify-center border-2 border-rose-200">
                      <span className="text-rose-600 font-bold text-lg">
                        {t.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-rose-700 text-lg">{t.name}</span>
                      <span className="text-xs text-gray-400">{new Date(t.createdAt).toLocaleDateString()}</span>
                    </div>
                    <StarRating rating={t.rating || 5} readonly />
                  </div>
                </div>
                <div className="text-gray-700 italic">"{t.message}"</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Testimonial Form */}
        <div className="max-w-2xl mx-auto bg-white/90 rounded-xl shadow-lg p-8 border border-rose-100 animate-fade-in-up">
          <h3 className="text-2xl font-serif text-rose-900 mb-6 text-center">Share Your Experience</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="testimonial-name">Your Name *</Label>
                <Input 
                  id="testimonial-name" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                  disabled={loading}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label>Your Rating *</Label>
                <div className="mt-2">
                  <StarRating rating={rating} onRatingChange={setRating} />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="testimonial-message">Your Feedback *</Label>
              <Textarea 
                id="testimonial-message" 
                value={message} 
                onChange={e => setMessage(e.target.value)} 
                required 
                disabled={loading}
                placeholder="Share your experience with us..."
                rows={4}
              />
            </div>

            <div>
              <Label>Your Photo (Optional)</Label>
              <div className="mt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  disabled={loading}
                />
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Choose Photo
                  </Button>
                  {photoPreview && (
                    <div className="flex items-center gap-2">
                      <img 
                        src={photoPreview} 
                        alt="Preview" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-rose-200"
                      />
                      <span className="text-sm text-gray-600">Photo selected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {error && <div className="text-red-500 text-center animate-fade-in bg-red-50 p-3 rounded-lg">{error}</div>}
            {success && <div className="text-green-600 text-center animate-fade-in bg-green-50 p-3 rounded-lg">{success}</div>}
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white" 
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Testimonial"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
