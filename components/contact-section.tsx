"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Heart } from "lucide-react"

interface ContactSectionProps {
  isVisible: { [key: string]: boolean }
}

export default function ContactSection({ isVisible }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-rose-50 to-amber-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-amber-50/30"></div>
      <div className="container mx-auto px-4 relative">
        <div
          data-animate
          id="contact-header"
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible["contact-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-6">Let's Create Magic Together</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Ready to capture your love story? Get in touch with us to discuss your vision and book your session.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card
            data-animate
            id="contact-form"
            className={`shadow-lg border-rose-100 transform transition-all duration-1000 hover:shadow-2xl ${
              isVisible["contact-form"] ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif text-rose-900 mb-6">Book Your Consultation</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-rose-600 transition-colors">
                      First Name
                    </label>
                    <Input
                      placeholder="Your first name"
                      className="border-rose-200 focus:border-rose-400 transition-all duration-300 focus:scale-105"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-rose-600 transition-colors">
                      Last Name
                    </label>
                    <Input
                      placeholder="Your last name"
                      className="border-rose-200 focus:border-rose-400 transition-all duration-300 focus:scale-105"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-rose-600 transition-colors">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="border-rose-200 focus:border-rose-400 transition-all duration-300 focus:scale-105"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-rose-600 transition-colors">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    placeholder="Your phone number"
                    className="border-rose-200 focus:border-rose-400 transition-all duration-300 focus:scale-105"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-rose-600 transition-colors">
                    Event Date
                  </label>
                  <Input
                    type="date"
                    className="border-rose-200 focus:border-rose-400 transition-all duration-300 focus:scale-105"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-rose-600 transition-colors">
                    Services Interested In
                  </label>
                  <select className="w-full p-3 border border-rose-200 rounded-md focus:border-rose-400 focus:outline-none transition-all duration-300 focus:scale-105">
                    <option>Wedding Photography</option>
                    <option>Pre-Wedding Shoot</option>
                    <option>Cinematic Video</option>
                    <option>Complete Package</option>
                    <option>Custom Package</option>
                  </select>
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-rose-600 transition-colors">
                    Tell us about your vision
                  </label>
                  <Textarea
                    placeholder="Share your ideas, preferences, and any special requirements..."
                    className="border-rose-200 focus:border-rose-400 min-h-[120px] transition-all duration-300 focus:scale-105"
                  />
                </div>
                <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 text-lg font-medium rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-xl group">
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <Heart className="group-hover:animate-pulse" size={20} />
                  </span>
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div
            data-animate
            id="contact-info"
            className={`space-y-8 transition-all duration-1000 ${
              isVisible["contact-info"] ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <Card className="shadow-lg border-rose-100 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif text-rose-900 mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  {[
                    { icon: Phone, title: "Phone", content: "+91 62042 79715" },
                    { icon: Mail, title: "Email", content: "contact@ekai100.com" },
                    { icon: MapPin, title: "Studio Address", content: "123 Creative Avenue\nArt Ranchi, Jharkhand 90210" },
                  ].map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 group hover:transform hover:translate-x-2 transition-transform duration-300"
                    >
                      <contact.icon
                        className="text-rose-600 group-hover:scale-110 transition-transform duration-300"
                        size={24}
                      />
                      <div>
                        <p className="font-medium text-gray-900">{contact.title}</p>
                        <p className="text-gray-600 whitespace-pre-line">{contact.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-rose-100 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif text-rose-900 mb-6">Follow Our Journey</h3>
                <div className="flex space-x-4 mb-4">
                  {[
                    { icon: Instagram, href: "https://www.instagram.com/_ekai100?igsh=OGRtM2Mxbjlhcjd4" },
                    { icon: Facebook, href: "https://youtube.com/@hmchalchitrapurulia?si=LosDHrBCjSoSiLmJ" },
                    { icon: Youtube, href: "https://www.facebook.com/share/1MxGpMFNzF/" },
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="bg-rose-100 p-3 rounded-full hover:bg-rose-200 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                    >
                      <social.icon className="text-rose-600" size={24} />
                    </Link>
                  ))}
                </div>
                <p className="text-gray-600">
                  Follow us on social media for daily inspiration, behind-the-scenes content, and featured couples.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-rose-100 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif text-rose-900 mb-4">Studio Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="hover:text-rose-600 transition-colors duration-300">
                    <span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM
                  </p>
                  <p className="hover:text-rose-600 transition-colors duration-300">
                    <span className="font-medium">Saturday:</span> 10:00 AM - 4:00 PM
                  </p>
                  <p className="hover:text-rose-600 transition-colors duration-300">
                    <span className="font-medium">Sunday:</span> By Appointment Only
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
