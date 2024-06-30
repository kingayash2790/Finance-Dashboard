import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import MainSection from './MainSection'
import Testimonials from './Testimonials'
import Footer from './Footer'

export default function LandingPage() {
  return (
    <div className="">
      
      {/* Navbar */}
      <nav className="z-40">
        <Navbar />
      </nav>

      {/* HeroSection */}
      <div className="-z-20">
        <HeroSection />
      </div>
      {/* HeroSection */}
      <div className="">
        <MainSection />
      </div>
      {/* HeroSection */}
      <div className="mt-2">
        <Testimonials />
      </div>
      {/* HeroSection */}
      <div className="">
        <Footer />
      </div>
    </div>
  )
}
