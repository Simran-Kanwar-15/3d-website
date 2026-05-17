import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import FrameAnimation3D from './components/FrameAnimation3D'
import HeroSection from './sections/HeroSection'
import MonumentsSection from './sections/MonumentsSection'
import HistorySection from './sections/HistorySection'
import CafesSection from './sections/CafesSection'
import HotelsSection from './sections/HotelsSection'
import ShoppingSection from './sections/ShoppingSection'
import { FinaleSection, Footer } from './sections/FinaleSection'

gsap.registerPlugin(ScrollTrigger)

const SectionDivider = () => {
  const dividerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(dividerRef.current, 
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 90%',
        },
      }
    )
  }, [])

  return (
    <div className="relative py-8">
      <div 
        ref={dividerRef}
        className="h-[2px] w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2) 20%, rgba(232,133,61,0.8) 50%, rgba(212,175,55,0.2) 80%, transparent)',
        }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bgDark px-4">
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-gold/60">
          <path 
            fill="currentColor" 
            d="M20 0C20 0 25 10 25 15C25 20 22 22 20 22C18 22 15 20 15 15C15 10 20 0 20 0ZM20 25C20 25 22 30 22 35C22 38 21 40 20 40C19 40 18 38 18 35C18 30 20 25 20 25Z" 
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  )
}

const ScrollProgress = () => {
  const progressRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const progress = progressRef.current
    const fill = fillRef.current

    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(fill, { 
          scaleY: self.progress, 
          transformOrigin: 'top',
          ease: 'none'
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <div 
      ref={progressRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 w-[4px] h-[40vh] rounded-full overflow-hidden z-40 hidden md:block"
      style={{ backgroundColor: 'rgba(212,175,55,0.15)' }}
    >
      <div 
        ref={fillRef}
        className="w-full h-full rounded-full"
        style={{
          background: 'linear-gradient(180deg, #D4AF37, #E8853D)',
        }}
      />
    </div>
  )
}

function App() {
  const loaderRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
    })
    .set(loaderRef.current, { display: 'none' })
    .call(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window

  return (
    <div className="bg-[#0A0A14] text-[#F5ECD7] overflow-x-hidden min-h-screen">
      <div
        ref={loaderRef}
        className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="font-cinzel text-4xl text-gold mb-4">JODHPUR</h1>
          <div className="w-48 h-1 bg-gold/20 rounded-full overflow-hidden">
            <div className="h-full bg-gold animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>

      {!isTouchDevice && <CustomCursor />}
      <FrameAnimation3D />
      <Navbar />
      <ScrollProgress />

      <main>
        <section id="hero">
          <HeroSection />
        </section>
        
        <SectionDivider />
        
        <section id="monuments">
          <MonumentsSection />
        </section>
        
        <SectionDivider />
        
        <section id="history">
          <HistorySection />
        </section>
        
        <SectionDivider />
        
        <section id="cafes">
          <CafesSection />
        </section>
        
        <SectionDivider />
        
        <section id="hotels">
          <HotelsSection />
        </section>
        
        <SectionDivider />
        
        <section id="shopping">
          <ShoppingSection />
        </section>
        
        <SectionDivider />
        
        <section id="finale">
          <FinaleSection />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App