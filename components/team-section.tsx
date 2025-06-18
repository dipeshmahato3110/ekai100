"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TeamSectionProps {
  isVisible: { [key: string]: boolean }
}

export default function TeamSection({ isVisible }: TeamSectionProps) {
  const teamMembers = [
    {
      name: "Harish Mahato",
      role: "Cinematographer & Video Editor",
      image: "/images/team-3.jpg",
      bio: "Marcus specializes in cinematic storytelling, creating films that capture the essence of your special day.",
      specialties: ["Wedding Films", "Drone Videography", "Post-Production"],
    },
    {
      name: "DM",
      role: "Lead Photographer & Creative Director",
      image: "/images/team-3.jpg",
      bio: "With over 10 years of experience, Alexandra brings artistic vision and technical expertise to every shoot.",
      specialties: ["Wedding Photography", "Portrait Sessions", "Creative Direction"],
    },
    {
      name: "DM",
      role: "Second Photographer",
      image: "/images/team-3.jpg",
      bio: "Sophie's candid photography style captures authentic moments and genuine emotions beautifully.",
      specialties: ["Candid Photography", "Pre-Wedding Shoots", "Event Coverage"],
    },
    {
      name: "Sanjay Mahato",
      role: "Technical Director",
      image: "/images/team-3.jpg",
      bio: "James ensures every technical aspect is perfect, from lighting to equipment management.",
      specialties: ["Lighting Design", "Equipment Management", "Technical Support"],
    },
  ]

  return (
    <section id="team" className="py-20 bg-gradient-to-b from-rose-50 to-amber-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-24 h-24 bg-rose-300 rounded-full animate-float"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-amber-300 rounded-full animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div
          data-animate
          id="team-header"
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible["team-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-6">Meet Our Team</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our passionate team of creative professionals brings years of experience and artistic vision to every
            project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              data-animate
              id={`team-${index}`}
              className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-rose-100 bg-white/80 backdrop-blur-sm ${
                isVisible[`team-${index}`] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="relative mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-serif text-rose-900 mb-2">{member.name}</h3>
                <p className="text-rose-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.specialties.map((specialty, specialtyIndex) => (
                    <Badge
                      key={specialtyIndex}
                      variant="secondary"
                      className="bg-rose-100 text-rose-700 text-xs hover:bg-rose-200 transition-colors duration-200"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
