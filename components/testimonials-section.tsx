"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialsSectionProps {
  isVisible: { [key: string]: boolean }
}

export default function TestimonialsSection({ isVisible }: TestimonialsSectionProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Sarah & Michael",
      text: "Absolutely breathtaking work! They captured every emotion and created memories we'll treasure forever.",
      rating: 5,
      image: "/images/testimonial-1.jpg",
    },
    {
      name: "Priya & Arjun",
      text: "The attention to detail and artistic vision exceeded our expectations. Our wedding film is pure magic.",
      rating: 5,
      image: "/images/testimonial-2.jpg",
    },
    {
      name: "Emma & James",
      text: "Professional, creative, and so easy to work with. They made our special day even more beautiful.",
      rating: 5,
      image: "/images/testimonial-3.jpg",
    },
    {
      name: "David & Lisa",
      text: "The team went above and beyond to capture our special moments. Truly exceptional service and artistry.",
      rating: 5,
      image: "/images/testimonial-4.jpg",
    },
    {
      name: "Raj & Meera",
      text: "Every photo tells a story. They have an incredible eye for detail and emotion. Highly recommended!",
      rating: 5,
      image: "/images/testimonial-5.jpg",
    },
  ]

  // Auto-scrolling testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-9xl font-serif text-rose-900">"</div>
        <div className="absolute bottom-20 right-20 text-9xl font-serif text-rose-900 rotate-180">"</div>
      </div>

      <div className="container mx-auto px-4 relative">
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
                      <h4 className="text-2xl font-serif text-rose-900">{testimonial.name}</h4>
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
  )
}
