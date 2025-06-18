"use client"

import Link from "next/link"
import { Camera, Instagram, Facebook, Youtube, Phone, Mail, MapPin } from "lucide-react"

interface FooterProps {
  scrollToSection: (sectionId: string) => void
}

export default function Footer({ scrollToSection }: FooterProps) {
  const handleLogoClick = () => {
    scrollToSection("home")
  }

  return (
    <footer className="bg-rose-900 text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-800 to-rose-900"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="animate-fade-in">
            <button
              onClick={handleLogoClick}
              className="text-2xl font-serif mb-4 flex items-center gap-3 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-600 rounded-lg flex items-center justify-center">
                <Camera className="text-white" size={16} />
              </div>
              <span className="hover:text-rose-100 transition-colors duration-300">Ekai 100</span>
            </button>
            <p className="text-rose-200 mb-4">Capturing love stories with artistry and passion since 2016.</p>
            <div className="flex space-x-4">
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
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <h4 className="text-lg font-medium mb-4">Services</h4>
            <ul className="space-y-2 text-rose-200">
              {["Wedding Photography", "Pre-Wedding Shoots", "Cinematic Videos", "Short Films"].map(
                (service, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {service}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "400ms" }}>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-rose-200">
              {["About Us", "Portfolio", "Team", "Testimonials", "Contact"].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.toLowerCase().replace(" ", ""))}
                    className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "600ms" }}>
            <h4 className="text-lg font-medium mb-4">Contact Info</h4>
            <div className="space-y-2 text-rose-200">
              <p className="hover:text-white transition-colors duration-300">+91 62042 79715</p>
              <p className="hover:text-white transition-colors duration-300">contact@ekai100.com</p>
              <p className="hover:text-white transition-colors duration-300">
                123 Creative Avenue
                <br />
                Art District, CA 90210
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-rose-800 mt-8 pt-8 text-center text-rose-200">
          <p className="animate-fade-in">&copy; {new Date().getFullYear()} Ekai 100. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
